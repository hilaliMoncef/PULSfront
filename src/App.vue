<template>
  <div id="app">
    <Navbar></Navbar>

    <div class="container">
      <router-view />
    </div>
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar
  }
};
</script>

<style>
@import "./assets/css/all.min.css";
</style>
