<template>
  <div id="app">
    <parallax />
  </div>
</template>

<script>
import Parallax from "@/components/Parallax";
export default {
  name: 'app',
  components: {
    Parallax
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
