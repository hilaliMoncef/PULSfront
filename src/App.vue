<template>
  <div id="app">
    <Navbar></Navbar>
    <!--<ul>
      <li v-for="(gamepad, index) in gamepads" :key="index">
        <ul>
          <li v-for="(button, index) in gamepad.buttons" :key="index">
            #{{ index }} - {{ button.value }}
          </li>
        </ul>
      </li>
    </ul>-->

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
  },
  data: function() {
    return {
      gamepads: [],
      btnA: false,
      btnB: false,
      btnRight: false,
      btnLeft: false
    };
  },
  created: function() {
    window.addEventListener("gamepadconnected", this.gamepadConnectionHandler);
    window.addEventListener(
      "gamepaddisconnected",
      this.gamepadDisconnectionHandler
    );
  },
  methods: {
    gamepadConnectionHandler: function(event) {
      this.gamepads.push(event.gamepad);
      console.log("Gamepad Connected: " + event.gamepad.id);
      this.cycle();
    },
    gamepadDisconnectionHandler: function(event) {
      this.gamepads.splice(this.gamepads.indexOf(event.gamepad), 1);
      console.log("Gamepad Disconnected: " + event.gamepad.id);
      cancelAnimationFrame();
    },
    scanGamepads: function() {
      return navigator.getGamepads
        ? Array.from(navigator.getGamepads()).filter(gp => gp !== null)
        : navigator.webkitGetGamepads
        ? Array.from(navigator.webkitGetGamepads()).filter(gp => gp !== null)
        : [];
    },
    buttonPressed: function(btn) {
      if (typeof btn == "object") {
        return btn.pressed;
      }
      return btn == 1.0;
    },
    cycle: function() {
      this.gamepads = this.scanGamepads();

      var gp = this.gamepads[0];
      if (this.buttonPressed(gp.buttons[0])) {
        this.$store.state.gamepad.A = true;
      } else {
        this.$store.state.gamepad.A = false;
      }
      if (this.buttonPressed(gp.buttons[1])) {
        this.$store.state.gamepad.B = true;
      } else {
        this.$store.state.gamepad.B = false;
      }
      if (this.buttonPressed(gp.buttons[9])) {
        this.$store.state.gamepad.Start = true;
      } else {
        this.$store.state.gamepad.Start = false;
      }
      if (gp.axes[0] == 1) {
        this.$store.state.gamepad.Right = true;
      } else {
        this.$store.state.gamepad.Right = false;
      }
      if (gp.axes[0] == -1) {
        this.$store.state.gamepad.Left = true;
      } else {
        this.$store.state.gamepad.Left = false;
      }
      if (gp.axes[1] == -1) {
        this.$store.state.gamepad.Top = true;
      } else {
        this.$store.state.gamepad.Top = false;
      }
      if (gp.axes[1] == 1) {
        this.$store.state.gamepad.Bottom = true;
      } else {
        this.$store.state.gamepad.Bottom = false;
      }
      requestAnimationFrame(this.cycle);
    }
  }
};
</script>

<style>
@import "./assets/css/all.min.css";

.card.card-rounded {
  border-radius: 20px !important;
  border: none !important;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.06), 0 3px 6px rgba(0, 0, 0, 0.13);
}
</style>
