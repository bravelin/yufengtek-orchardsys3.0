import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store/index'
import ajax from '@/lib/ajax'
import vuescroll from 'vuescroll/dist/vuescroll-native'
import 'vuescroll/dist/vuescroll.css'
import Plane from '@/components/Plane'
import PlaneTitle from '@/components/PlaneTitle'

Vue.config.productionTip = false
Vue.prototype.$ajax = ajax
Vue.use(vuescroll)
Vue.component('Plane', Plane)
Vue.component('PlaneTitle', PlaneTitle)

new Vue({ router, store, render: h => h(App) }).$mount('#app')
