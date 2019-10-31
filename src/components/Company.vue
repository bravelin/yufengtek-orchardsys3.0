<template>
    <div class="company-logo-wrap">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 214 70">
            <defs>
                <filter id="company-inset-shadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feComponentTransfer in=SourceAlpha><feFuncA type="table" tableValues="1 0"/></feComponentTransfer>
                    <feGaussianBlur stdDeviation="7"/>
                    <feOffset dx="0" dy="1" result="offsetblur"/>
                    <feFlood flood-color="rgba(28,225,235,0.3)" result="color"/>
                    <feComposite in2="offsetblur" operator="in"/>
                    <feComposite in2="SourceAlpha" operator="in"/>
                    <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode/></feMerge>
                </filter>
            </defs>
            <path filter="url(#company-inset-shadow)" d="M2 19 v34 l12 12.5 h40 l9 -10 h149 l-19 -16 v-20 l19 -15 h-188 Z" stroke="#19b8bd" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/>
            <path id="company-svg-path" fill="none" d="M2 19 v34 l12 12.5 h40 l9 -10 h149 l-19 -16 v-20 l19 -15 h-188 Z" stroke="#1ce4eb" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"/>
        </svg>
        <span>裕丰科技</span>
    </div>
</template>
<script>
    export default {
        name: 'Company',
        mounted () {
            this.$nextTick(() => {
                const tween = TweenMax.fromTo('#company-svg-path', 6, { drawSVG: '4%' }, { drawSVG: '96% 100%', ease: Linear.easeInOut })
                tween.repeat(-1)
            })
        }
    }
</script>
<style lang="scss">
    @import '@/style/components/company.scss';
</style>
