import Parallax from "./components/Parallax";

const ParallaxView = {
  install(Vue) {
    Vue.component('parallax-view', Parallax);
  }
}

export default ParallaxView;