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
        <button class="button is-link is-light is-large is-responsive is-rounded is-focused"><strong>MON
            COMPTE</strong></button>
        <br><br>
        <div class="columns">
          <article class="message is-info column">
            <div class="message-header">
              <p>Nom</p>
            </div>
            <div class="message-body">
              <strong>{{ lastname }}</strong>
            </div>
          </article>
          <article class="message is-info column">
            <div class="message-header">
              <p>Prénom</p>
            </div>
            <div class="message-body">
              <strong>{{ firstname }}</strong>
            </div>
          </article>
        </div>
        <div class="columns">
          <article class="message is-info column">
            <div class="message-header">
              <p>Numéro de téléphone</p>
            </div>
            <div class="message-body">
              <strong>{{ phone_number }}</strong>
            </div>
          </article>
          <article class="message is-info column">
            <div class="message-header">
              <p>Email</p>
            </div>
            <div class="message-body">
              <strong>{{ email }}</strong>
            </div>
          </article>
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
          this.email = response.data.email;
          this.firstname = response.data.firstname;
          this.lastname = response.data.lastname;
          this.phone_number = response.data.phone_number;
        })
    },
  },
};
</script>

<style scoped>

</style>