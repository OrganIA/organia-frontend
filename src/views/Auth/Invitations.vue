<template>
  <div>
    <div class="invit-block-padding">
      <h2 class="title is-3 pt-6">Gestion des invitations</h2>
    </div>
    <div class="is-fullwidth is-flex">
      <button class="button is-primary align-left is-large" @click="openModal()">
        Nouvelle invitation
      </button>
    </div>
    <div class="modal " :class="{ 'is-invisible': (state !== 'clicked'), 'is-': (state === 'clicked') }">
      <div class="modal-background"></div>
      <div class="modal-card invit-modale">
        <header class="modal-card-head">
          <p class="modal-card-title is-3">Créer une invitation</p>
          <button class="delete" aria-label="close" @click="openModal()"></button>
        </header>
        <section class="modal-card-body">
          <div class="form-fields">
            <label class="label">Mail de la personne</label>
            <input type="text" class="input mb-6" placeholder="jean.dupond@mail.com" required />
            <div class="form-input">
              <textarea class="textarea"
                placeholder="exemple: Bonjour, voici le lien d'invitation pour la plateforme..."></textarea>

            </div>
          </div>
          <button type="submit" class="button is-info">Enregistrer</button>
          <router-link class="button is-danger ml-6" to="/invitations">Retour</router-link>

        </section>
        <footer class="modal-card-foot">
          <button class="button is-success">Save changes</button>
          <button class="button">Cancel</button>
        </footer>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "invitations",
  data() {

    return {
      state: "",
    };
  },
  methods: {
    submitForm() {
      //TODO Create a new invitation
    },
    openModal() {
      if (this.state === "clicked") {
        this.state = ""
      } else {
        this.state = "clicked"
      }
    }
  },
}
</script>

<style scoped>

.invit-block-padding {
    height: 200px;
}

.invit-modale {
    width: 50%;
}

</style>