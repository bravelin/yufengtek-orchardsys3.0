<template>
    <div class="navmenu-wrap">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1366 80">
            <defs>
                <filter id="navmenu-inset-shadow-1" x="-50%" y="-50%" width="200%" height="200%">
                    <feComponentTransfer in=SourceAlpha><feFuncA type="table" tableValues="1 0"/></feComponentTransfer>
                    <feGaussianBlur stdDeviation="7"/>
                    <feOffset dx="0" dy="1" result="offsetblur"/>
                    <feFlood flood-color="rgba(28,225,235,0.3)" result="color"/>
                    <feComposite in2="offsetblur" operator="in"/>
                    <feComposite in2="SourceAlpha" operator="in"/>
                    <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode/></feMerge>
                </filter>
                <filter id="navmenu-inset-shadow-2" x="-50%" y="-50%" width="200%" height="200%">
                    <feComponentTransfer in=SourceAlpha><feFuncA type="table" tableValues="1 0"/></feComponentTransfer>
                    <feGaussianBlur stdDeviation="15"/>
                    <feOffset dx="0" dy="1" result="offsetblur"/>
                    <feFlood flood-color="rgba(28,225,235,0.25)" result="color"/>
                    <feComposite in2="offsetblur" operator="in"/>
                    <feComposite in2="SourceAlpha" operator="in"/>
                    <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode/></feMerge>
                </filter>
            </defs>
            <path filter="url(#navmenu-inset-shadow-1)" d="M2 40 v26 l13 13 h8 l9 -12.5 h114 l8 8 h140 l6 -10 h160 l-16 -59 h-94 l-9 9 h-52 l-10 8 h-260 Z" stroke="#19b8bd" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/>
            <path filter="url(#navmenu-inset-shadow-1)" d="M1364 40 v26 l-13 13 h-8 l-9 -12.5 h-114 l-8 8 h-140 l-6 -10 h-160 l16 -59 h94 l9 9 h52 l10 8 h260 Z" stroke="#19b8bd" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/>
            <path filter="url(#navmenu-inset-shadow-2)" d="M441 0 l20 70 q3 8 10 8 h30 l6 -7 h12 l6 -7 h315 l6 7 h12 l6 7 h30 q7 0 10 -8 l23 -78 Z" stroke="#19b8bd" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/>
            <g>
                <path d="M350 15 h7 l5 -6 h-7 Z" fill="#19bfc5" stroke="none"></path>
                <path d="M360 15 h7 l5 -6 h-7 Z" fill="#17adb2" stroke="none"></path>
                <path d="M370 15 h7 l5 -6 h-7 Z" fill="#159a9f" stroke="none"></path>
                <path d="M380 15 h7 l5 -6 h-7 Z" fill="#13878c" stroke="none"></path>
                <path d="M390 15 h7 l5 -6 h-7 Z" fill="#12757a" stroke="none"></path>
                <path d="M400 15 h7 l5 -6 h-7 Z" fill="#136569" stroke="none"></path>
            </g>
            <g>
                <path d="M1016 15 h-7 l-5 -6 h7 Z" fill="#19bfc5" stroke="none"></path>
                <path d="M1006 15 h-7 l-5 -6 h7 Z" fill="#17adb2" stroke="none"></path>
                <path d="M996 15 h-7 l-5 -6 h7 Z" fill="#159a9f" stroke="none"></path>
                <path d="M986 15 h-7 l-5 -6 h7 Z" fill="#13878c" stroke="none"></path>
                <path d="M976 15 h-7 l-5 -6 h7 Z" fill="#12757a" stroke="none"></path>
                <path d="M966 15 h-7 l-5 -6 h7 Z" fill="#136569" stroke="none"></path>
            </g>
            <g>
                <path d="M28 79 h7 l5 -6 h-7 Z" fill="#19bfc5" stroke="none"></path>
                <path d="M38 79 h7 l5 -6 h-7 Z" fill="#17adb2" stroke="none"></path>
                <path d="M48 79 h7 l5 -6 h-7 Z" fill="#159a9f" stroke="none"></path>
                <path d="M58 79 h7 l5 -6 h-7 Z" fill="#13878c" stroke="none"></path>
                <path d="M68 79 h7 l5 -6 h-7 Z" fill="#12757a" stroke="none"></path>
                <path d="M78 79 h7 l5 -6 h-7 Z" fill="#136569" stroke="none"></path>
            </g>
            <g>
                <path d="M1338 79 h-7 l-5 -6 h7 Z" fill="#19bfc5" stroke="none"></path>
                <path d="M1328 79 h-7 l-5 -6 h7 Z" fill="#17adb2" stroke="none"></path>
                <path d="M1318 79 h-7 l-5 -6 h7 Z" fill="#159a9f" stroke="none"></path>
                <path d="M1308 79 h-7 l-5 -6 h7 Z" fill="#13878c" stroke="none"></path>
                <path d="M1298 79 h-7 l-5 -6 h7 Z" fill="#12757a" stroke="none"></path>
                <path d="M1288 79 h-7 l-5 -6 h7 Z" fill="#136569" stroke="none"></path>
            </g>
            <g>
                <path d="M463 52 l3 7 h15 l-3 -7 h-15 Z " fill="#19bfc5" stroke="none"></path>
                <path d="M459 41 l3 7 h15 l-3 -7 h-15 Z " fill="#19c4ca" stroke="none"></path>
                <path d="M455 30 l3 7 h15 l-3 -7 h-15 Z " fill="#14898e" stroke="none"></path>
                <path d="M451 19 l3 7 h15 l-3 -7 h-15 Z " fill="#105e62" stroke="none"></path>
                <path d="M447 8 l3 7 h15 l-3 -7 h-15 Z " fill="#0d484b" stroke="none"></path>
            </g>
            <g>
                <path d="M903 52 l-3 7 h-15 l3 -7 h15 Z " fill="#19bfc5" stroke="none"></path>
                <path d="M907 41 l-3 7 h-15 l3 -7 h15 Z " fill="#19c4ca" stroke="none"></path>
                <path d="M911 30 l-3 7 h-15 l3 -7 h15 Z " fill="#14898e" stroke="none"></path>
                <path d="M915 19 l-3 7 h-15 l3 -7 h15 Z " fill="#105e62" stroke="none"></path>
                <path d="M919 8 l-3 7 h-15 l3 -7 h15 Z " fill="#0d484b" stroke="none"></path>
            </g>
            <path id="navmenu-ani-svg-path-1" fill="none" d="M32 66.5 h114 l8 8 h140 l6 -10 h160" stroke="#1ce4eb" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"/>
        </svg>
        <ul>
            <li class="active">首页</li>
            <li>智慧源地</li>
            <li>种植分布</li>
        </ul>
        <h1>智慧源地大数据综合分析平台 </h1>
        <ul>
            <li>农事活动</li>
            <li>产品仓储</li>
            <li>溯源动态</li>
        </ul>
    </div>
</template>
<script>
    export default {
        name: 'NavMenu',
        mounted () {
            this.$nextTick(() => {
                const tween = TweenMax.fromTo('#navmenu-ani-svg-path-1', 6, { drawSVG: '4%' }, { drawSVG: '96% 100%', ease: Linear.easeInOut })
                tween.yoyo(true).repeat(-1)
            })
        }
    }
</script>
<style lang="scss">
    @import '@/style/components/navMenu.scss';
</style>