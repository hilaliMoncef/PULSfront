<template>
	<form class="w-100">
		<div class="row">
			<div class="alert alert-danger w-100" v-if="errors">
				Une erreur s'est produite. Vérifier le formulaire.
			</div>
			<div class="alert alert-success w-100" v-if="success">
				La modification a été effectuée avec succès.
			</div>
		</div>
		<div class="row">
			<div class="col-9">
				<div class="form-group w-100">
					<label for="name">Nom du terminal</label>
					<input type="text" class="form-control" aria-describedby="nameHelp" v-model="terminal.name">
					<small id="nameHelp" class="form-text text-muted">Donnez un nom cohérent au terminal.</small>
				</div>
			</div>
			<div class="col-3">
				<div class="form-group w-100">
					<label for="owner">Propriétaire</label>
					<input type="text" class="form-control" disabled aria-describedby="ownerHelp" v-model="terminal.owner">
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col">
				<div class="form-group w-100">
					<div class="form-group">
						<label for="campaign">Campagne</label>
						<select class="form-control" v-model="terminal.campaign" id="campaign">
							<option v-for="campaign in campaigns" :key="campaign.id" :selected="terminal.campaign == campaign.id" :value="campaign.id">{{ campaign.name }}</option>
						</select>
						<small id="campaignHelp" class="form-text text-muted">Choisir la campagne de sensibilisation active sur le terminal.</small>
					</div>
				</div>
			</div>
		</div>
		<div class="row mt-3">
			<div class="col text-center">
				<router-link to="/terminals" class="btn btn-link">Retour</router-link>
				<button @click.prevent="edit" class="btn btn-primary">Enregistrer les modifications</button>
			</div>
		</div>
	</form>
</template>

<script>
	export default {
		name: "EditTerminalForm",
		props: ['terminal', 'campaigns'],
		data: function() {
			return {
				success: false,
				errors: false
			}
		},
		methods: {
			edit: function() {
				if(this.terminal) {
					this.success = false;
					this.errors = false;
					this.$http.put('https://puls-preprod.herokuapp.com/terminal/'+ this.terminal.id +'/', this.terminal)
					.then(resp => {
						this.success = true;
						this.terminal = resp.data;
					})
					.catch(err => {
						this.errors = true;
						console.log(err.response);
					});
				}
			}
		}
	};
</script>