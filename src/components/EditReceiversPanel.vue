<template>
  <div>
    <router-link to="/receivers">Back</router-link>
    <form class="form-fields" @submit.prevent="submitForm()">
      <input
        v-model="receiver.first_name"
        placeholder="first_name"
        type="text"
      />
      <input v-model="receiver.last_name" placeholder="last_name" type="text" />
      <input v-model="receiver.birthday" placeholder="birthday" type="date" />
      <input
        v-model="receiver.description"
        placeholder="description"
        type="text"
      />
      <input
        v-model="receiver.supervisor_id"
        placeholder="supervisor_id"
        type="number"
      />
      <button type="submit">Save Changes</button>
    </form>
  </div>
</template>

<script>
import http from "../http";

export default {
  name: "EditReceiversPanel",
  props: {
    id: String,
  },
  data() {
    return {
      receiver: {},
    };
  },
  methods: {
    getReceiverByID() {
      http
        .get(`/persons/${this.id}`)
        .then((response) => {
          this.receiver = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    submitForm() {
      http
        .post(
          `/persons/${this.id}`,
          {
            first_name: this.receiver.first_name,
            last_name: this.receiver.last_name,
            birthday: this.receiver.birthday,
            description: this.receiver.description,
          })
        .then(() => {
          this.$router.push("/receivers");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.getReceiverByID();
  },
};
</script>