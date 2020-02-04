<template>
  <div class="about">
    <div class="col-6 offset-3">
      <div class="row">
        <h1 class="display-4 text-center">Gestion des jeux</h1>
        <p class="lead">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </div>
    <div class="col-8 offset-2 mt-4">
      <div class="row mb-3 d-flex justify-content-end">
        <router-link
          to="/game/add"
          class="btn btn-primary d-flex align-items-center"
        >
          <font-awesome-icon icon="plus" class="mr-2" />
          <span>Nouveau jeu</span>
        </router-link>
      </div>
      <div class="row d-flex">
        <div class="col-4" v-for="game in games" :key="game.id">
          <div class="card h-100 d-flex flex-column justify-content-between">
            <div>
              <img
                class="card-img-top p-3"
                style="object-fit: contain; height:100px;"
                :src="game.logo"
                :alt="game.name"
              />
              <div class="card-body">
                <h5 class="card-title">{{ game.name }}</h5>
                <p class="card-text">
                  {{ stripCharacters(game.description) }}
                </p>
              </div>
            </div>
            <div class="card-footer d-flex justify-content-between">
              <a href="" class="text-primary" @click.prevent="editGame(game.id)"
                >Modifier</a
              >
              <a
                href=""
                class="text-danger"
                @click.prevent="deleteGame(game.id)"
                >Supprimer</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Games",
  data: function() {
    return {
      games: {}
    };
  },
  mounted: function() {
    this.getGames();
  },
  methods: {
    stripCharacters: function(text) {
      if (text.length > 70) {
        return text.substring(0, 70) + "..";
      } else {
        return text;
      }
    },
    getGames: function() {
      this.$http.get("game/").then(resp => {
        this.games = resp.data;
      });
    },
    editGame: function(id) {
      this.$router.push("/game/" + id + "/edit");
    }
  }
};
</script>
