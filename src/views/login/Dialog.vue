<template>
    <div class="login-dialog">
        <h3>智慧源地大数据综合分析平台</h3>
        <div class="account form-item" :class="{ top: currFocus == 'loginName' || !!loginName, active: currFocus == 'loginName' }">
            <label for="login-name">账号</label>
            <input type="text" ref="loginNameInput" @focus="doFocus('loginName')" @blur="doBlur('loginName')" name="login-name" :disabled="isProcessing" v-model="loginName" disableautocomplete autocomplete="off" maxlength="50" tabindex="1"/>
        </div>
        <div class="password form-item" :class="{ top: currFocus == 'loginPassword' || !!password, active: currFocus == 'loginPassword' }">
            <label for="login-password">密码</label>
            <input ref="passwordInput" @focus="doFocus('loginPassword')" @blur="doBlur('loginPassword')" :disabled="isProcessing" v-model="password" type="password" name="login-password" disableautocomplete autocomplete="new-password" maxlength="50" tabindex="2"/>
        </div>
        <div class="authcode form-item" :class="{ top: currFocus == 'authcode' || !!authcode, active: currFocus == 'authcode' }">
            <label for="login-authcode">验证码</label>
            <input type="text" ref="authcodeInput" @focus="doFocus('authcode')" @blur="doBlur('authcode')" :disabled="isProcessing" v-model="authcode" name="login-authcode" disableautocomplete autocomplete="off" maxlength="4" tabindex="3"/>
            <img :src="verificationCodeUrl + currTimestamp" @click="currTimestamp=Date.now()"/>
        </div>
        <div class="remember-account" :class="{ active: loginRemember }" @click="switchLoginRemember()">记住账号和密码</div>
        <div class="login-button" @click="doLogin()">登录</div>
    </div>
</template>
<script>
    import types from '@/store/constants/types'
    import tags from '@/lib/tags'
    import api from '@/lib/api'

    const ls = localStorage
    export default {
        name: 'LoginDialog',
        data () {
            return {
                loginName: '',
                password: '',
                authcode: '',
                isProcessing: false,
                currFocus: '',
                verificationCodeUrl: api.GET_VERIFICATION_CODE,
                currTimestamp: Date.now(),
                loginRemember: !(ls.getItem(tags.loginRemember) == '0')
            }
        },
        created () {
            // 监听回车按键
            document.body.addEventListener('keypress', this.doPresskey)
        },
        mounted () {
            const that = this
            that.$nextTick(() => {
                const state = that.$store.state
                const loginName = state.userName
                const password = ls.getItem(tags.password) || ''
                const refs = that.$refs
                setTimeout(() => {
                    refs.passwordInput.value = that.password = password
                    refs.loginNameInput.value = that.loginName = loginName
                    if (!loginName) {
                        refs.loginNameInput.focus()
                    } else if (!password) {
                        refs.passwordInput.focus()
                    }
                }, 800)
                setTimeout(() => {
                    that.$el.classList.add('active')
                }, 1000)
            })
        },
        methods: {
            // 执行登录
            doLogin () {
                const that = this
                const store = that.$store
                if (!that.isProcessing && that.checkForm()) {
                    that.isProcessing = true
                    store.commit(types.SWITCH_LOADING, true)
                    that.$ajax({
                        url: api.LOGIN,
                        method: 'post',
                        data: {
                            username: that.loginName.trim(),
                            password: that.password,
                            imageCode: that.authcode
                        }
                    }).then(res => {
                        that.isProcessing = false
                        if (res.code != 200) {
                            that.showMessage(res.msg || '登录失败！')
                            that.currTimestamp = Date.now()
                        } else {
                            that.showMessage('登录成功！')
                            const gardenId = res.garden_id - 0
                            store.commit(types.UPDATE_USER_INFO, {
                                userType: res.user_type - 0,
                                orchardId: res.garden_id - 0,
                                userName: that.loginName.trim(),
                                password: that.password.trim(),
                                loginRemember: that.loginRemember
                            })
                            // that.$router.push(gardenId ? 'monitor' : 'home')
                            store.commit(types.SWITCH_LOGIN_STATE, true)
                            setTimeout(() => {
                                that.$el.classList.remove('active')
                            }, 500)
                        }
                        store.commit(types.SWITCH_LOADING, false)
                    })
                }
            },
            // 回车按键
            doPresskey (e) {
                if (e.keyCode === 13) {
                    this.doLogin()
                }
            },
            // 切换是否记住密码
            switchLoginRemember () {
                const that = this
                that.loginRemember = !that.loginRemember
                if (that.loginRemember) { // 存用户名密码至ls
                    ls.setItem(tags.userName, that.loginName)
                    ls.setItem(tags.password, that.password)
                } else { // 从ls中清除用户名密码
                    ls.removeItem(tags.userName)
                    ls.removeItem(tags.password)
                }
            },
            // 校验表单
            checkForm () {
                const that = this
                const refs = that.$refs
                if (!that.loginName.trim()) {
                    refs.loginNameInput.focus()
                    that.showMessage('请输入您的登录账号！')
                    return false
                }
                if (!that.password) {
                    refs.passwordInput.focus()
                    that.showMessage('请输入您的登录密码！')
                    return false
                }
                if (!that.authcode.trim()) {
                    refs.authcodeInput.focus()
                    that.showMessage('请输入验证码！')
                    return false
                }
                return true
            },
            doFocus (formName) {
                this.currFocus = formName
            },
            doBlur (formName) {
                this.currFocus = ''
            },
            showMessage (messageStr) {
                this.$store.commit(types.SWITCH_MESSAGE_TIP, { tip: messageStr, show: true })
                console.log('showMessage...', messageStr)
            }
        },
        beforeDestroy () {
            // 移除事件
            document.body.removeEventListener('keypress', this.doPresskey)
        }
    }
</script>
