<template>
  <div class="modal-loader">
    <div class="spinner">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>

</template>

<script>
export default {
  name: "Loader"
}
</script>
<style>
.spinner {
  margin: 15% auto auto;
  width: 150px;
  height: 150px;
  animation: spinner-y0fdc1 2.8s infinite ease;
  transform-style: preserve-3d;
}

.spinner > div {
  background-color: rgba(45, 101, 148, 0.3);
  height: 100%;
  position: absolute;
  width: 100%;
  border: 5px solid #3656a8;
}

.spinner div:nth-of-type(1) {
  transform: translateZ(-75px) rotateY(180deg);
}

.spinner div:nth-of-type(2) {
  transform: rotateY(-270deg) translateX(50%);
  transform-origin: top right;
}

.spinner div:nth-of-type(3) {
  transform: rotateY(270deg) translateX(-50%);
  transform-origin: center left;
}

.spinner div:nth-of-type(4) {
  transform: rotateX(90deg) translateY(-50%);
  transform-origin: top center;
}

.spinner div:nth-of-type(5) {
  transform: rotateX(-90deg) translateY(50%);
  transform-origin: bottom center;
}

.spinner div:nth-of-type(6) {
  transform: translateZ(75px);
}

@keyframes spinner-y0fdc1 {
  0% {
    transform: rotate(45deg) rotateX(-25deg) rotateY(25deg);
  }

  50% {
    transform: rotate(45deg) rotateX(-385deg) rotateY(25deg);
  }

  100% {
    transform: rotate(45deg) rotateX(-385deg) rotateY(385deg);
  }
}

.modal-loader {
  width: 100vw;
  height: 100vh;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.41);
  backdrop-filter: blur(1px);
  z-index: 9000000;
}

</style>