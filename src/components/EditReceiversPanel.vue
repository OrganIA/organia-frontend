<template>
  <div>
    <router-link to="/receivers">Back</router-link>
    <form class="form-fields" @submit.prevent="submitForm()">
      <input class="form-input" type="text" v-model="user.name" />
      <input class="form-input" type="email" v-model="user.email" />
      <input class="form-input" type="password" v-model="user.password" />
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
      user: {},
    };
  },
  methods: {
    getUserByID() {
      http
        .get(`/users/${this.id}`)
        .then((response) => {
          this.user = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    submitForm() {
      http.post(`/users/${this.id}`, {
        headers: {
          Autorization: `Bearer ${this.$cookies.get("token")}`,
        },
        params: {
          name: this.user.name,
          email: this.user.email,
          password: this.user.password,
        },
      });
    },
  },
  created() {
    this.getUserByID();
  },
};
</script>

<style>
a,
button {
  cursor: pointer;
}

a,
a:visited,
a:active {
  color: var(--blue);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

button:hover,
.button:hover {
  text-decoration: none;
}

input[type="number"] {
  min-width: 4em;
}

button.active,
.button.active,
[type="submit"] {
  background-color: var(--blue);
  color: white;
}

.form-fields {
  display: flex;
  flex-flow: wrap row;
  justify-content: space-between;
}

.form-input {
  display: flex;
  flex-direction: column;
  margin: 1em 0;
  width: 100%;
}

.form-input.small {
  width: calc(50% - 1em);
}

.form-input.mini {
  width: calc(33% - 1em);
}

.form-error {
  font-size: small;
  color: var(--red);
}

.row {
  display: flex;
  flex-direction: row;
}

.column {
  display: flex;
  flex-direction: column;
}

.hide {
  display: none;
}
</style>