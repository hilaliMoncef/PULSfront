<template>
  <div class="campaign card w-100 mb-3">
    <div class="card-body d-flex align-items-center justify-content-between">
      <div @click="showDetail" class="clickable d-flex align-items-center">
        <div class="mr-3">
          <img
            :src="currentCampaign.logo"
            :alt="currentCampaign.name"
            width="110"
          />
        </div>
        <div class="d-flex flex-column justify-content-between">
          <h4>{{ currentCampaign.name }}</h4>
          <p class="small my-0">
            <strong>Objectif de collecte :</strong>
            {{ currentCampaign.collected }}/{{ currentCampaign.goal_amount }}
            €
          </p>
          <p class="small">
            <strong>Description :</strong> {{ currentCampaign.description }}
          </p>
        </div>
      </div>
      <div class="actions d-flex align-self-stretch small">
        <a href="" @click.prevent="editCampaign" class="btn-rounded mr-2">
          <font-awesome-icon icon="pen" />
        </a>
        <a
          href=""
          @click.prevent="deleteCampaign"
          class="btn-rounded text-danger"
        >
          <font-awesome-icon icon="times" />
        </a>
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
.btn-rounded:hover {
}
</style>
