<template>
  <side-bar></side-bar>
  <top-controls></top-controls>
</template>

<script>
import TopControls from "./TopControls";
import SideBar from "./SideBar";
export default {
  name: "Index",
  components: {SideBar, TopControls}
}
</script>

<style scoped>
@import '/src/styles/shared.css';

</style>