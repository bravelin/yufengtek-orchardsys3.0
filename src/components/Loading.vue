<template>
    <div class="loading-wrap show active">
        <div class="loading-eclipse"><div></div></div>
    </div>
</template>
<script>
    const showProp = `$store.state.loading`
    let timer = null
    export default {
        name: 'Loading',
        watch: {
            [showProp] (newVal) {
                const el = this.$el
                timer && clearTimeout(timer)
                if (newVal) {
                    el.classList.add('show')
                    timer = setTimeout(() => { el.classList.add('active') }, 150)
                } else {
                    el.classList.remove('active')
                    timer = setTimeout(() => { el.classList.remove('show') }, 550)
                }
            }
        }
    }
</script>
<style lang="scss">
    @import '../style/components/loading.scss';
</style>
