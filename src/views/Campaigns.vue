<template>
	<div class="about">
		<div class="col-6 offset-3">
			<div class="row">
				<h1 class="display-4 text-center">Gestion de campagnes</h1>
				<p class="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
				tempor incididunt ut labore et dolore magna aliqua.</p>
			</div>
		</div>
		<div class="col-8 offset-2 mt-4">
			<div class="row mb-3 d-flex justify-content-between">
				<span></span>
				<router-link to="/campaign/add" class="btn btn-primary">Ajouter une campagne</router-link>
			</div>
			<div class="row">
				<Campaign v-for="campaign in campaigns" :campaign="campaign" :key="campaign.id"></Campaign>
			</div>
		</div>
	</div>
</template>

<script>
	import Campaign from '@/components/Campaign.vue';

	export default {
		name: "Campaigns",
		components: {
			Campaign
		},
		data: function() {
			return {
				campaigns: ''
			}
		},
		mounted: function() {
			this.getCampaigns();
		},
		methods: {
			getCampaigns: function() {
				this.$http.get('campaign/')
				.then(resp => {
					this.campaigns = resp.data;
				})
				.catch(err => {
					console.log(err.response);
				})
			}
		}
	};
</script>
