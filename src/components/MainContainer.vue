<template>
  <div class="main-container">
    <side-bar></side-bar>
    <top-controls></top-controls>
  </div>
</template>

<script>
import TopControls from "../components/TopControls";
import SideBar from "../components/SideBar";

export default {
  name: "MainContainer",
  components: {SideBar, TopControls}
}
</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: row;
  flex: 1;
  width: 100%;
  height: 100vh;
}
</style>