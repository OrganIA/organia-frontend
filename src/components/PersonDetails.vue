<template>
  <div class="cypress-modal modal">
    <h2>Nom</h2>
    <h4>{{ person.person.last_name }}</h4>
    <h2>Prénom</h2>
    <h4>{{ person.person.first_name }}</h4>
    <h2>Date de naissance</h2>
    <h4>{{ person.person.birthday }}</h4>
    <h2>Groupe Sanguin</h2>
    <h4>{{ person.person.blood_type }}</h4>
    <h2>Genre</h2>
    <h4>{{ person.person.gender }}</h4>
    <div v-if="!person.donor">
      <h3>Demande un {{ person.organ }}</h3>
    </div>
    <div v-else>
      <h3>Donne un {{ person.organ }}</h3>
    </div>
    <h2>Admis le:</h2>
    <h4>{{ person.start_date }}</h4>
    <h2>Description:</h2>
    <h4>{{ person.person.description }}</h4>
    <div v-if="person.notes">
      <h2>Notes:</h2>
      <h4>{{ person.notes }}</h4>
    </div>
    <button type="button" class="button is-danger" @click="closeModal">
      Fermer
    </button>
  </div>
</template>

<script>
export default {
  name: "person-details",
  emits: ["closeModal"],
  props: ["person"],
  data() {
    return {};
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
  },
  created() { },
};
</script>