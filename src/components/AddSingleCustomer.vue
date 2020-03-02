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
              required
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
              required
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
              <select
                class="form-control"
                required
                v-model="customer.sales_type"
              >
                <option value="A">Achat</option>
                <option value="L">Location</option>
              </select>
            </div>
          </div>
          <div class="col-6 pr-0">
            <div class="form-group">
              <label for="sales_type">Contrat de maintenance</label>
              <select
                class="form-control"
                required
                v-model="customer.maintenance_type"
              >
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col text-center">
        <router-link to="/customers" class="btn btn-link">Retour</router-link>
        <button @click.prevent="add" class="btn btn-primary">
          Enregistrer les modifications
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "AddCustomerForm",
  data: function() {
    return {
      customer: {},
      error: ""
    };
  },
  methods: {
    add: function() {
      if (
        this.customer.company &&
        this.customer.representative &&
        this.customer.sales_type
      ) {
        this.$http.post("customer/", this.customer).then(resp => {
          this.customer = resp.data;
          this.$router.push("/customers");
        });
      } else {
        this.error = "Des champs sont manquants.";
      }
    }
  }
};
</script>
