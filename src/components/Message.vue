<template>
    <div class="message-tip">{{ tip }}</div>
</template>
<script>
    import { createNamespacedHelpers } from 'vuex'
    import types from '@/store/constants/types'
    import ns from '@/store/constants/ns'

    const showProp = `$store.state.showMessageTip`
    let timer1 = null
    let timer2 = null
    export default {
        name: 'Message',
        data () {
            return {
                tip: '',
            }
        },
        watch: {
            [showProp] (newVal) {
                const that = this
                const el = that.$el
                const store = that.$store
                if (timer1) {
                    clearTimeout(timer1)
                    timer1 = null
                }
                if (timer2) {
                    clearTimeout(timer2)
                    timer2 = null
                }
                if (newVal) {
                    that.tip = store.state.tip
                    el.classList.add('show')
                    timer1 = setTimeout(() => {
                        el.classList.add('active')
                        timer1 = null
                    }, 100)
                    timer2 = setTimeout(() => {
                        el && el.classList.remove('active')
                        setTimeout(() => { el && el.classList.remove('show') }, 100)
                        store.commit(types.SWITCH_MESSAGE_TIP, { show: false })
                        timer2 = null
                    }, 3000)
                }
            }
        }
    }
</script>
<style lang="scss">
    @import '@/style/components/message.scss';
</style>
