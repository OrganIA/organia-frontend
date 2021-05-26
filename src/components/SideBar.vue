<template>
  <nav id="navbar">
    <header>
      <h1>
        <a href="/">
          <img
              src="https://cdn.discordapp.com/attachments/559512661717417986/784449164955746314/Asset_8.png"
          />
        </a>
      </h1>
    </header>
    <div id="navlinks">
      <div id="navbox">
        <a class="active" href="/receivers">
          <i class="fa fa-file-alt"></i>
          <span class="nav-text">Link 1</span>
        </a>
        <a>
          <i class="fa fa-desktop"></i>
        </a>
        <a>
          <i class="fa fa-map-marker-alt"></i>
        </a>
        <a>
          <i class="fa fa-user"></i>
        </a>
        <a>
          <i class="fa fa-chart-line"></i>
        </a>
        <a>
          <i class="fa fa-comment-dots"></i>
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "SideBar"
}
</script>

<style scoped>

</style>