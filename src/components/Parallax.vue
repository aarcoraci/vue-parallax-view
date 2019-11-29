<template>
  <div id="parallax" @mousemove="onMouseMove">
    <div class="mouse-pos">
      x: {{ horizontalDistanceFromCenter }} y: {{ verticalDistanceFromCenter }}
    </div>
    <div id="target" class="layer"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mouseX: 0,
      mouseY: 0,
      layers: []
    }
  },
  methods: {
    animateStage() {

      requestAnimationFrame(this.animateStage);

      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      // x related values
      const horizontalDistanceFromCenter = Math.abs(this.mouseX - windowWidth / 2);
      const amountOfHorizontalMovement = horizontalDistanceFromCenter * 0.2 / (windowWidth / 2);

      // y related values
      const verticalDistanceFromCenter = Math.abs(this.mouseY - windowHeight / 2);
      const amountOfVerticalMovement = verticalDistanceFromCenter * 0.2 / (windowHeight / 2);

      let horizontalMoveDirection = 1;
      if (this.mouseX - windowWidth / 2 > 0) {
        horizontalMoveDirection = -1;
      }

      let verticalMoveDirection = 1;
      if (this.mouseY - windowHeight / 2 > 0) {
        verticalMoveDirection = -1;
      }

      const xMovement = amountOfHorizontalMovement * horizontalMoveDirection * 100;
      const yMovement = amountOfVerticalMovement * verticalMoveDirection * 100;

      document.getElementById("target").style['transform'] = `translate(0, 0) translate(${xMovement.toFixed(0)}px, ${yMovement.toFixed(0)}px)`;

    },
    onMouseMove(evt) {
      this.mouseX = evt.screenX;
      this.mouseY = evt.screenY;
    }
  },
  mounted() {
    // prepare the layers
    this.layers.push({
      img: "~@/assets/layer_pines.png"
    })
    this.animateStage();
  }
}
</script>

<style lang="scss" scoped>
#parallax {
  margin: 0 auto;
  background-color: blueviolet;
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;

  .mouse-pos {
    position: absolute;
    right: 5px;
    bottom: 5px;
    background-color: white;
    border-radius: 4px;
    padding: 5px 10px;
  }

  .layer {
    position: absolute;
    left: 0 - 10%;
    top: 0 + 10%;
    bottom: 0 - 10%;
    right: 0 + 10%;
    transform-origin: left bottom;
    will-change: transform;
    transition: 250ms all linear;
    background-image: url("~@/assets/layer_pines.png");
    background-repeat: no-repeat;
    background-size: contain;
  }
}
</style>