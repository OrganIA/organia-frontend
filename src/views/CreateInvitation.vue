<template>
  <div class="is-fullwidth">
    <form class="form-control invitation-form" @submit.prevent="submitForm">
      <div class="form-fields">
        <label class="label">Mail</label>
        <input type="text" class="input mb-6" required/>
        <div class="form-input">
          <textarea class="textarea" placeholder="e.g. Hello world"></textarea>

        </div>
      </div>
      <button type="submit" class="button is-info">Enregistrer</button>
      <router-link class="button is-danger ml-6" to="/invitations">Retour</router-link>
    </form>
  </div>
</template>

<script>
export default {
  name: "CreateInvitation",
  data() {
    return {
      data: {},
    };
  },
  methods: {
    submitForm() {
      //TODO Create a new invitation
    },
  },
}
</script>

<style scoped>

</style>