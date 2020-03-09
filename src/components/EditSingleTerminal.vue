<template>
  <form class="w-100">
    <div class="row" v-if="errors">
      <div
        class="alert alert-danger w-100 alert-dismissible fade show"
        role="alert"
      >
        <strong>Erreur :</strong> {{ errors }}
        <button
          type="button"
          class="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
    <div class="row" v-if="success">
      <div
        class="alert alert-success w-100 alert-dismissible fade show"
        role="alert"
      >
        <strong>Succès : </strong> {{ success }}
        <button
          type="button"
          class="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="form-group w-100">
          <label for="name">Nom du terminal</label>
          <input
            type="text"
            class="form-control"
            aria-describedby="nameHelp"
            v-model="terminal.name"
          />
          <small id="nameHelp" class="form-text text-muted"
            >Donnez un nom cohérent au terminal.</small
          >
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-4">
        <div class="form-group w-100">
          <label for="owner">Client</label>
          <input
            type="text"
            class="form-control"
            disabled
            aria-describedby="ownerHelp"
            v-model="customer.company"
          />
          <small id="nameHelp" class="form-text text-muted"
            >Le client rattaché au terminal.</small
          >
        </div>
      </div>
      <div class="col-4">
        <div class="form-group w-100">
          <label for="owner">Username</label>
          <input
            type="text"
            class="form-control"
            disabled
            aria-describedby="ownerHelp"
            v-model="user.username"
          />
          <small id="nameHelp" class="form-text text-muted"
            >Le username attribué au terminal.</small
          >
        </div>
      </div>
      <div class="col-4">
        <div class="form-group w-100">
          <label for="owner">Password</label>
          <input
            type="password"
            class="form-control"
            disabled
            aria-describedby="ownerHelp"
            v-model="user.password"
          />
          <small id="nameHelp" class="form-text text-muted"
            >Par définition, il n'est pas possible de changer ou de retrouver le
            mot de passe. En cas de problèmes, il faut recréer un terminal.
          </small>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="form-group">
          <label for="location">Localisation</label>
          <input
            type="text"
            class="form-control"
            v-model="terminal.location"
            aria-describedby="helpId"
            placeholder="Adresse ou coordonnées de la borne"
          />
          <small id="helpId" class="form-text text-muted"
            >Localisation de la borne.</small
          >
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col" v-if="terminal.campaigns">
        <label for="campaign"
          >Campagnes actives :
          <span
            :class="[
              terminal.campaigns.length > maxCampaigns ||
              terminal.campaigns.length == 0
                ? 'text-danger'
                : '',
              'font-weight-bold'
            ]"
            >({{ terminal.campaigns.length }}/{{ maxCampaigns }})</span
          ></label
        >
        <div class="row form-group">
          <label
            v-for="campaign in campaigns"
            :key="campaign.id"
            :for="campaign.id"
            :class="[
              campaignExists(campaign.id) ? 'checked' : '',
              'checkbox',
              'col-3',
              'py-2',
              'mx-2'
            ]"
            @click.prevent="selectCampaign(campaign.id)"
          >
            <input type="radio" :value="campaign.id" />
            <span
              :class="[
                'selected',
                'd-flex',
                'align-items-center',
                'justify-content-center'
              ]"
            >
              <font-awesome-icon icon="check" />
            </span>
            <span class="checkbox-icon">
              <img :src="campaign.logo" height="70" :alt="campaign.name" />
            </span>
            <h5 class="mt-2">{{ campaign.name }}</h5>
            <p class="lead">
              {{ campaign.collected }}/{{ campaign.goal_amount }} €
            </p>
          </label>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col" v-if="terminal.games">
        <label for="game"
          >Jeux actifs :
          <span
            :class="[
              terminal.games.length > maxGames || terminal.games.length == 0
                ? 'text-danger'
                : '',
              'font-weight-bold'
            ]"
            >({{ terminal.games.length }}/{{ maxGames }})</span
          ></label
        >
        <div class="row form-group">
          <label
            v-for="game in games"
            :for="game.id"
            :class="[
              gameExists(game.id) ? 'checked' : '',
              'checkbox',
              'col-3',
              'py-3',
              'mx-2'
            ]"
            :key="game.id"
            @click.prevent="selectGame(game.id)"
          >
            <input type="radio" :value="game.id" />
            <span
              :class="[
                'selected',
                'd-flex',
                'align-items-center',
                'justify-content-center'
              ]"
            >
              <font-awesome-icon icon="check" />
            </span>
            <span class="checkbox-icon">
              <img :src="game.logo" height="70" :alt="game.name" />
            </span>
            <h4 class="mt-2">{{ game.name }}</h4>
          </label>
        </div>
      </div>
    </div>
    <div class="row my-3">
      <div class="col text-center">
        <router-link to="/terminals" class="btn btn-link">Retour</router-link>
        <button @click.prevent="edit" class="btn btn-primary">
          Enregistrer les modifications
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "EditTerminalForm",
  props: ["terminal", "campaigns", "games", "user", "customer"],
  data: function() {
    return {
      success: "",
      errors: "",
      maxGames: this.$store.state.maxGames,
      maxCampaigns: this.$store.state.maxCampaigns
    };
  },
  methods: {
    campaignExists: function(id) {
      return this.terminal.campaigns.includes(id);
    },
    selectCampaign: function(id) {
      if (!this.terminal.campaigns.includes(id)) {
        if (this.terminal.campaigns.length <= this.maxCampaigns) {
          // Only if not max campaigns
          this.terminal.campaigns.push(id);
        }
      } else {
        for (let index = 0; index < this.terminal.campaigns.length; index++) {
          const element = this.terminal.campaigns[index];
          if (element == id) {
            this.$delete(this.terminal.campaigns, index);
          }
        }
      }
    },
    gameExists: function(id) {
      return this.terminal.games.includes(id);
    },
    selectGame: function(id) {
      if (!this.terminal.games.includes(id)) {
        if (this.terminal.games.length <= this.maxGames) {
          this.terminal.games.push(id);
        }
      } else {
        for (let index = 0; index < this.terminal.games.length; index++) {
          const element = this.terminal.games[index];
          if (element == id) {
            this.$delete(this.terminal.games, index);
          }
        }
      }
    },
    edit: function() {
      if (this.terminal) {
        this.success = "";
        this.errors = "";
        this.$http
          .put("terminal/" + this.terminal.id + "/", this.terminal)
          .then(resp => {
            this.terminal = resp.data;
            this.success =
              "La borne " + this.terminal.name + " a été mise à jour.";
          })
          .catch(err => {
            console.log(err);
            this.errors = "Une erreur s'est produite. Veuillez réessayer.";
          });
      }
    }
  }
};
</script>
<style></style>
