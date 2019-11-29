<template>
  <div id="app">
    <parallax :layers="layers" :width="'900px'" :height="'650px'" />
  </div>
</template>

<script>
import Parallax from "@/components/Parallax";
export default {
  name: 'app',
  components: {
    Parallax
  },
  data() {
    return {
      layers: [
        {
          name: "bg_sky",
          horizontalDisplacement: 0.01,
          verticalDisplacement: 0.01,
          image: require('@/assets/layer_sky.png')
        },
        {
          name: "bg_clouds",
          horizontalDisplacement: 0.1,
          verticalDisplacement: 0.1,
          image: require('@/assets/layer_clouds.png')
        },
        {
          name: "bg_mountain",
          horizontalDisplacement: 0.075,
          verticalDisplacement: 0.075,
          image: require('@/assets/layer_bg_mountains.png')
        },
        {
          name: "bg_pines",
          horizontalDisplacement: 0.11,
          verticalDisplacement: 0.11,
          image: require('@/assets/layer_bg_pines.png')
        },
        {
          name: "ground",
          horizontalDisplacement: 0.15,
          verticalDisplacement: 0.15,
          image: require('@/assets/layer_ground.png')
        },
        {
          name: "pines",
          horizontalDisplacement: 0.3,
          verticalDisplacement: 0.3,
          image: require('@/assets/layer_pines.png')
        }
      ]
    }
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

html,
body {
  margin: 0;
  padding: 0;
}
</style>
