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
  name: "App",
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
<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap");
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css");
@import url("https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css");


:root {
  --blue: #498afe;
  --dark-blue: #071f49;
  --sky-blue: #97a0b8;
  --white: #fbfcff;
  --red: #ff5b5b;
  --gray: #8e8e8e;
  --green: #a4ea98;
  --yellow: #eff269;
  --light-gray: #eff2f8;

  --logo-dark-blue: #0f2c59;
  --logo-light-blue: #29abe2;

  --bg-color: var(--white);
  --fg-color: var(--dark-blue);
  --border-color: #e3e9f6;

  --font-immense: 38px;
  --font-big: 21px;
  --font-normal: 16px;
  --font-small: 12px;
  --font-regular: 400;
  --font-medium: 500;

  --rounding: 0.75em;

  --anim-time: 0.25s;

  --shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>