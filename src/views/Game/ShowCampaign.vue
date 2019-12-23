<template>
  <div class="col-6 offset-3">
    <div class="row">
      <h1 class="display-4 text-center">Merci pour votre don</h1>
      <p class="lead">
        {{ campaign.description }}
      </p>
    </div>
    <div class="row">
      <div
        style="width: 500px; height: 500px; margin: auto; background-color: black;"
      ></div>
    </div>
    <div class="message my-4">
      {{ campaign.html_template }}
    </div>
    <div class="row">
      <router-link to="/play" class="btn btn-primary">Jouer</router-link>
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
