import Parallax from "./components/Parallax";

const VueParallaxView = {
  install(Vue) {
    Vue.component('vue-parallax-view', Parallax);
  }
}

export default VueParallaxView;