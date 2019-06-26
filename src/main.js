import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'


import Vuelidate from 'vuelidate'
import BootstrapVue from 'bootstrap-vue'
import SmoothScrollbar from 'vue-smooth-scrollbar'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


window.axios = require('axios/index').create({
  baseURL: 'http://127.0.0.1:5000/',
});

Vue.use(Vuelidate);
Vue.use(BootstrapVue);
Vue.use(SmoothScrollbar);

Vue.config.productionTip = false;


Vue.directive('scroll', {
  inserted: function (el, binding) {
    let f = function (evt) {
      if (binding.value(evt, el)) {
        window.removeEventListener('scroll', f)
      }
    };
    window.addEventListener('scroll', f)
  }
});


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

