<template>
  <div class="content align-left ml-6 pl-1 " v-bind:class="{ 'is-active': isActive === 'plateforme' }">
    <div class="tutorial-text-content has-text-justified ">
      <h1 class="title is-1">La plateforme</h1>
      <br><br>
      <div class="is-size-5 has-text-justified"> OrganIA est une plateforme de mise en relation automatique entre
        donneur et receveur
        d'organe, elle est une
        tentative de modernisation de la plateforme déjà existante CRISTAL.
        <br>
        <br>
        Ainsi elle conserve plusieurs fonctionnalités déjà existantes dans CRISTAL toute en ayant un aspect visuel
        se
        voulant clair et facilement utilisable par les professionnels de santé.
        <br>
        <br>
        Toutefois elle se trouve encore en phase de bêta-testing et nous manquons sûrement de certains éléments qui
        <strong> vous semblent importants.</strong>
        <br>
        <br>
        Ainsi, si vous avez quelconque recommandation / demande n'hésitez pas à nous envoyer un mail à
        organia_2023@labeip.epitech.eu

      </div>

    </div>

  </div>

</template>

<script>
export default {
  name: "plateforme"
}
</script>

<style scoped>
</style>