// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

import axios from 'axios'
import qs from 'qs'
// axios.defaults.baseURL = 'http://localhost:8082'
/* 请求拦截器,设置发送请求时携带token */

// axios.interceptors.request.use(config => {
//   let username = window.sessionStorage.getItem('username')
//   if(username!=null &&username.length!=0) {
//     this.$router.replace('/login')
//   }
//   return config
// })

Vue.prototype.$axios = axios
Vue.prototype.qs = qs
Vue.config.productionTip = false

//跨域时可以携带cookie
axios.defaults.withCredentials = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
