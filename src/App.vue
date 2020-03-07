<template>
  <div id="app" class="dashboard-main-wrapper">
    <vue-progress-bar></vue-progress-bar>
    <Navbar></Navbar>
    <Sidebar></Sidebar>
    <div class="dashboard-wrapper">
      <router-view />
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import Sidebar from "@/components/Sidebar.vue";

export default {
  name: "App",
  components: {
    Navbar,
    Footer,
    Sidebar
  }
};
</script>

<style></style>
