<template>
  <div class="about">
    <div class="col-6 offset-3">
      <div class="row">
        <h1 class="display-4 text-center">Liste des donateurs</h1>
        <p class="lead">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </div>
    <div class="col-10 offset-1 mt-4">
      <div class="row">
        <table class="table table-hover">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Email</th>
              <th scope="col">Accepte la newsletter</th>
              <th scope="col">Accepte d'être contacté</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(donator, index) in donators" :key="index">
              <th scope="row">{{ donator.id }}</th>
              <td>{{ donator.email }}</td>
              <td>
                <span class="text-success" v-if="donator.accept_newsletter"
                  >Oui</span
                >
                <span class="text-danger" v-else>Non</span>
              </td>
              <td>
                <span class="text-success" v-if="donator.accept_asso">Oui</span>
                <span class="text-danger" v-else>Non</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Donators",
  data: function() {
    return {
      donators: ""
    };
  },
  mounted: function() {
    this.getDonators();
  },
  methods: {
    getDonators: function() {
      this.$http.get("donator/").then(resp => {
        this.donators = resp.data;
      });
    }
  }
};
</script>
