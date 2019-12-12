<template>
	<div class="col-6 offset-3">
		<div class="row">
			<h1 class="display-4 text-center">Merci pour votre don</h1>
			<p class="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
			tempor incididunt ut labore et dolore magna aliqua.</p>
		</div>
		<div class="message my-4">
			{{ campaign.html_template }}
		</div>
		<div class="row">
			<button @click.prevent="restart" class="btn btn-primary btn-lg">Merci !</button>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Endgame",
		data: function() {
			return {
				donator: {},
				terminal: {},
				campaign: {},
				session: {}
			}
		},
		mounted: function() {
			this.donator = this.$store.state.currentDonator;
			this.terminal = this.$store.state.currentTerminal;
			this.campaign = this.$store.state.currentCampaign;
			this.$http.get('https://puls-preprod.herokuapp.com/terminal/mine/gameover/');
		},
		methods: {
			restart: function() {
				this.$store.commit('endSession');
				this.session = {
					'start_time': this.$store.state.session.start_time,
					'end_time': this.$store.state.session.end_time,
					'donator': this.donator.id,
					'campaign': this.campaign.id,
					'terminal': this.terminal.id,
					'timesession': ''
				}
				console.log(this.session);
				this.$http.post('https://puls-preprod.herokuapp.com/session/', this.session) 
				.then(resp =>{
					console.log(resp);
					this.$store.commit('deleteGamingStates');
					this.$router.push('/start')
				}).
				catch(err => {
					console.log(err.response);
				})
			}
		}
	};
	</script>