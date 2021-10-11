<template>
  <p>Action Log</p>
  <div id="actions-container">
    <p v-for="action in actions" :key="action" class="action">
      {{ action.type }} object {{ action.item_type }} of id
      {{ action.item_id }} by user {{ action.author_id }}. {{ action.message }}
    </p>
  </div>
</template>

<script>
export default {
  created() {
    this.getActions();
    setInterval(this.getActions, 5000);
  },
  data() {
    return {
      actions: [],
    };
  },
  methods: {
    getActions() {
      this.$http
        .get("/logs")
        .then((resp) => {
          this.actions = resp.data;
        })
        .catch((error) => {
          console.log(error);
          this.$toast.error("Erreur : " + error.response.data.detail);
          setTimeout(this.$toast.clear, 3000);
        });
    },
  },
};
</script>

<style>
#actions-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px;
  width: 100%;
  height: 500px;
  background-color: rgb(233 233 233);
  border-radius: 7px;
  border-width: 5px;
  border-color: black;
  border-style: solid;
  overflow-y: scroll;
}
</style>