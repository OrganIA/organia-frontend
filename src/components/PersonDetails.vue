<template>
  <div>
    <h2>Nom</h2>
    <h4>{{ personLocal.person.last_name }}</h4>
    <h2>Prénom</h2>
    <h4>{{ personLocal.person.first_name }}</h4>
    <h2>Date de naissance</h2>
    <h4>{{ personLocal.person.birthday }}</h4>
    <h2>Groupe Sanguin</h2>
    <h4>{{ personLocal.person.blood_type }}</h4>
    <h2>Genre</h2>
    <h4>{{ personLocal.person.gender }}</h4>
    <div v-if="personLocal.donor">
      <h3>Demande un {{ personLocal.organ }}</h3>
    </div>
    <div v-else>
      <h3>Donne un {{ personLocal.organ }}</h3>
    </div>
    <h2>Admis le:</h2>
    <h4>{{ personLocal.start_date }}</h4>
    <h2>Description:</h2>
    <h4>{{ personLocal.person.description }}</h4>
    <div v-if="personLocal.notes">
      <h2>Notes:</h2>
      <h4>{{ personLocal.notes }}</h4>
    </div>
  </div>
</template>

<script>
// import http from "../http";

export default {
  name: "PersonDetails",
  props: ["person"],
  data() {
    return {
      personLocal: undefined,
    };
  },
  methods: {},
  created() {
    // console.log(this.$router)
    this.personLocal = JSON.parse(this.person);
    console.log(this.personLocal);
  },
};
</script>

<style scoped>
h2, h3, h4 {
  border: 10px, black;
}
</style>