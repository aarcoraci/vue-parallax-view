<template>
  <div id="parallax" @mousemove="onMouseMove">
    <div class="mouse-pos">x: {{ mouseX }} y: {{ mouseY }}</div>
    <div id="target" class="target"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mouseX: 0,
      mouseY: 0
    }
  },
  methods: {
    animateStage() {

      requestAnimationFrame(this.animateStage);

      const elementWidth = document.getElementById("parallax").offsetWidth;
      const elementHeight = document.getElementById("parallax").offsetHeight;

      // x related values
      const horizontalDistanceFromCenter = Math.abs(this.mouseX - elementWidth / 2);
      const amountOfHorizontalMovement = horizontalDistanceFromCenter * 0.2 / (elementWidth / 2);

      // y related values
      const verticalDistanceFromCenter = Math.abs(this.mouseY - elementHeight / 2);
      const amountOfVerticalMovement = verticalDistanceFromCenter * 0.4 / (elementHeight / 2);

      let horizontalMoveDirection = 1;
      if (this.mouseX - elementWidth / 2 > 0) {
        horizontalMoveDirection = -1;
      }

      let verticalMoveDirection = 1;
      if (this.mouseY - elementHeight / 2 > 0) {
        verticalMoveDirection = -1;
      }

      const xMovement = amountOfHorizontalMovement * horizontalMoveDirection * 100;
      const yMovement = amountOfVerticalMovement * verticalMoveDirection * 100;

      document.getElementById("target").style['transform'] = `translate(-50%, -50%) translate(${xMovement.toFixed(0)}px, ${yMovement.toFixed(0)}px)`;

    },
    onMouseMove(evt) {
      this.mouseX = evt.screenX;
      this.mouseY = evt.screenY;

    }
  },
  mounted() {
    this.animateStage();
  }
}
</script>

<style lang="scss" scoped>
#parallax {
  margin: 0 auto;
  background-color: red;
  width: 100vw;
  height: 100vh;
  position: relative;

  .mouse-pos {
    position: absolute;
    right: 5px;
    bottom: 5px;
    background-color: white;
    border-radius: 4px;
    padding: 5px 10px;
  }

  .target {
    position: absolute;
    left: 50%;
    top: 50%;
    background-color: lightsalmon;
    width: 250px;
    height: 250px;
    will-change: transform;
    transition: 250ms all linear;
  }
}
</style>