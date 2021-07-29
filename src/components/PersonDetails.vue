<template>
  <div></div>
</template>

<script>
// import http from "../http";

export default {
  name: "PersonDetails",
  props: ["person"],
  data() {
    return {
      personLocal: undefined,
    };
  },
  methods: {},
  created() {
    // console.log(this.$router)
    this.personLocal = JSON.parse(this.person);
    // console.log(this.personLocal);
  },
};
</script>