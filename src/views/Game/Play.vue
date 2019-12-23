<template>
  <div class="col-6 offset-3">
    <div class="row">
      <h1 class="display-4 text-center">Le jeu a débuté</h1>
      <p class="lead">
        Veuillez patienter, votre partie va se lancer
      </p>
    </div>
    <div class="row">
      <button
        @click.prevent="endGame"
        class="btn btn-primary text-center btn-lg"
      >
        Fin du jeu
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Play",
  mounted: function() {
    this.$http.get("terminal/mine/play/");
    this.$store.commit("startGameSession");
  },
  methods: {
    endGame: function() {
      this.$router.push("/endgame");
    }
  }
};
</script>
