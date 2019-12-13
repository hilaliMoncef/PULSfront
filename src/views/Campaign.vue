<template>
	<div class="about mt-3">
		<div class="col-6 offset-3">
			<div class="row d-flex flex-column align-items-center">
				<span class="small">Campagne n° {{ campaign.id }}</span>
				<h1 class="display-4 text-center">{{ campaign.name }}</h1>
				<p class="lead w-100 text-center">Description: {{ campaign.description }}</p>
			</div>
		</div>
		<div class="row">
			<div class="col-4">
				<div class="card">
					<div class="card-body">
						<p class="lead">Montant récolté aujourd'hui</p>
						<div class="display-3">
							{{ totalToday }} €
						</div>
					</div>
				</div>
			</div>
			<div class="col-4">
				<div class="card">
					<div class="card-body">
						<p class="lead">Montant total récolté</p>
						<div class="display-3">
							{{ totalEver }} €
						</div>
					</div>
				</div>
			</div>
			<div class="col-4">
				<div class="card">
					<div class="card-body">
						<p class="lead">Montant moyen</p>
						<div class="display-3">
							{{ avgDonation }} €
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="row mt-3">
			<div class="col">
				<h3 class="my-3">Derniers donateurs</h3>
				<p class="lead ">Les 5 derniers donateurs pour cette campagne.</p>
				<table class="table">
					<thead class="thead-dark">
						<tr>
							<th scope="col">#</th>
							<th scope="col">Nom</th>
							<th scope="col">Sexe</th>
							<th scope="col">Email</th>
							<th scope="col">Don</th>
							<th scope="col">Terminal</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(donation, index) in lastDonations" :key="donation.id">
							<th scope="row">{{ index+1 }}</th>
							<td>{{ donation.donator.name }}</td>
							<td>{{ donation.donator.gender }}</td>
							<td>{{ donation.donator.email }}</td>
							<td>{{ donation.amount }} €</td>
							<td>{{ donation.terminal }}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Campaign",
		data: function() {
			return {
				campaign: '',
				totalToday: '',
				totalEver: '',
				avgDonation: '',
				lastDonations: {}
			}
		},
		mounted: function() {
			this.getCampaign();
		},
		methods:{
			getCampaign: function() {
				this.$http.get('campaign/'+ this.$route.params.id +'/')
				.then(resp => {
					this.campaign = resp.data;
					this.getStats();
				})
				.catch(err => {
					console.log(err.response);
				})
			},
			getStats: function() {
				this.$http.get('campaign/'+ this.$route.params.id +'/stats/')
				.then(resp => {
					const data = JSON.parse(resp.data);
					this.totalToday = data.total_today;
					this.totalEver = data.total_ever;
					this.avgDonation = data.avg_amount;
					this.lastDonations = data.last_donations;
				})
				.catch(err => {
					console.log(err.response);
				})			
			}
		}
	};
</script>
