<template>
  <PresentationNavbar></PresentationNavbar>
  <div class="wave">
    <svg width="100%" height="200px" fill="none" version="1.1"
         xmlns="http://www.w3.org/2000/svg">
      <path
          fill="white"
          d="
            M0 67
            C 273,183
              822,-41
              1920.01,106
            V 359
            H 0
            V 67
            Z">
      </path>
    </svg>
  </div>
  <div id="container">
    <img class="img-comp-1" src="https://media.discordapp.net/attachments/959068123187773570/976471787053387866/unknown.png" alt="">
    <img class="img-comp-2" src="https://media.discordapp.net/attachments/959068123187773570/976471787053387866/unknown.png" alt="">
    <div class="main-img-container">
      <img class="img-main" src="https://cdn.discordapp.com/attachments/559512661717417986/784449164955746314/Asset_8.png">
    </div>
  </div>
</template>

<script>
import PresentationNavbar from "@/components/PresentationNavbar";

export default {
  name: "Home",
  components: { PresentationNavbar}
}
</script>

<style scoped>

</style>