<template>
  <div class="terminal card w-100">
    <div class="terminal d-flex align-items-center justify-content-between">
      <div
        @click="showDetail"
        class="clickable py-2 px-3 d-flex align-items-center w-100"
      >
        <img
          class="mx-3"
          src="@/assets/img/console.png"
          height="70"
          alt="Console"
        />
        <div class="d-flex flex-column justify-content-between">
          <div class="d-flex align-items-center">
            <strong>{{ currentTerminal.name }}</strong>
            <span class="mx-2">|</span>
            <span>{{ currentTerminal.owner.customer.company }}</span>
          </div>
          <p class="small my-1">
            Campagne:
            <span
              v-for="campaign in campaigns"
              class="border px-2 mx-1 rounded border-primary text-primary"
              :key="campaign.id"
              >{{ campaign.name }}</span
            >
          </p>
          <p class="small my-1">
            Jeux:
            <span
              v-for="game in games"
              class="border px-2 mx-1 rounded border-secondary text-secondary"
              :key="game.id"
              >{{ game.name }}</span
            >
          </p>
        </div>
        <div class="d-flex flex-column ml-auto">
          <span
            class="badge badge-success my-1"
            v-if="currentTerminal.is_active"
            >Activé</span
          >
          <span class="badge badge-danger my-1" v-else>Désactivé</span>
          <span class="badge badge-success my-1" v-if="currentTerminal.is_on"
            >Allumé</span
          >
          <span class="badge badge-danger my-1" v-else>Eteint</span>
          <span
            class="badge badge-success my-1"
            v-if="currentTerminal.is_playing"
            >En jeu</span
          >
        </div>
      </div>
      <div
        class="links d-flex flex-column align-items-stretch bg-light align-self-stretch justify-content-around border-left"
      >
        <a
          href=""
          @click.prevent="deactivateTerminal"
          v-if="currentTerminal.is_active"
          class="text-danger px-3"
          >Désactiver</a
        >
        <a
          href=""
          @click.prevent="activateTerminal"
          v-else
          class="text-success px-3"
          >Activer</a
        >
        <a href="" @click.prevent="editTerminal" class="px-3">Modifier</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Terminals",
  props: ["terminal"],
  data: function() {
    return {
      currentTerminal: this.terminal,
      campaigns: {},
      games: {}
    };
  },
  mounted: function() {
    if (this.currentTerminal.campaigns && this.currentTerminal.games) {
      this.$http
        .get("terminal/" + this.currentTerminal.id + "/campaigns/")
        .then(resp => {
          this.campaigns = resp.data;
        });
      this.$http
        .get("terminal/" + this.currentTerminal.id + "/games/")
        .then(resp => {
          this.games = resp.data;
        });
    } else {
      this.campaigns = ["Non assigné"];
    }
  },
  methods: {
    showDetail: function() {
      this.$router.push({
        name: "terminal",
        params: { id: this.currentTerminal.id }
      });
    },
    editTerminal: function() {
      this.$router.push({
        name: "edit-terminal",
        params: { id: this.currentTerminal.id }
      });
    },
    activateTerminal: function() {
      if (this.currentTerminal.campaigns && this.currentTerminal.games) {
        this.$http
          .get("terminal/" + this.currentTerminal.id + "/activate/")
          .then(resp => {
            this.currentTerminal = resp.data;
          });
      } else {
        console.error(
          "Impossible d'activer un terminal sans campagne ou sans jeu."
        );
      }
    },
    deactivateTerminal: function() {
      this.$http
        .get("terminal/" + this.currentTerminal.id + "/deactivate/")
        .then(resp => {
          this.currentTerminal = resp.data;
        });
    }
  }
};
</script>

<style>
.clickable {
  cursor: pointer;
}
</style>
