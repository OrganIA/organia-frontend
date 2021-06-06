<template>
  <div>
    <router-link to="/donors">Back</router-link>
    <form class="form-fields" @submit.prevent="submitForm()">
      <input
        v-model="donor.first_name"
        placeholder="first_name"
        type="text"
      />
      <input v-model="donor.last_name" placeholder="last_name" type="text" />
      <input v-model="donor.birthday" placeholder="birthday" type="date" />
      <input
        v-model="donor.description"
        placeholder="description"
        type="text"
      />
      <input
        v-model="donor.supervisor_id"
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
  name: "EditDonorsPanel",
  props: {
    id: String,
  },
  data() {
    return {
      donor: {},
    };
  },
  methods: {
    getdonorByID() {
      http
        .get(`/persons/${this.id}`, {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("token")}`,
          },
        })
        .then((response) => {
          this.donor = response.data;
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
            first_name: this.donor.first_name,
            last_name: this.donor.last_name,
            birthday: this.donor.birthday,
            description: this.donor.description,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$cookies.get("token")}`,
            },
          }
        )
        .then(() => {
          this.$router.push("/donors");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.getdonorByID();
  },
};
</script>