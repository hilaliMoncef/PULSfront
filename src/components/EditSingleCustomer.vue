<template>
	<form class="w-100">
		<div class="row">
			<div class="col-12">
				<div class="form-group w-100">
					<label for="name">Nom de l'entreprise</label>
					<input type="text" class="form-control" aria-describedby="nameHelp" v-model="customer.company">
					<small id="nameHelp" class="form-text text-muted">Le nom de l'entreprise cliente.</small>
				</div>
			</div>
		</div>
		<div class="row mt-3">
			<div class="col text-center">
				<router-link to="/customers" class="btn btn-link">Retour</router-link>
				<button @click.prevent="edit" class="btn btn-primary">Enregistrer les modifications</button>
			</div>
		</div>
	</form>
</template>

<script>
	export default {
		name: "EditCustomerForm",
		props: ['customer'],
		methods: {
			edit: function() {
				if(this.customer) {
					this.$http.put('customer/'+ this.customer.id +'/', this.customer)
					.then(resp => {
						this.customer = resp.data;
					})
					.catch();
				}
			}
		}
	};
</script>