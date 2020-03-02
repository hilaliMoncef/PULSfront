<template>
  <form class="w-100">
    <div class="row">
      <div class="col-9">
        <div class="form-group w-100">
          <label for="name">Nom de la campagne</label>
          <input
            type="text"
            class="form-control"
            aria-describedby="nameHelp"
            v-model="campaign.name"
          />
          <small id="nameHelp" class="form-text text-muted"
            >Donnez un nom cohérent à la campagne.</small
          >
        </div>
      </div>
      <div class="col-3">
        <div class="form-group w-100">
          <label for="name">Objectif de collecte</label>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1"
                ><font-awesome-icon icon="euro-sign"
              /></span>
            </div>
            <input
              type="number"
              class="form-control"
              v-model="campaign.goal_amount"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="form-group w-100">
          <label for="name">Lien vers l'association</label>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1"
                ><font-awesome-icon icon="link"
              /></span>
            </div>
            <input type="text" class="form-control" v-model="campaign.link" />
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="form-group w-100">
          <label for="description">Description</label>
          <textarea
            class="form-control"
            v-model="campaign.description"
            aria-describedby="descHelp"
          ></textarea>
          <small id="descHelp" class="form-text text-muted"
            >Une courte description de la mission de l'association.</small
          >
        </div>
      </div>
    </div>
    <form class="row" enctype="multipart/form-data">
      <div class="col">
        <div class="form-group">
          <label for="logo">Logo</label>
          <input
            type="file"
            class="form-control-file"
            aria-describedby="fileHelpId"
            name="logo"
            ref="logo"
          />
          <small id="fileHelpId" class="form-text text-muted"
            >Logo en PNG décrivant bien la mission de l'association.</small
          >
        </div>
      </div>
    </form>
    <div class="row">
      <div class="col">
        <div class="form-group w-100">
          <label for="name">ID de la vidéo Youtube</label>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1"
                ><font-awesome-icon icon="video"
              /></span>
            </div>
            <input type="text" class="form-control" v-model="campaign.video" />
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="form-group w-100">
          <div class="form-group">
            <label for="html_template">Montants de donations</label>
            <div class="d-flex justify-content-between">
              <div class="col d-flex flex-column align-items-center card py-3">
                <h3>1€</h3>
                <div class="upload-btn-wrapper">
                  <button
                    class="btn btn-outline-danger btn-sm"
                    ref="text-photo1"
                  >
                    Ajouter une photo
                  </button>
                  <input
                    type="file"
                    id="photo1"
                    name="photo1"
                    ref="photo1"
                    required="required"
                    @change="handleFileChange"
                  />
                </div>
              </div>
              <div class="col d-flex flex-column align-items-center card py-3">
                <h3>5€</h3>
                <div class="upload-btn-wrapper">
                  <button
                    class="btn btn-outline-danger btn-sm"
                    ref="text-photo5"
                  >
                    Ajouter une photo
                  </button>
                  <input
                    type="file"
                    id="photo5"
                    name="photo5"
                    ref="photo5"
                    required="required"
                    @change="handleFileChange"
                  />
                </div>
              </div>
              <div class="col d-flex flex-column align-items-center card py-3">
                <h3>10€</h3>
                <div class="upload-btn-wrapper">
                  <button
                    class="btn btn-outline-danger btn-sm"
                    ref="text-photo10"
                  >
                    Ajouter une photo
                  </button>
                  <input
                    type="file"
                    id="photo10"
                    name="photo10"
                    ref="photo10"
                    required="required"
                    @change="handleFileChange"
                  />
                </div>
              </div>
              <div class="col d-flex flex-column align-items-center card py-3">
                <h3>20€</h3>
                <div class="upload-btn-wrapper">
                  <button
                    class="btn btn-outline-danger btn-sm"
                    ref="text-photo20"
                  >
                    Ajouter une photo
                  </button>
                  <input
                    type="file"
                    id="photo20"
                    name="photo20"
                    ref="photo20"
                    required="required"
                    @change="handleFileChange"
                  />
                </div>
              </div>
              <div class="col d-flex flex-column align-items-center card py-3">
                <h3>30€</h3>
                <div class="upload-btn-wrapper">
                  <button
                    class="btn btn-outline-danger btn-sm"
                    ref="text-photo30"
                  >
                    Ajouter une photo
                  </button>
                  <input
                    type="file"
                    id="photo30"
                    name="photo30"
                    ref="photo30"
                    required="required"
                    @change="handleFileChange"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row my-3">
      <div class="col text-center">
        <router-link to="/campaigns" class="btn btn-link">Retour</router-link>
        <button @click.prevent="add" class="btn btn-primary">
          Enregistrer les modifications
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "AddCampaignForm",
  data: function() {
    return {
      campaign: {}
    };
  },
  methods: {
    handleFileChange(e) {
      this.$refs["text-" + e.target.id].innerText = "1 fichier sélectionné";
      this.$refs["text-" + e.target.id].classList.remove("btn-outline-danger");
      this.$refs["text-" + e.target.id].classList.add("btn-success");
    },
    add: function() {
      if (this.campaign) {
        let form = new FormData();
        form.append("author", this.$store.state.user_id);
        form.append("name", this.campaign.name);
        form.append("goal_amount", this.campaign.goal_amount);
        form.append("link", this.campaign.link);
        form.append("description", this.campaign.description);
        form.append("video", this.campaign.video);
        form.append("logo", this.$refs.logo.files[0]);
        form.append("photo1", this.$refs.photo1.files[0]);
        form.append("photo5", this.$refs.photo5.files[0]);
        form.append("photo10", this.$refs.photo10.files[0]);
        form.append("photo20", this.$refs.photo20.files[0]);
        form.append("photo30", this.$refs.photo30.files[0]);
        this.$http
          .post("campaign/", form, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          })
          .then(resp => {
            this.campaign = resp.data;
            this.$router.push("/campaigns");
          })
          .catch(err => {
            console.log(err.response);
          });
      }
    }
  }
};
</script>

<style>
.upload-btn-wrapper {
  position: relative;
  overflow: hidden;
  display: inline-block;
}

.upload-btn-wrapper .btn {
  cursor: pointer;
}

.upload-btn-wrapper input[type="file"] {
  font-size: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  cursor: pointer;
}
</style>
