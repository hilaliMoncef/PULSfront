<template>
  <div class="dashboard-ecommerce">
    <div class="container-fluid dashboard-content ">
      <!-- BREADCRUMB -->
      <div class="row">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div class="page-header">
            <div class="d-flex justify-content-between">
              <h2 class="pageheader-title">Campagnes</h2>
            </div>
            <div class="page-breadcrumb">
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb d-flex align-items-center">
                  <li class="breadcrumb-item">
                    <router-link to="/home" class="breadcrumb-link"
                      >Dashboard</router-link
                    >
                  </li>
                  <font-awesome-icon
                    icon="angle-right"
                    size="xs"
                    class="mx-1"
                  />
                  <li class="breadcrumb-item">
                    <router-link to="/campaigns" class="breadcrumb-link"
                      >Campagnes</router-link
                    >
                  </li>
                  <font-awesome-icon
                    icon="angle-right"
                    size="xs"
                    class="mx-1"
                  />
                  <li class="breadcrumb-item">
                    <router-link
                      :to="'/campaign/' + campaign.id"
                      class="breadcrumb-link"
                      >{{ campaign.name }}</router-link
                    >
                  </li>
                  <font-awesome-icon
                    icon="angle-right"
                    size="xs"
                    class="mx-1"
                  />
                  <li class="breadcrumb-item active" aria-current="page">
                    Modifier
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <Alert
        :type="errors.type"
        :message="errors.message"
        v-if="errors.visible"
        @dismiss="errors.visible = false"
      />

      <div class="row">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div class="card">
            <div
              class="card-header d-flex align-items-center justify-content-between"
            >
              <h5 class="mb-0">Modifier une campagne</h5>
            </div>
            <div class="card-body">
              <h4 class="mb-0">Informations générales</h4>
              <p>Les informations générales de la nouvelle campagne.</p>
              <form>
                <div class="row">
                  <div class="form-group col-9">
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
                  <div class="form-group col-3">
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
                <div class="row">
                  <div class="form-group col">
                    <label for="name">Lien vers l'association</label>
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1"
                          ><font-awesome-icon icon="link"
                        /></span>
                      </div>
                      <input
                        type="text"
                        class="form-control"
                        v-model="campaign.link"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="form-group col">
                    <label for="description">Description</label>
                    <textarea
                      class="form-control"
                      v-model="campaign.description"
                      aria-describedby="descHelp"
                    ></textarea>
                    <small id="descHelp" class="form-text text-muted"
                      >Une courte description de la mission de
                      l'association.</small
                    >
                  </div>
                </div>
                <div class="row">
                  <div class="form-group col">
                    <label for="name">ID de la vidéo Youtube</label>
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1"
                          ><font-awesome-icon icon="video"
                        /></span>
                      </div>
                      <input
                        type="text"
                        class="form-control"
                        v-model="campaign.video"
                      />
                    </div>
                  </div>
                </div>
              </form>
              <div class="card-body text-center">
                <button class="btn btn-success" @click.prevent="addCampaign">
                  Enregistrer la campagne
                </button>
              </div>
            </div>
            <div class="card-body border-top">
              <h4 class="mb-0">Médias</h4>
              <p>
                Il est important de compresser les images au maximum avant de
                les uploader.
              </p>
              <form>
                <div class="row">
                  <div class="form-group col">
                    <label for="logo">Logo</label>
                    <div>
                      <img
                        :src="campaign.logo"
                        width="200"
                        height="200"
                        style="object-fit: contain;"
                        class="rounded border mx-auto my-3 d-block"
                      />
                      <div class="upload-btn-wrapper w-100 text-center ">
                        <button
                          type="button"
                          class="btn btn-outline-danger btn-sm"
                          ref="text-logo"
                        >
                          Ajouter une photo
                        </button>
                        <input
                          type="file"
                          id="logo"
                          name="logo"
                          ref="logo"
                          required="required"
                          @change="editLogo"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="form-group col">
                    <label for="actions">Montants de donations</label>
                    <div class="d-flex justify-content-between">
                      <div
                        class="col d-flex flex-column align-items-center card py-3 mr-2"
                      >
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
                          class="mb-2 w-100"
                          rows="4"
                          ref="text1"
                          v-model="campaign.text1"
                        ></textarea>
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
                      <div
                        class="col d-flex flex-column align-items-center card py-3 mr-2"
                      >
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
                          class="mb-2 w-100"
                          rows="4"
                          ref="action-photo5"
                          v-model="campaign.text5"
                        ></textarea>
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
                      <div
                        class="col d-flex flex-column align-items-center card py-3 mr-2"
                      >
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
                          class="mb-2 w-100"
                          ref="action-photo10"
                          rows="4"
                          v-model="campaign.text10"
                        ></textarea>
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
                      <div
                        class="col d-flex flex-column align-items-center card py-3 mr-2"
                      >
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
                          class="mb-2 w-100"
                          rows="4"
                          v-model="campaign.text20"
                        ></textarea>
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
                      <div
                        class="col d-flex flex-column align-items-center card py-3 mr-2"
                      >
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
                          class="mb-2 w-100"
                          rows="4"
                          v-model="campaign.text30"
                        ></textarea>
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditCampaign",
  data: function() {
    return {
      campaign: {},
      errors: {
        visible: false,
        type: "danger",
        message: ""
      }
    };
  },
  mounted: function() {
    this.getCampaign();
  },
  methods: {
    getCampaign: function() {
      this.$http
        .get("campaign/" + this.$route.params.id + "/")
        .then(resp => {
          this.campaign = resp.data;
        })
        .catch(err => {
          console.log(err.response);
        });
    },
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
    editLogo: function(e) {
      this.$refs["text-" + e.target.id].innerText = "Enregistrement...";
      this.$refs["text-" + e.target.id].classList.remove("btn-outline-danger");
      this.$refs["text-" + e.target.id].classList.add("btn-success");
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
          this.$refs["text-" + e.target.id].innerText = "Enregistré";
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
