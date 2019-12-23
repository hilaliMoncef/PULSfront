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
      <div class="row mb-3" v-for="customer in customers" :key="customer.id">
        <div class="terminal card w-100">
          <div
            class="terminal d-flex align-items-center justify-content-between"
          >
            <div class="clickable py-2 px-3 d-flex flex-column">
              <h3 class="d-block mb-0">{{ customer.company }}</h3>
              <p class="mt-0 mb-2 small">
                <strong>Contact:</strong> {{ customer.representative }}
              </p>
              <p>
                <span class="badge badge-success mr-2" v-if="customer.is_active"
                  >Activé</span
                >
                <span class="badge badge-danger mr-2" v-else>Désactivé</span>
              </p>
            </div>
            <div
              class="links d-flex flex-column align-items-stretch bg-light align-self-stretch justify-content-around border-left"
            >
              <a
                href=""
                @click.prevent="deactivateClient(customer.id)"
                v-if="customer.is_active"
                class="text-danger px-3"
                >Désactiver le client</a
              >
              <a
                href=""
                @click.prevent="activateClient(customer.id)"
                v-else
                class="text-danger px-3"
                >Activer le client</a
              >
              <a href="" @click.prevent="editClient(customer.id)" class="px-3"
                >Modifier le client</a
              >
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
