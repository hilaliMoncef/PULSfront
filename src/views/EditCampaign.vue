<template>
  <div class="about mt-3">
    <div class="col-8 offset-2 mb-4">
      <div class="row">
        <h1 class="display-4 text-center d-block mb-3">
          Campagne n° {{ campaign.id }}
        </h1>
      </div>
      <div class="row">
        <p class="lead d-block">Description : {{ campaign.description }}</p>
      </div>
    </div>
    <div class="col-10 offset-1">
      <EditSingleCampaign :campaign="campaign"></EditSingleCampaign>
    </div>
  </div>
</template>

<script>
import EditSingleCampaign from "@/components/EditSingleCampaign.vue";

export default {
  name: "EditCampaign",
  components: {
    EditSingleCampaign
  },
  data: function() {
    return {
      campaign: {}
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
    }
  }
};
</script>
