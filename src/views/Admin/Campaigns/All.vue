<template>
  <div class="dashboard-ecommerce">
    <div class="container-fluid dashboard-content ">
      <!-- BREADCRUMB -->
      <div class="row">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div class="page-header">
            <div class="d-flex justify-content-between">
              <h2 class="pageheader-title">Campagnes</h2>
              <router-link
                class="btn btn-primary mb-1"
                :to="{ name: 'addCampaign' }"
                ><font-awesome-icon icon="plus" class="mr-2" />Ajouter une
                campagne</router-link
              >
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
                  <li class="breadcrumb-item active" aria-current="page">
                    Toutes les campagnes
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

      <div class="ecommerce-widget">
        <div class="row">
          <div class="col-12">
            <div class="card">
              <h5 class="card-header">Campagnes</h5>
              <div class="card-body p-0">
                <div class="table-responsive">
                  <table class="table">
                    <thead class="bg-light">
                      <tr class="border-0">
                        <th class="border-0">#</th>
                        <th class="border-0">Logo</th>
                        <th class="border-0">Nom</th>
                        <th class="border-0">Description</th>
                        <th class="border-0">Dons collectés</th>
                        <th class="border-0">Terminaux associés</th>
                        <th class="border-0"></th>
                        <th class="border-0"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(campaign, index) in campaigns" :key="index">
                        <td>{{ campaign.id }}</td>
                        <td>
                          <span class="text-success"
                            ><img
                              :src="campaign.logo"
                              height="30"
                              :alt="campaign.name"
                          /></span>
                        </td>
                        <td>
                          {{ campaign.name }}
                        </td>
                        <td>{{ stripCharacters(campaign.description) }}</td>
                        <td>
                          {{ campaign.collected }}/{{ campaign.goal_amount }} €
                        </td>
                        <td>
                          {{ campaign.nb_terminals }} termina<span
                            v-if="campaign.nb_terminals > 1"
                            >ux</span
                          ><span v-else>l</span>
                        </td>
                        <td>
                          <router-link
                            :to="'/campaigns/' + campaign.id"
                            class="text-dark"
                            ><font-awesome-icon icon="eye"
                          /></router-link>
                        </td>
                        <td>
                          <router-link
                            :to="'/campaign/' + campaign.id + '/edit'"
                            class="text-primary"
                            ><font-awesome-icon icon="pen"
                          /></router-link>
                        </td>
                        <td>
                          <a
                            href=""
                            @click.prevent="deleteCampaign(campaign.id)"
                            class="text-danger"
                            ><font-awesome-icon icon="trash-alt"
                          /></a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AllCampaigns",
  data: function() {
    return {
      campaigns: {},
      errors: {
        visible: false,
        type: "danger",
        message: ""
      }
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
        .catch(() => {
          this.errors = {
            visible: true,
            type: "danger",
            message: "Impossible de récupérer la liste des campagnes."
          };
        });
    }
  }
};
</script>
