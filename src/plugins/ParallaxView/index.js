import Parallax from "./Parallax.vue";

const ParallaxView = {
  install(Vue) {
    Vue.component('parallax-view', Parallax);
  }
}

export default ParallaxView;