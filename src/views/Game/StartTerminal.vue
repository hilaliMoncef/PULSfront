<template>
	<div>
		<div class="home" v-if="terminal.is_active">
			<div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
				<h1 class="display-4">Campagne : {{ campaign.name }}</h1>
				<p class="lead">
					Cliquer sur le bouton pour commencer.
				</p>
			</div>
			<div class="row">
				<div class="col text-center">
					<router-link to='/payment' class="btn btn-primary">Commencer </router-link>
				</div>
			
			</div>
		</div>
		<div v-else>
			<div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
				<h1 class="display-4">Borne désactivée</h1>
				<p class="lead">
					Cette borne est actuellement indisponible, veuillez réessayer plus tard.
				</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "StartTerminal",
		data: function() {
			return {
				email: '',
				terminal: {},
				campaign: {}
			}
		},
		mounted: function() {
			this.$http.get('terminal/mine/')
			.then(resp => {
				this.$store.commit('startTerminal', resp.data);
				this.terminal = resp.data.terminal;
				this.campaign = resp.data.campaign;
				this.$http.get('terminal/mine/on/');
			}).catch(err => {
				console.error(err.response);
			})
		}
	};
</script>
