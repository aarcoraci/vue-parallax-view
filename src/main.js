import Vue from 'vue'
import App from './App.vue'
import ParallaxView from "@/plugins/ParallaxView";

Vue.config.productionTip = false
Vue.use(ParallaxView)

new Vue({
  render: h => h(App),
}).$mount('#app')
