<template>
<form @submit.prevent="createPerson()" class="show-requireds">
<h2 class="form-title">Ajouter un donneur</h2>
<div class="form-fields">
<div class="form-input small required">
<label for="first_name">Prénom</label>
<input v-model="first_name" data-classes="['small']" id="first_name" name="first_name" required="" type="text">
</div>
<div class="form-input small required">
<label for="last_name">Nom de famille</label>
<input v-model="last_name" data-classes="['small']" id="last_name" name="last_name" required="" type="text">
</div>
<div class="form-input required">
<label for="birthday">Date de naissance</label>
<input v-model="birthday" id="birthday" name="birthday" required="" type="date">
</div>

<div class="form-input required">
    <label for="description">Description</label>
    <input v-model="description" id="description" name="description" required="" type="text">
</div>

<input id="csrf_token" name="csrf_token" type="hidden" value="IjVjN2Y0Zjk5MGJiZjhkYWZlYTU4ZTMzNTY1OWRkOGJkYjVkZGZmZDQi.YLvcvA.CXg_Fl_YlTv7k3qFySeA2xlZhWw">
</div>
<p class="required-notice">* Obligatoire</p>
<div class="form-submit">
<button type="submit">Ajouter</button>
</div>
</form>
</template>

<script>
import http from "../http";

export default {
  name: "NewDonor",
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
          this.$router.push("/donors");
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