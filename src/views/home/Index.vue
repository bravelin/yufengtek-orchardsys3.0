<template>
    <div class="page"></div>
</template>
<script>
    import types from '@/store/constants/types'
    export default {
        created () {
            const that = this
            that.$store.commit(types.SWITCH_LOADING, false)
        }
    }
</script>
