<template>
  <div class="cypress-modal modal">
    <h2>Libellé</h2>
    <h4>{{ event.title }}</h4>
    <h2>Lieu</h2>
    <h4>{{ event.location }}</h4>
    <h2>Date de debut</h2>
    <h4>{{ event.startDate }}</h4>
    <h2>Date de fin</h2>
    <h4>{{ event.endDate }}</h4>
    <h2>Description</h2>
    <h4>{{ event.description }}</h4>
    <button type="button" class="button is-danger" @click="closeModal">
      Fermer
    </button>
  </div>
</template>

<script>
export default {
  name: "eventDetails",
  emits: ["closeModal"],
  props: ["event"],
  data() {
    return {};
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
  },
  created() {},
};
</script>