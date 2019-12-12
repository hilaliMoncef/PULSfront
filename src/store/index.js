import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		status: '',
		errors: '',
		token: localStorage.getItem('token') || '',
		user_id: localStorage.getItem('user_id') || '',
		is_admin: (localStorage.getItem('is_admin') == 'true') || '',
		is_superadmin: (localStorage.getItem('is_superadmin') == 'true') || '',
		currentPayment: {},
		currentDonator: '',
		newDonatorEmail: '',
		currentTerminal: '',
		currentCampaign: '',
		session: {
			start_time: '',
			end_time: ''
		},
	},	
	mutations: {
		auth_request(state){
			state.status = 'loading'
		},
		auth_success(state, payload){
			state.status = 'success'
			state.token = payload.token
			state.user_id = payload.user_id
			state.is_admin = payload.is_admin
			state.is_superadmin = payload.is_superadmin
		},
		auth_error(state, payload){
			state.status = 'error'
			state.errors = payload.response.data
		},
		logout(state){
			state.status = ''
			state.token = ''
			state.user_id = ''
			state.is_admin = false
			state.is_superadmin = false
		},
		saveCurrentDonator(state, donator) {
			state.currentDonator = donator
		},
		saveCurrentTerminal(state, terminal) {
			state.currentTerminal = terminal
		},
		startTerminal(state, payload) {
			state.currentTerminal = payload.terminal
			state.currentCampaign = payload.campaign
		},
		stopTerminal(state) {
			state.currentTerminal = ''
			state.currentCampaign = ''
		},
		saveNewDonatorEmail(state, email) {
			state.newDonatorEmail = email
		},
		deleteGamingStates(state){
			state.newDonatorEmail = ''
			state.currentDonator = ''
			state.currentPayment = {}
			state.currentTerminal = ''
			state.currentCampaign = ''
			state.session.start_time = ''
			state.session.end_time = ''
		},
		startSession(state) {
			state.session.start_time = new Date();
		},
		endSession(state) {
			state.session.end_time = new Date();
		},
		payment(state, payload) {
			state.currentPayment.amount = parseFloat(payload.amount)
			state.currentPayment.id = payload.id
		}
	},
	actions: {
		login({commit}, user) {
			return new Promise((resolve, reject) => {
				commit('auth_request')
				axios.post('https://puls-preprod.herokuapp.com/auth/', user)
				.then(resp => {
					const token = 'Token ' + resp.data.token;
					localStorage.setItem('token', token);
					localStorage.setItem('user_id', resp.data.user_id);
					localStorage.setItem('is_admin', resp.data.is_admin);
					localStorage.setItem('is_superadmin', resp.data.is_superadmin);
					axios.defaults.headers.common['Authorization'] = token;
					commit('auth_success', {
							'token': token, 
							'user_id': resp.data.user_id, 
							'is_admin': resp.data.is_admin, 
							'is_superadmin': resp.data.is_superadmin
						});
					axios.get('https://puls-preprod.herokuapp.com/terminal/mine/on/')
					.then(response => {
						commit('saveCurrentTerminal', response.data);
					})
					.catch(err => {
						console.log(err.response);
					})
					resolve(resp)
				}).catch(err => {
					commit('auth_error')
					localStorage.removeItem('token')
					reject(err)
				})
			})
		},
		register({commit}, credentials){
			return new Promise((resolve, reject) => {
				commit('auth_request')
				axios.post('https://puls-preprod.herokuapp.com/api/user/', credentials)
				.then((response) => {
					// Connexion et ajout du token
					console.log(response);
					resolve(response);
				})
				.catch(err => {
					commit('auth_error', err);
					localStorage.removeItem('token');
					reject(err)
				})
			})
		},
		logout({commit}){
			return new Promise((resolve) => {
				axios.get('https://puls-preprod.herokuapp.com/terminal/mine/off/')
				.then(resp => {
					resolve(resp)
				}).catch(err => {
					console.log(err.response);
				})
				commit('logout')
				localStorage.removeItem('token')
				localStorage.removeItem('user_id')
				localStorage.removeItem('is_admin')
				localStorage.removeItem('is_superadmin')
				delete axios.defaults.headers.common['Authorization']
			})
		}
	},
	getters : {
		isLoggedIn: state => !!state.token,
		authStatus: state => state.status,
		isAdmin: state => state.is_admin,
		isSuperAdmin: state => state.is_superadmin
	},
	modules: {}
});
