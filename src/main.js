import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from 'axios';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import toast from '@/assets/js/toast.js'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserSecret, faPen, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Font Awesome Stuff
library.add(faUserSecret, faPen, faTimes, faPlus)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false;

// Axios stuff
Vue.prototype.$http = axios;
Vue.prototype.$http.defaults.baseURL = process.env.VUE_APP_SERVER_URL
const token = localStorage.getItem('token')
if (token) {
	Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}
Vue.prototype.$http.interceptors.response.use(
	response => {
		if(response.status && response.status == 201) {
			toast.success(response.statusText);
		}
		if(response.status == 200 && response.config.method == "post"){
			toast.success(response.statusText);
		}
		return response;
	}, 
	error => {
	    // Error handling part
	    if (error.response && error.response.data ) {
	    	toast.error(error.response.statusText);
	    }
});

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount("#app");
