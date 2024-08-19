import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'
import moment from 'moment'
import iziToast from 'izitoast'
import VueIziToast from 'vue-izitoast'
import Vuelidate from 'vuelidate'
import VueSweetalert2 from 'vue-sweetalert2'

import AppNavBar from './components/AppNavBar'
import AppFooter from './components/AppFooter'
import ControlSideBar from './components/ControlSideBar'
import AppSideBar from './components/AppSideBar'

import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';
import 'admin-lte/plugins/fontawesome-free/css/all.min.css'
import 'admin-lte/plugins/icheck-bootstrap/icheck-bootstrap.min.css'
import 'admin-lte/dist/css/adminlte.min.css?v=3.2.0'
import 'admin-lte/plugins/jquery/jquery.min.js'
import 'admin-lte/plugins/bootstrap/js/bootstrap.bundle.min.js'
import 'admin-lte/dist/js/adminlte.min.js?v=3.2.0'
// import 'admin-lte/plugins/select2/css/select2.min.css'
// import 'admin-lte/plugins/select2-bootstrap4-theme/select2-bootstrap4.min.css'
// import 'admin-lte/plugins/select2/js/select2.full.min.js'
import datePicker from 'vue-bootstrap-datetimepicker';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faScrewdriverWrench, faDroplet } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faScrewdriverWrench,faDroplet);
Vue.component('font-awesome-icon', FontAwesomeIcon)

let eventBus = new Vue();
Vue.prototype.$eventBus = eventBus
Vue.prototype.$axios = axios
Vue.prototype.$VueIziToast = iziToast

Vue.component('AppNavBar', AppNavBar)
Vue.component('AppFooter', AppFooter)
Vue.component('ControlSideBar', ControlSideBar)
Vue.component('AppSideBar', AppSideBar)
Vue.use(VueIziToast)
Vue.use(Vuelidate)
Vue.use(VueSweetalert2)
Vue.use(datePicker);

Vue.config.productionTip = false

Vue.prototype.moment = moment
moment.locale('id');
window.$ = window.jQuery = require('jquery');
// $(function () {
// 	$('.select2').select2()
// 	$('.select2bs4').select2({
// 		theme: 'bootstrap4'
// 	})
// })
jQuery.extend(true, jQuery.fn.datetimepicker.defaults, {
  icons: {
    time: 'far fa-clock',
    date: 'far fa-calendar',
    up: 'fas fa-arrow-up',
    down: 'fas fa-arrow-down',
    previous: 'fas fa-chevron-left',
    next: 'fas fa-chevron-right',
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
