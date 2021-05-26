<template>
  <side-bar></side-bar>
  <top-controls></top-controls>
</template>

<script>
import TopControls from "./components/TopControls";
import SideBar from "./components/SideBar";
export default {
  name: "App",
  components: {SideBar, TopControls}
}
</script>

<style scoped>
@import '/src/styles/shared.css';

</style>