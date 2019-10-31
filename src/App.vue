<template>
    <div id="app" :style="{ height: winHeight + 'px' }">
        <div class="app-top-wrap">
            <Company></Company>
            <NavMenu></NavMenu>
            <LogoutButton></LogoutButton>
        </div>
        <router-view :style="{ height: pageHeight + 'px' }"/>
        <Loading v-show="loading"></Loading>
        <Message></Message>
    </div>
</template>

<script>
    import Loading from '@/components/Loading'
    import Message from '@/components/Message'
    import Company from '@/components/Company'
    import NavMenu from '@/components/NavMenu'
    import LogoutButton from '@/components/LogoutButton'
    import { mapState } from 'vuex'
    import types from '@/store/constants/types'
    import { getPageParams } from '@/lib/util'

    export default {
        name: 'app',
        components: { Loading, Message, Company, LogoutButton, NavMenu },
        computed: {
            ...mapState(['loading', 'winHeight']),
            pageHeight () {
                const state = this.$store.state
                let h = state.winHeight - 80
                if (state.winWidth <= 1200) {
                    h += 29
                } else if (state.winWidth <= 1400) {
                    h += 25
                }
                return h > 505 ? h : 505
            }
        },
        created () {
            const that = this
            const store = that.$store
            const win = window
            // 监听窗口大小的改变
            win.addEventListener('resize', () => {
                store.commit(types.GET_WINDOW_SIZE)
            })
            store.commit(types.GET_WINDOW_SIZE)
        }
    }
</script>
<style lang="scss">
    @import './style/common/app.scss';
</style>
