<template>
  <form class="w-100">
    <div class="row">
      <div class="col-12">
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
        <div class="row">
          <div class="form-group w-100">
            <label for="logo">Logo</label>
            <input
              type="file"
              class="form-control-file"
              ref="logo"
              aria-describedby="fileHelpId"
            />
            <small id="fileHelpId" class="form-text text-muted"
              >Un logo en PNG pour le jeu.</small
            >
          </div>
        </div>
      </div>
    </div>
    <div class="row my-3">
      <div class="col text-center">
        <router-link to="/games" class="btn btn-link">Retour</router-link>
        <button @click.prevent="add" class="btn btn-primary">
          Enregistrer les modifications
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "AddGameForm",
  data: function() {
    return {
      game: {}
    };
  },
  methods: {
    add: function() {
      if (this.game) {
        let form = new FormData();
        form.append("name", this.game.name);
        form.append("path", this.game.path);
        form.append("description", this.game.description);
        form.append("logo", this.$refs.logo.files[0]);
        this.$http
          .post("game/", form, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          })
          .then(resp => {
            this.game = resp.data;
            this.$router.push("/games");
          });
      }
    }
  }
};
</script>
