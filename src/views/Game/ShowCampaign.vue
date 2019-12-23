<template>
  <div class="col-12">
    <div class="row">
      <div class="col-6 offset-3">
        <h1 class="display-4 text-center">Merci pour votre don</h1>
        <p class="lead">
          {{ campaign.description }}
        </p>
      </div>
    </div>
    <div class="row">
      <video controls :src="campaign.video_url" :alt="campaign.name"></video>
    </div>
    <div class="message my-4">
      {{ campaign.html_template }}
    </div>
    <div class="row mb-4 w-100">
      <router-link to="/play" class="btn btn-primary btn-lg mx-auto"
        >Jouer</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "ShowCampaign",
  data: function() {
    return {
      campaign: {},
      session: {}
    };
  },
  mounted: function() {
    this.campaign = this.$store.state.currentCampaign;
    this.session = this.$store.state.session;
  },
  methods: {}
};
</script>
