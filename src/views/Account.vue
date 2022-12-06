<template>
  <div class="app-navbar-container">
    <ApplicationNavbar></ApplicationNavbar>
  </div>
  <div class="columns">
    <div class="column sidebar-column">
      <SideBar></SideBar>
    </div>
    <div class="column page-container">
      <div class="page-content">
        <button class="button is-link is-light is-large is-responsive is-rounded is-focused title-btn"><strong>MON
            COMPTE</strong></button>
        <div class="columns">
          <div class="info-container">
            <div class="info-row">
              <div class="info-label">Nom</div>
              <div class="info-data">{{ user.lastname }}</div>
            </div>
            <div class="info-row">
              <div class="info-label">Prénom</div>
              <div class="info-data">{{ user.firstname }}</div>
            </div>
            <div class="info-row">
              <div class="info-label">Numéro de téléphone</div>
              <div class="info-data">{{ '+33' + user.phone_number }}</div>
            </div>
            <div class="info-row">
              <div class="info-label">Email</div>
              <div class="info-data">{{ user.email }}</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from "@/components/SideBar";
import ApplicationNavbar from "@/components/ApplicationNavbar";

export default {
  name: "my-account",
  components: {
    SideBar,
    ApplicationNavbar
  },
  data() {
    return {
      user: {}
    }
  },
  created() {
    this.getMyinfo();
  },
  methods: {
    getMyinfo() {
      this.$http
        .get("/users/me")
        .then((response) => {
          this.user = response.data;
        })
    },
  },
};
</script>

<style scoped>
.page-content {
  margin: 0 5%;
}

.title-btn {
  width: 100%;
  border: none;
  pointer-events: none;
  margin-bottom: 5%;
}

.info-container {
  width: 100%;
  height: 100%;
  margin-bottom: 5%;
}

.info-row {
  width: 100%;
  height: 55px;
  border-radius: 12px;
  margin-bottom: 1%;
  display: flex;
  flex-direction: row;
}

.info-label {
  width: 300px;
  height: 100%;
  display: flex;
  justify-content: left;
  align-items: center;
  border: #2c3e50 1px solid;
  border-radius: 12px 0 0 12px;
  padding-left: 5%;
}

.info-data {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: left;
  align-items: center;
  border: #2c3e50 1px solid;
  border-radius: 0 12px 12px 0;
  padding-left: 10px;
}
</style>