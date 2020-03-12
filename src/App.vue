<template>
  <div id="app" class="dashboard-main-wrapper">
    <span v-if="isLoggedIn">
      <vue-progress-bar></vue-progress-bar>
      <Navbar></Navbar>
      <Sidebar></Sidebar>
      <div class="dashboard-wrapper">
        <router-view />
        <Footer></Footer>
      </div>
    </span>
    <span v-else>
      <Login></Login>
    </span>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import Sidebar from "@/components/Sidebar.vue";
import Login from "@/components/Login.vue";

export default {
  name: "App",
  components: {
    Navbar,
    Footer,
    Sidebar,
    Login
  },
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    }
  }
};
</script>

<style></style>
