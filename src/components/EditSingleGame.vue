<template>
  <form class="w-100">
    <div class="row">
      <div class="col-12">
        <div class="row">
          <div class="card w-100 card-rounded mb-3">
            <div class="card-body">
              <div class="form-group d-flex flex-column align-items-center">
                <img :src="game.logo" :alt="game.name" height="100" />
                <input
                  type="file"
                  class="form-control-file mt-5 my-3 text-center w-auto"
                  ref="logo"
                  aria-describedby="fileHelpId"
                />
                <button
                  type="button"
                  @click.prevent="editLogo"
                  class="btn btn-primary"
                >
                  Enregistrer
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="form-group w-100">
            <label for="name">Nom du jeu</label>
            <input
              type="text"
              class="form-control"
              aria-describedby="nameHelp"
              v-model="game.name"
            />
            <small id="nameHelp" class="form-text text-muted"
              >Le nom affiché du jeu.</small
            >
          </div>
        </div>
        <div class="row">
          <div class="form-group w-100">
            <label for="name">Path du jeu</label>
            <input
              type="text"
              class="form-control"
              aria-describedby="nameHelp"
              v-model="game.path"
            />
            <small id="nameHelp" class="form-text text-muted"
              >Le chemin du fichier de lancement du jeu (en
              construction).</small
            >
          </div>
        </div>
        <div class="row">
          <div class="form-group w-100">
            <label for="name">Description</label>
            <textarea
              class="form-control"
              aria-describedby="nameHelp"
              v-model="game.description"
            ></textarea>
            <small id="nameHelp" class="form-text text-muted"
              >Une courte description du jeu.</small
            >
          </div>
        </div>
      </div>
    </div>
    <div class="row my-3">
      <div class="col text-center">
        <router-link to="/games" class="btn btn-link">Retour</router-link>
        <button @click.prevent="edit" class="btn btn-primary">
          Enregistrer les modifications
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "EditGameForm",
  props: ["id"],
  data: function() {
    return {
      game: {}
    };
  },
  mounted: function() {
    this.$http.get("game/" + this.id + "/").then(resp => {
      this.game = resp.data;
    });
  },
  methods: {
    editLogo: function() {
      if (this.game) {
        let form = new FormData();
        form.append("logo", this.$refs.logo.files[0]);
        this.$http
          .patch("game/" + this.id + "/", form, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          })
          .then(resp => {
            this.game = resp.data;
            this.$router.push("/games");
          });
      }
    },
    edit: function() {
      if (this.game) {
        let form = new FormData();
        form.append("name", this.game.name);
        form.append("path", this.game.path);
        form.append("description", this.game.description);
        this.$http.patch("game/" + this.id + "/", form).then(resp => {
          this.game = resp.data;
          this.$router.push("/games");
        });
      }
    }
  }
};
</script>
