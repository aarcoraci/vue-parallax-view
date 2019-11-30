import Parallax from "./components/Parallax";

const VueParallaxView = {
  install(Vue) {
    Vue.component('parallax-view', Parallax);
  }
}

export default VueParallaxView;