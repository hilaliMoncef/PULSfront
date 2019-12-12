<template>
	<div class="about mt-3">
		<div class="col-6 offset-3">
			<div class="row">
				<h1 class="display-4 text-center">Terminal : {{ terminal.name }}</h1>
				<p class="lead w-100 text-center">Campagne: {{ campaign.name }}</p>
				<p class="lead w-100 text-center">
					<span class="badge badge-success mr-2" v-if="terminal.is_active">Activé</span>
					<span class="badge badge-danger mr-2" v-else>Inactive</span>
					<span class="badge badge-success mr-2" v-if="terminal.is_on">Allumé</span>
					<span class="badge badge-danger mr-2" v-else>Eteint</span>
					<span class="badge badge-success" v-if="terminal.is_playing">En jeu</span>
					<span class="badge badge-warning" v-else>En attente</span>
				</p>
			</div>
		</div>
		<div class="row">
			<div class="col-7 mt-4">
				<h3 class="my-3">Derniers donateurs</h3>
				<p class="lead">Les 5 derniers donateurs sur ce terminal.</p>
				<table class="table">
					<thead class="thead-dark">
						<tr>
							<th scope="col">#</th>
							<th scope="col">Nom</th>
							<th scope="col">Sexe</th>
							<th scope="col">Email</th>
							<th scope="col">Don</th>
							<th scope="col">Jeu choisi</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(donation, index) in donations" :key="donation.id">
							<th scope="row">{{ index+1 }}</th>
							<td>{{ donation.donator.name }}</td>
							<td>{{ donation.donator.gender }}</td>
							<td>{{ donation.donator.email }}</td>
							<td>{{ donation.amount }} €</td>
							<td>Super Mario Bros</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="col-4 offset-1 mt-4">
				<h3 class="my-3">Statistiques</h3>
				<div class="">
					<p class="lead">Session moyenne</p>
					<p class="display-4">{{ avgTS }}</p>
				</div>
				<div class="">
					<p class="lead">Donation moyenne</p>
					<p class="display-4">{{ avgDonations }} €</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Terminal",
		data: function() {
			return {
				terminal: '',
				campaign: '',
				donations: {},
				avgDonations: '',
				avgTS: ''
			}
		},
		mounted: function() {
			this.getTerminal();
			this.getStats();
		},
		methods:{
			getTerminal: function() {
				this.$http.get('https://puls-preprod.herokuapp.com/terminal/'+ this.$route.params.id +'/')
				.then(resp => {
					this.terminal = resp.data;
					this.$http.get('https://puls-preprod.herokuapp.com/campaign/'+ this.terminal.campaign +'/')
					.then(resp => {
						this.campaign = resp.data;
					})
					.catch(err => {
						console.log(err.response);
					})
				})
				.catch(err => {
					console.log(err.response);
				})
			},
			getStats: function() {
				this.$http.get('https://puls-preprod.herokuapp.com/terminal/'+ this.$route.params.id +'/stats/')
				.then(resp => {
					const data = JSON.parse(resp.data);
					this.avgDonations = data.avg_amount;
					this.donations = data.payments;
					this.avgTS = data.avg_ts.replace(/"/g,"");
				})
				.catch(err => {
					console.log(err.response);
				})
			}
		}
	};
</script>
