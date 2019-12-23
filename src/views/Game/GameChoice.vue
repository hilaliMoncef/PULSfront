<template>
  <div>
    <div class="home">
      <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
        <ul>
          <div
            class="form-group w-100 mt-5 d-flex justify-content-between align-items-center"
          >
            <label
              v-for="(game, index) in games"
              :for="game.id"
              :class="[
                choosenGame.id == game.id ? 'checked' : '',
                'checkbox',
                'col-4',
                'py-5',
                'mx-2'
              ]"
              :key="game.id"
              @click="chooseGame(index)"
            >
              <input
                type="radio"
                :value="game.id"
                :id="game.id"
                v-model="choosenGame.id"
              />
              <span
                :class="[
                  'selected',
                  'd-flex',
                  'align-items-center',
                  'justify-content-center'
                ]"
              >
                <font-awesome-icon icon="check" />
              </span>
              <span class="checkbox-icon">
                <img :src="game.logo" width="120" :alt="game.name" />
              </span>
              <h4 class="mt-2">{{ game.name }}</h4>
              <p class="small text-left">{{ game.description }}</p>
            </label>
          </div>
        </ul>
        <p class="lead">Cliquer sur le bouton pour commencer.</p>
      </div>
      <div class="row">
        <div class="col text-center">
          <a href="" @click.prevent="gotoPayment" class="btn btn-primary"
            >Commencer</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GameChoice",
  data: function() {
    return {
      choosenGame: "",
      games: {}
    };
  },
  mounted: function() {
    this.$http.get("terminal/mine/").then(resp => {
      this.games = resp.data.games;
    });
  },
  methods: {
    chooseGame: function(index) {
      this.choosenGame = this.games[index];
    },
    gotoPayment: function() {
      this.$store.commit("saveGameChoice", this.choosenGame);
      this.$store.dispatch("updateSession");
      this.$router.push("/payment");
    }
  }
};
</script>
