<template>
  <div class="col-6 offset-3">
    <div class="row">
      <h1 class="display-4 text-center">Le jeu a débuté</h1>
      <p class="lead">
        Veuillez patienter, votre partie va se lancer
      </p>
    </div>
    <div class="row">
      <button @click.prevent="endGame" class="btn btn-primary mx-auto">
        Appuyer sur <span class="g-btn">A</span> pour continuer
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
  computed: {
    a() {
      return this.$store.state.gamepad.A;
    }
  },
  watch: {
    a: function(val) {
      if (val) {
        this.endGame();
      }
    }
  },
  methods: {
    endGame: function() {
      this.$router.push("/endgame");
    }
  }
};
</script>
