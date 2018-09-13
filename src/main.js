import Vue from 'vue'
import App from './App.vue'

import photosScroll from './lib/index.js'
Vue.use(photosScroll)


new Vue({
  el: '#app',
  render: h => h(App)
})
