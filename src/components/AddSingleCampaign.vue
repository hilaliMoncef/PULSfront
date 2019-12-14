<template>
	<form class="w-100">
		<div class="row">
			<div class="col-12">
				<div class="form-group w-100">
					<label for="name">Nom de la campagne</label>
					<input type="text" class="form-control" aria-describedby="nameHelp" v-model="campaign.name">
					<small id="nameHelp" class="form-text text-muted">Donnez un nom cohérent à la campagne.</small>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-12">
				<div class="form-group w-100">
					<label for="description">Description</label>
					<textarea class="form-control" v-model="campaign.description"></textarea>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col">
				<div class="form-group w-100">
					<div class="form-group">
						<label for="html_template">HTML Template</label>
						<textarea class="form-control" v-model="campaign.html_template"></textarea>
						<small id="htmlHelp" class="form-text text-muted">Template HTML qui apparaît à la fin de chaque partie.</small>
					</div>
				</div>
			</div>
		</div>
		<div class="row mt-3">
			<div class="col text-center">
				<router-link to="/campaigns" class="btn btn-link">Retour</router-link>
				<button @click.prevent="edit" class="btn btn-primary">Enregistrer les modifications</button>
			</div>
		</div>
	</form>
</template>

<script>
	export default {
		name: "AddCampaignForm",
		data: function() {
			return {
				campaign: {},
				success: false,
				errors: false
			}
		},
		methods: {
			edit: function() {
				if(this.campaign) {
					this.success = false;
					this.errors = false;
					this.campaign.author = this.$store.state.user_id;
					this.$http.post('campaign/', this.campaign)
					.then(resp => {
						console.log(resp);
						this.$router.push('/campaigns')
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