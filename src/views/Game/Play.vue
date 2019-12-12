<template>
	<div class="col-6 offset-3">
		<div class="row">
			<h1 class="display-4 text-center">Début du jeu</h1>
			<p class="lead">Veuillez patienter, votre partie va débuter dans quelques secondes.</p>
		</div>
		<div class="row">
			<button @click.prevent="endGame" class="btn btn-primary">Fin du jeu</button>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Play",
		data: function() {
			return {
				donator: {}
			}
		},
		mounted: function() {
			this.donator = this.$store.state.currentDonator;
			this.$http.get('https://puls-preprod.herokuapp.com/terminal/mine/play/')
			.then(resp =>{
				console.log(resp);
			});
		},
		methods: {
			endGame: function() {
				this.$router.push('/endgame')
			}
		}
	};
</script>