<template>
    <div id="app" :style="{ height: winHeight + 'px' }">
        <router-view :style="{ height: pageHeight + 'px' }"/>
        <Loading v-show="loading"></Loading>
    </div>
</template>

<script>
    import Loading from '@/components/Loading'
    import { mapState } from 'vuex'
    import types from '@/store/constants/types'
    import { getPageParams } from '@/lib/util'

    export default {
        name: 'app',
        components: { Loading },
        computed: {
            ...mapState(['loading', 'winHeight']),
            pageHeight () {
                const state = this.$store.state
                let h = state.winHeight - 133
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
