<template>
	<div class="terminal card w-100">
		<div class="terminal d-flex align-items-center justify-content-between">
			<div @click="showDetail" class="clickable py-2 px-3 d-flex align-items-center">
				<img class="mx-3" src="@/assets/img/console.png" height="70" alt="Console" />
				<div class="d-flex flex-column justify-content-between">
					<strong>{{ currentTerminal.name }}</strong>
					<p class="small mb-1">Campagne: <i>{{ currentCampaign.name }}</i></p>
					<p>
						<span class="badge badge-success mr-2" v-if="currentTerminal.is_active">Activé</span>
						<span class="badge badge-danger mr-2" v-else>Inactive</span>
						<span class="badge badge-success mr-2" v-if="currentTerminal.is_on">Allumé</span>
						<span class="badge badge-danger mr-2" v-else>Eteint</span>
						<span class="badge badge-success" v-if="currentTerminal.is_playing">En jeu</span>
						<span class="badge badge-warning" v-else>En attente</span>
					</p>
				</div>
			</div>
			<div class="links d-flex flex-column align-items-stretch bg-light align-self-stretch justify-content-around border-left">
				<a href="" @click.prevent="deactivateTerminal" v-if="currentTerminal.is_active" class="text-danger px-3">Désactiver le terminal</a>
				<a href="" @click.prevent="activateTerminal" v-else class="text-danger px-3">Activer le terminal</a>
				<a href="" @click.prevent="editTerminal" class="px-3">Modifier le terminal</a>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Terminals",
		props: ['terminal'],
		data: function() {
			return {
				currentTerminal: this.terminal,
				currentCampaign: {}
			}
		},
		mounted: function() {
			if(this.currentTerminal.campaign != null) {
				this.$http.get('https://puls-preprod.herokuapp.com/campaign/'+ this.currentTerminal.campaign +'/')
				.then(resp =>{
					this.currentCampaign = resp.data;
				})
			} else {
				this.currentCampaign.name = 'Non assigné';
			}
		},
		methods: {
			showDetail: function() {
				this.$router.push({ name: 'terminal', params: { id: this.currentTerminal.id } });
			},
			editTerminal: function() {
				this.$router.push({ name: 'edit-terminal', params: { id: this.currentTerminal.id }});
			},
			activateTerminal: function() {
				if(this.currentTerminal.campaign) {
					this.$http.get('https://puls-preprod.herokuapp.com/terminal/'+ this.currentTerminal.id +'/activate/')
					.then(resp =>{
						this.currentTerminal = resp.data;
					})
				} else {
					console.error('Impossible d\'activer un terminal sans campagne.');
				}
			},
			deactivateTerminal: function() {
				this.$http.get('https://puls-preprod.herokuapp.com/terminal/'+ this.currentTerminal.id +'/deactivate/')
				.then(resp =>{
					this.currentTerminal = resp.data;
				})
			}
		}
	};
</script>

<style>
	.clickable {
		cursor: pointer;
	}
</style>