<template>
  <div class="about">
    <div class="col-6 offset-3">
      <div class="row">
        <h1 class="display-4 text-center">Gestion de clients</h1>
        <p class="lead">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </div>
    <div class="col-8 offset-2 mt-4">
      <div class="row mb-3 d-flex justify-content-end">
        <router-link
          to="/customer/add"
          class="btn btn-primary d-flex align-items-center"
        >
          <font-awesome-icon icon="plus" class="mr-2" />
          <span>Nouveau client</span>
        </router-link>
      </div>
      <div class="row d-flex">
        <div class="col-4" v-for="customer in customers" :key="customer.id">
          <div class="card h-100">
            <div class="card-body">
              <h5 class="card-title">{{ customer.company }}</h5>
              <p class="card-subtitle text-muted small">
                {{ customer.representative }}
              </p>
              <p class="card-text">
                <span class="badge badge-success mr-2" v-if="customer.is_active"
                  >Activé</span
                >
                <span class="badge badge-danger mr-2" v-else>Désactivé</span>
              </p>
            </div>
            <div class="card-footer d-flex justify-content-between">
              <a
                href=""
                @click.prevent="deactivateClient(customer.id)"
                v-if="customer.is_active"
                class="text-danger"
                >Désactiver</a
              >
              <a
                href=""
                @click.prevent="activateClient(customer.id)"
                v-else
                class="text-danger"
                >Activer</a
              >
              <a href="" @click.prevent="editClient(customer.id)">Modifier</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Customers",
  data: function() {
    return {
      customers: ""
    };
  },
  mounted: function() {
    this.getCustomers();
  },
  methods: {
    getCustomers: function() {
      this.$http.get("customer/").then(resp => {
        this.customers = resp.data;
      });
    },
    deactivateClient: function(id) {
      this.$http.get("customer/" + id + "/deactivate/").then(resp => {
        if (resp) {
          this.getCustomers();
        }
      });
    },
    activateClient: function(id) {
      this.$http.get("customer/" + id + "/activate/").then(resp => {
        if (resp) {
          this.getCustomers();
        }
      });
    },
    editClient: function(id) {
      this.$router.push("/customer/" + id + "/edit");
    }
  }
};
</script>
