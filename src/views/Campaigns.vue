<template>
  <div class="about">
    <div class="col-8 offset-2">
      <div class="row">
        <h1 class="display-4 text-center">Gestion des campagnes</h1>
        <p class="lead">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </div>
    <div class="col-10 offset-1 mt-4">
      <div class="row mb-3 d-flex justify-content-between">
        <span></span>
        <router-link to="/campaign/add" class="btn btn-primary">
          <font-awesome-icon icon="plus" class="mr-2" />Ajouter une
          campagne</router-link
        >
      </div>
      <div class="row d-flex">
        <div
          class="col-4 mb-4"
          v-for="campaign in campaigns"
          :key="campaign.id"
        >
          <!-- Modal for deleting -->
          <div
            class="modal fade"
            :id="'deleteModal-' + campaign.id"
            tabindex="-1"
            role="dialog"
            aria-hidden="true"
          >
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">
                    Etes-vous sûr de vouloir archiver
                    <strong>{{ campaign.name }}</strong> ?
                  </h5>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <p>
                    Cette campagne ne sera plus visible dans la liste des
                    campagnes.
                  </p>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Fermer
                  </button>
                  <button
                    type="button"
                    data-dismiss="modal"
                    @click.prevent="deleteCampaign(campaign.id)"
                    class="btn btn-danger"
                  >
                    Archiver
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!-- endmodal -->
          <div class="card h-100 d-flex flex-column justify-content-between">
            <div class="clickable" @click.prevent="showDetail(campaign.id)">
              <img
                class="card-img-top p-3"
                style="object-fit: contain; height:100px;"
                :src="campaign.logo"
                :alt="campaign.name"
              />
              <div class="card-body">
                <h5 class="card-title">{{ campaign.name }}</h5>
                <p class="card-subtitle text-muted small">
                  <strong>Objectif de collecte :</strong>
                  {{ campaign.collected }}/{{ campaign.goal_amount }}
                  €
                </p>
                <p class="card-text">
                  {{ stripCharacters(campaign.description) }}
                </p>
              </div>
            </div>
            <div class="card-footer d-flex justify-content-between">
              <a
                href=""
                class="text-primary"
                @click.prevent="editCampaign(campaign.id)"
                >Modifier</a
              >
              <a
                href=""
                class="text-danger"
                data-toggle="modal"
                :data-target="'#deleteModal-' + campaign.id"
                >Archiver</a
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
  name: "Campaigns",
  data: function() {
    return {
      campaigns: ""
    };
  },
  mounted: function() {
    this.getCampaigns();
  },
  methods: {
    stripCharacters: function(text) {
      if (text.length > 70) {
        return text.substring(0, 70) + "..";
      } else {
        return text;
      }
    },
    showDetail: function(id) {
      this.$router.push({
        name: "campaign",
        params: { id: id }
      });
    },
    editCampaign: function(id) {
      this.$router.push({
        name: "edit-campaign",
        params: { id: id }
      });
    },
    deleteCampaign: function(id) {
      this.$http.delete("/campaign/" + id + "/").then(() => {
        this.getCampaigns();
      });
    },
    getCampaigns: function() {
      this.$http
        .get("campaign/")
        .then(resp => {
          this.campaigns = resp.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
