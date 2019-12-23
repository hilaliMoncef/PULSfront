<template>
  <div class="col-6 offset-3">
    <div class="row">
      <h1 class="display-4 text-center">Paiement</h1>
      <p class="lead">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </div>
    <div class="row text-center mb-3">
      <img
        src="@/assets/img/contactless.png"
        width="100"
        class="mx-auto"
        alt="Contact Less"
      />
    </div>
    <div class="form card py-4 px-3 m-0">
      <div class="row mb-3">
        <div class="col">
          <label for="amount">Montant choisi</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">€</span>
            </div>
            <input
              type="number"
              class="form-control"
              v-model="amount"
              required=""
            />
          </div>
          <div class="invalid-feedback">
            Valid amount is required.
          </div>
        </div>
      </div>

      <div class="row mt-3 text-center">
        <div class="col">
          <button class="btn btn-primary" @click="pay">
            Payer sans contact
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Payment",
  data: function() {
    return {
      amount: "",
      payment: ""
    };
  },
  methods: {
    pay: function() {
      if (this.amount > 0) {
        // ADD PAYMENT API HERE
        this.payment = {
          donator: this.$store.state.session.donator,
          terminal: this.$store.state.session.terminal,
          campaign: this.$store.state.session.campaign,
          game: this.$store.state.session.game,
          date: new Date(),
          method: "Contactless",
          status: "Accepted",
          amount: this.amount,
          currency: "EUR"
        };
        this.$http
          .post("payment/", this.payment)
          .then(resp => {
            if (resp.status == "201") {
              this.$router.push("/watch");
            }
          })
          .catch(err => {
            console.log(err.response);
          });
      }
    }
  }
};
</script>
