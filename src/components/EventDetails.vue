<template>
  <div class="cypress-modal modal">
    <h2>Date</h2>
    <h4>{{ calendar.date }}</h4>
    <h2>Description</h2>
    <h4>{{ calendar.description }}</h4>
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