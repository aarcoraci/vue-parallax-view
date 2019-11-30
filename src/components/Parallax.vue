<template>
  <div id="vue-parallax-view" :style="{ width: width, height: height }">
    <div
      class="vue-parallax-view-layer"
      v-for="(layer, index) in stageLayers"
      :id="`vue_parallax_layer_${layer.name}`"
      :key="index"
      :style="{
        backgroundImage: 'url(' + layer.img + ')',
        left: layer.horizontalOffset,
        right: layer.horizontalOffset,
        top: layer.verticalOffset,
        bottom: layer.verticalOffset
      }"
      :ref="`layer_${layer.name}`"
    ></div>
  </div>
</template>

<script>
export default {
  name: "vue-parallax-view",
  data() {
    return {
      mouseX: 0,
      mouseY: 0,
      stageLayers: [],
      windowWidth: 0,
      windowHeight: 0,
      centerCoords: { x: 0, y: 0 }
    }
  },
  props: {
    layers: {
      type: Array,
      required: true
    },
    width: {
      type: String,
      default: '600px'
    },
    height: {
      type: String,
      default: '600px'
    }
  },
  methods: {
    animateStage() {

      requestAnimationFrame(this.animateStage);

      // create a relation between how much the mouse has drifted from 0,0 (center of screen)
      const horizontalDistanceFromCenter = Math.abs(this.mouseX - this.centerCoords.x);
      const verticalDistanceFromCenter = Math.abs(this.mouseY - this.centerCoords.y);

      for (let index = 0; index < this.stageLayers.length; index++) {
        const layer = this.stageLayers[index];

        // calculate how much the layer respond to movement based on the displacement value
        const amountOfHorizontalMovement = horizontalDistanceFromCenter * layer.horizontalDisplacement / this.centerCoords.x;
        const amountOfVerticalMovement = verticalDistanceFromCenter * layer.verticalDisplacement / this.centerCoords.y;

        // assign a direction opposite to mouse movement
        const horizontalDirection = this.mouseX - this.centerCoords.x > 0 ? -1 : 1;
        const verticalDirection = this.mouseY - this.centerCoords.y > 0 ? -1 : 1;

        const xMovement = amountOfHorizontalMovement * horizontalDirection * 100;
        const yMovement = amountOfVerticalMovement * verticalDirection * 100;

        document.getElementById(`vue_parallax_layer_${layer.name}`).style['transform'] = `translate(0, 0) translate(${xMovement.toFixed(0)}px, ${yMovement.toFixed(0)}px)`;
      }

    },
    onMouseMove(evt) {
      this.mouseX = evt.screenX;
      this.mouseY = evt.screenY;
    },
    onWindowResize() {
      this.windowWidth = window.innerWidth;
      this.windowHeight = window.innerHeight;
      this.centerCoords.x = this.windowWidth / 2;
      this.centerCoords.y = this.windowHeight / 2;
    }
  },
  beforeMount() {
    // build the stage layer objects based on the configurations
    this.layers.forEach(layer => {
      const horizontalOffset = layer.horizontalDisplacement * 100 / 2;
      const verticalOffset = layer.verticalDisplacement * 100 / 2;
      this.stageLayers.push({
        name: layer.name,
        img: layer.image,
        verticalDisplacement: layer.verticalDisplacement,
        horizontalDisplacement: layer.horizontalDisplacement,
        horizontalOffset: `-${horizontalOffset}%`,
        verticalOffset: `-${verticalOffset}%`
      });
    });

  },
  mounted() {
    window.addEventListener("mousemove", this.onMouseMove);
    window.addEventListener("resize", this.onWindowResize);
    this.onWindowResize();
    this.animateStage();
  },
  beforeDestroy() {
    window.removeEventListener("mousemove", this.onMouseMove);
    window.removeEventListener("resize", this.onWindowResize);
  }
}
</script>

<style lang="scss" scoped>
#vue-parallax-view {
  margin: 0 auto;
  position: relative;
  overflow: hidden;

  .vue-parallax-view-layer {
    position: absolute;
    transform-origin: left bottom;
    will-change: transform;
    transition: 300ms transform linear;
    background-repeat: no-repeat;
    background-size: cover;
  }
}
</style>