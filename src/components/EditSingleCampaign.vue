<template>
  <form class="w-100">
    <form
      class="row card card-rounded mb-5 d-flex align-items-stretch"
      enctype="multipart/form-data"
    >
      <div class="card-body">
        <h4>Médias</h4>
        <div class="d-flex">
          <div class="col-4 offset-4">
            <div class="form-group h-100 d-flex flex-column">
              <div
                class="mb-1 flex-grow-1 d-flex align-items-center justify-content-center"
              >
                <img
                  :src="campaign.logo"
                  width="150"
                  class="mb-3"
                  :alt="campaign.name"
                />
              </div>
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
              <div class="mt-3 text-center">
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
      </div>
    </form>
    <form
      class="row card card-rounded mb-5 d-flex align-items-stretch"
      enctype="multipart/form-data"
    >
      <div class="card-body">
        <h4>Actions</h4>
        <div class="d-flex">
          <div class="col d-flex flex-column align-items-center card py-3">
            <h3>1€</h3>
            <img
              :src="campaign.photo1"
              width="100"
              height="100"
              style="object-fit: contain;"
              class="rounded my-3 mx-auto d-block"
            />
            <textarea
              style="font-size: 12px;"
              id="text1"
              name="text1"
              class="mb-2"
              rows="4"
              ref="action-photo1"
              v-model="campaign.text1"
            ></textarea>
            <div class="upload-btn-wrapper">
              <button class="btn btn-outline-warning btn-sm" ref="text-photo1">
                Modifier la photo
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
            <img
              :src="campaign.photo5"
              width="100"
              height="100"
              style="object-fit: contain;"
              class="rounded my-3 mx-auto d-block"
            />
            <textarea
              style="font-size: 12px;"
              id="text5"
              name="text5"
              class="mb-2"
              rows="4"
              ref="action-photo5"
              v-model="campaign.text5"
            ></textarea>
            <div class="upload-btn-wrapper">
              <button class="btn btn-outline-warning btn-sm" ref="text-photo5">
                Modifier la photo
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
            <img
              :src="campaign.photo10"
              width="100"
              height="100"
              style="object-fit: contain;"
              class="rounded my-3 mx-auto d-block"
            />
            <textarea
              style="font-size: 12px;"
              id="text10"
              name="text10"
              class="mb-2"
              ref="action-photo10"
              rows="4"
              v-model="campaign.text10"
            ></textarea>
            <div class="upload-btn-wrapper">
              <button class="btn btn-outline-warning btn-sm" ref="text-photo10">
                Modifier la photo
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
            <img
              :src="campaign.photo20"
              width="100"
              height="100"
              style="object-fit: contain;"
              class="rounded my-3 mx-auto d-block"
            />
            <textarea
              style="font-size: 12px;"
              id="text20"
              name="text20"
              ref="action-photo20"
              class="mb-2"
              rows="4"
              v-model="campaign.text20"
            ></textarea>
            <div class="upload-btn-wrapper">
              <button class="btn btn-outline-warning btn-sm" ref="text-photo20">
                Modifier la photo
              </button>
              <input
                type="file"
                id="photo20"
                name="photo20"
                ref="action-photo20"
                required="required"
                @change="handleFileChange"
              />
            </div>
          </div>
          <div class="col d-flex flex-column align-items-center card py-3">
            <h3>30€</h3>
            <img
              :src="campaign.photo30"
              width="100"
              height="100"
              style="object-fit: contain;"
              class="rounded my-3 mx-auto d-block"
            />
            <textarea
              style="font-size: 12px;"
              id="text30"
              name="text30"
              ref="action-photo30"
              class="mb-2"
              rows="4"
              v-model="campaign.text30"
            ></textarea>
            <div class="upload-btn-wrapper">
              <button class="btn btn-outline-warning btn-sm" ref="text-photo30">
                Modifier la photo
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
    </form>
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
    <div class="row">
      <div class="col">
        <div class="form-group w-100">
          <label for="name">Lien vers la vidéo</label>
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
    <div class="row my-3">
      <div class="col text-center">
        <router-link to="/campaigns" class="btn btn-link">Retour</router-link>
        <button @click.prevent="edit" class="btn btn-primary">
          Enregistrer les modifications
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "EditCampaignForm",
  props: ["campaign"],
  data: function() {
    return {};
  },
  methods: {
    handleFileChange(e) {
      this.$refs["text-" + e.target.id].innerText = "Enregistrement...";
      this.$refs["text-" + e.target.id].classList.remove("btn-outline-warning");
      this.$refs["text-" + e.target.id].classList.add("btn-success");

      let form = new FormData();
      form.append(e.target.id, this.$refs[e.target.id].files[0]);
      form.append(
        this.$refs["action-" + e.target.id].id,
        this.$refs["action-" + e.target.id].value
      );
      this.$http
        .patch("campaign/" + this.campaign.id + "/", form, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(resp => {
          this.campaign = resp.data;
          this.$refs["text-" + e.target.id].classList.remove("btn-success");
          this.$refs["text-" + e.target.id].classList.add(
            "btn-outline-warning"
          );
          this.$refs["text-" + e.target.id].innerText = "Modifier la photo";
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    editLogo: function() {
      let form = new FormData();
      form.append("logo", this.$refs.logo.files[0]);
      this.$http
        .patch("campaign/" + this.campaign.id + "/", form, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(resp => {
          this.campaign = resp.data;
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    edit: function() {
      if (this.campaign) {
        let form = new FormData();
        form.append("author", this.$store.state.user_id);
        form.append("name", this.campaign.name);
        form.append("goal_amount", this.campaign.goal_amount);
        form.append("link", this.campaign.link);
        form.append("description", this.campaign.description);
        form.append("video", this.campaign.video);
        form.append("html_template", this.campaign.html_template);
        this.$http
          .patch("campaign/" + this.campaign.id + "/", form)
          .then(resp => {
            this.campaign = resp.data;
          })
          .catch(err => {
            console.log(err.response);
          });
      }
    }
  }
};
</script>
