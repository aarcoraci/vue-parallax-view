<template>
  <div id="parallax" :style="{ width: width, height: height }">
    <div class="mouse-pos">x: {{ mouseX }} y: {{ mouseY }}</div>
    <div
      class="layer"
      v-for="(layer, index) in stageLayers"
      :id="`layer_${layer.name}`"
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
  data() {
    return {
      mouseX: 0,
      mouseY: 0,
      stageLayers: []
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

      // values will be relative to the mouse position within the window and its center
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      // create a relation between how much the mouse has drifted from 0,0 (center of screen)
      const horizontalDistanceFromCenter = Math.abs(this.mouseX - windowWidth / 2);
      const verticalDistanceFromCenter = Math.abs(this.mouseY - windowHeight / 2);

      for (let index = 0; index < this.stageLayers.length; index++) {
        const layer = this.stageLayers[index];
        if (!document.getElementById(`layer_${layer.name}`)) {
          continue;
        }

        // calculate how much the layer respond to movement based on the displacement value
        const amountOfHorizontalMovement = horizontalDistanceFromCenter * layer.horizontalDisplacement / (windowWidth / 2);
        const amountOfVerticalMovement = verticalDistanceFromCenter * layer.verticalDisplacement / (windowHeight / 2);

        // assign a direction opposite to mouse movement
        const horizontalDirection = this.mouseX - windowWidth / 2 > 0 ? -1 : 1;
        const verticalDirection = this.mouseY - windowHeight / 2 > 0 ? -1 : 1;

        const xMovement = amountOfHorizontalMovement * horizontalDirection * 100;
        const yMovement = amountOfVerticalMovement * verticalDirection * 100;

        document.getElementById(`layer_${layer.name}`).style['transform'] = `translate(0, 0) translate(${xMovement.toFixed(0)}px, ${yMovement.toFixed(0)}px)`;
      }

    },
    onMouseMove(evt) {
      this.mouseX = evt.screenX;
      this.mouseY = evt.screenY;
    }
  },
  beforeMount() {
    // prepare the layers
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

    this.animateStage();
  },
  mounted() {
    window.addEventListener("mousemove", this.onMouseMove);
  },
  beforeDestroy() {
    window.removeEventListener("mousemove", this.onMouseMove);
  }
}
</script>

<style lang="scss" scoped>
#parallax {
  margin: 0 auto;
  position: relative;
  overflow: hidden;

  .mouse-pos {
    position: absolute;
    right: 5px;
    bottom: 5px;
    background-color: white;
    border-radius: 4px;
    padding: 5px 10px;
    z-index: 100;
    display: none;
  }

  .layer {
    position: absolute;
    transform-origin: left bottom;
    will-change: transform;
    transition: 300ms all linear;
    background-repeat: no-repeat;
    background-size: cover;
  }
}
</style>