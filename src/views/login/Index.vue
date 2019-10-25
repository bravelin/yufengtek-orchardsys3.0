<template>
    <div class="page login-page">
        <Dialog></Dialog>
        <Sphere></Sphere>
    </div>
</template>
<script>
    import types from '@/store/constants/types'
    import Dialog from './Dialog'
    import Sphere from './Sphere'
    export default {
        name: 'Login',
        components: { Dialog, Sphere },
        created () {
            this.$store.commit(types.SWITCH_LOADING, false)
        }
    }
</script>
<style lang="scss">
    @import '@/style/views/login.scss';
</style>
