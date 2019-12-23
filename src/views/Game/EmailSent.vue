<template>
  <div class="col-6 offset-3">
    <div class="row">
      <h1 class="display-4 text-center">Email envoyé</h1>
      <p class="lead">
        Les informations concernant la déduction fiscale ont été envoyés à votre
        adresse email.
      </p>
    </div>
    <div class="row">
      <router-link to="/start" class="btn btn-primary btn-lg"
        >Revenir au début</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "EmailSent",
  mounted: function() {
    this.$store.commit("endSession");
    this.$store.dispatch("updateSession");
    this.$store.commit("deleteGamingStates");
  }
};
</script>
