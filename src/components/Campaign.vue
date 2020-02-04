<template>
  <div>
    <div class="card h-100 d-flex flex-column justify-content-between">
      <div class="clickable" @click.prevent="showDetail">
        <img
          class="card-img-top p-3"
          style="object-fit: contain; height:100px;"
          :src="currentCampaign.logo"
          :alt="currentCampaign.name"
        />
        <div class="card-body">
          <h5 class="card-title">{{ currentCampaign.name }}</h5>
          <p class="card-subtitle text-muted small">
            <strong>Objectif de collecte :</strong>
            {{ currentCampaign.collected }}/{{ currentCampaign.goal_amount }} €
          </p>
          <p class="card-text">
            {{ stripCharacters(currentCampaign.description) }}
          </p>
        </div>
      </div>
      <div class="card-footer d-flex justify-content-between">
        <a href="" class="text-primary" @click.prevent="editCampaign"
          >Modifier</a
        >
        <a href="" class="text-danger" @click.prevent="deleteCampaign"
          >Supprimer</a
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Campaign",
  props: ["campaign"],
  data: function() {
    return {
      currentCampaign: this.campaign
    };
  },
  mounted: function() {},
  methods: {
    stripCharacters: function(text) {
      if (text.length > 70) {
        return text.substring(0, 70) + "..";
      } else {
        return text;
      }
    },
    showDetail: function() {
      this.$router.push({
        name: "campaign",
        params: { id: this.currentCampaign.id }
      });
    },
    editCampaign: function() {
      this.$router.push({
        name: "edit-campaign",
        params: { id: this.currentCampaign.id }
      });
    },
    deleteCampaign: function() {
      this.$router.push({
        name: "edit-campaign",
        params: { id: this.currentCampaign.id }
      });
    }
  }
};
</script>

<style>
.btn-rounded {
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid;
  width: 30px;
  height: 30px;
}
</style>
