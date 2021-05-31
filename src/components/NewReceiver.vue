<template>
  <div>
    <form @submit.prevent="createPerson()">
      <input v-model="first_name" placeholder="first_name" type="text" />
      <input v-model="last_name" placeholder="last_name" type="text" />
      <input v-model="birthday" placeholder="birthday" type="date" />
      <input v-model="description" placeholder="description" type="text" />
      <input
        v-model="supervisor_id"
        placeholder="supervisor_id"
        type="number"
      />
      <button type="submit">S'inscrire</button>
    </form>
  </div>
</template>

<script>
import http from "../http";

export default {
  name: "NewReceiver",
  data() {
    return {
      first_name: "",
      last_name: "",
      birthday: "",
      description: "",
      supervisor_id: 0,
    };
  },
  created() {},
  methods: {
    createPerson() {
      http
        .post(
          "/persons",
          {
            first_name: this.first_name,
            last_name: this.last_name,
            birthday: this.birthday,
            description: this.description,
            supervisor_id: this.supervisor_id,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$cookies.get("token")}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
</style>