<template>
  <p>Action Log</p>
  <div v-for="action in actions" :key="action">
    <p>
      {{ action.type }} object {{ action.item_type }} of id
      {{ action.item_id }} by user {{ action.author_id }}. {{ action.message }}
    </p>
  </div>
</template>

<script>
export default {
  created() {
    setInterval(this.getActions, 5000);
  },
  data() {
    return {
      actions: [],
    };
  },
  methods: {
    getActions() {
      this.actions = require("./actions.json");
    },
  },
};
</script>

<style>
</style>