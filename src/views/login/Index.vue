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
        }
    }
</script>
<style lang="scss">
    @import '@/style/views/login.scss';
</style>
