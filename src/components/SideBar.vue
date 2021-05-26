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

#navbar header {
  background-color: var(--logo-dark-blue);
  color: white;
  padding: 0 0.5em;
  text-align: center;
}

#navbar header a {
  color: inherit;
  text-decoration: none;
}

#navbar {
  display: flex;
  flex-direction: column;
}

#navbar header img {
  max-width: 120px;
}

#navlinks {
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: center;
  font-size: var(--font-big);
}

#navbox {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--light-gray);
  border-radius: var(--rounding);
  padding: 0.5em;
  /* width: min-content; */
  flex: 0 0 auto;
}

#navlinks .nav-text {
  display: none;
}

#navbox > * {
  border-radius: var(--rounding);
  padding: 0.5em;
  color: var(--sky-blue);
}

#navbox > .active {
  background-color: var(--blue);
  color: white;
}

</style>