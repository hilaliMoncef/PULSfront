<template>
  <form class="w-100">
    <div class="row" v-if="error">
      <div
        class="alert alert-danger w-100 alert-dismissible fade show"
        role="alert"
      >
        <strong>Erreur : </strong> {{ error }}
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
        <div class="row">
          <div class="form-group w-100">
            <label for="name">Nom de l'entreprise</label>
            <input
              type="text"
              class="form-control"
              aria-describedby="nameHelp"
              v-model="customer.company"
            />
            <small id="nameHelp" class="form-text text-muted"
              >Le nom de l'entreprise cliente.</small
            >
          </div>
        </div>
        <div class="row">
          <div class="form-group w-100">
            <label for="name">Contact au sein de l'entreprise</label>
            <input
              type="text"
              class="form-control"
              aria-describedby="nameHelp"
              v-model="customer.representative"
            />
            <small id="nameHelp" class="form-text text-muted"
              >Le nom ou l'email de votre contact dans cette entreprise.</small
            >
          </div>
        </div>
        <div class="row">
          <div class="col-6 pl-0">
            <div class="form-group">
              <label for="sales_type">Type de vente</label>
              <select class="form-control" v-model="customer.sales_type">
                <option value="A" :checked="customer.sales_type == 'A'"
                  >Achat</option
                >
                <option value="L" :checked="customer.sales_type == 'L'"
                  >Location</option
                >
              </select>
            </div>
          </div>
          <div class="col-6 pr-0">
            <div class="form-group">
              <label for="sales_type">Contrat de maintenance</label>
              <select class="form-control" v-model="customer.maintenance_type">
                <option
                  value="option1"
                  :checked="customer.sales_type == 'option1'"
                  >Option 1</option
                >
                <option
                  value="option2"
                  :checked="customer.sales_type == 'option2'"
                  >Option 2</option
                >
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col text-center">
        <router-link to="/customers" class="btn btn-link">Retour</router-link>
        <button @click.prevent="edit" class="btn btn-primary">
          Enregistrer les modifications
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "EditCustomerForm",
  props: ["customer"],
  data: function() {
    return {
      error: "",
      success: ""
    };
  },
  methods: {
    edit: function() {
      if (
        this.customer.company &&
        this.customer.representative &&
        this.customer.sales_type
      ) {
        this.$http
          .put("customer/" + this.customer.id + "/", this.customer)
          .then(resp => {
            this.customer = resp.data;
            this.success =
              "Le client " + this.customer.company + " a été mis à jour.";
          })
          .catch();
      } else {
        this.error = "Des champs sont manquants.";
      }
    }
  }
};
</script>
