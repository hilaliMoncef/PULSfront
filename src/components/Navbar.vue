<template>
  <div class="dashboard-header">
    <nav class="navbar navbar-expand-lg bg-white fixed-top">
      <router-link class="navbar-brand" to="/">PULS Admin</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse " id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto navbar-right-top">
          <li class="nav-item dropdown notification">
            <a
              class="nav-link nav-icons"
              href="#"
              id="navbarDropdownMenuLink1"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <font-awesome-icon icon="bell"/>
              <span class="indicator ml-1"></span
            ></a>
            <ul class="dropdown-menu dropdown-menu-right notification-dropdown">
              <li>
                <div class="notification-title">Notification</div>
                <div class="notification-list">
                  <div class="list-group">
                    <a
                      href="#"
                      class="list-group-item list-group-item-action active"
                    >
                      <div class="notification-info">
                        <div class="notification-list-user-img">
                          <img
                            src="assets/images/avatar-2.jpg"
                            alt=""
                            class="user-avatar-md rounded-circle"
                          />
                        </div>
                        <div class="notification-list-user-block">
                          <span class="notification-list-user-name"
                            >Jeremy Rakestraw</span
                          >accepted your invitation to join the team.
                          <div class="notification-date">2 min ago</div>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </li>
              <li>
                <div class="list-footer">
                  <a href="#">View all notifications</a>
                </div>
              </li>
            </ul>
          </li>
          <li class="nav-item dropdown nav-user">
            <a
              class="nav-link nav-user-img"
              href="#"
              id="navbarDropdownMenuLink2"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              ><img
                src="@/assets/admin/images/avatar-1.jpg"
                alt=""
                class="user-avatar-md rounded-circle"
            /></a>
            <div
              class="dropdown-menu dropdown-menu-right nav-user-dropdown"
              aria-labelledby="navbarDropdownMenuLink2"
            >
              <div class="nav-user-info">
                <h5 class="mb-0 text-white nav-user-name">Admin</h5>
              </div>
              <a class="dropdown-item" href="#"
                ><font-awesome-icon icon="cog" class="mr-2" />Réglages</a
              >
              <a class="dropdown-item" href="#"
                ><font-awesome-icon
                  icon="power-off"
                  class="mr-2"
                  @click="logout"
                />Déconnexion</a
              >
            </div>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    },
    isAdmin: function() {
      return this.$store.getters.isAdmin;
    },
    isSuperAdmin: function() {
      return this.$store.getters.isSuperAdmin;
    },
    isTerminalOn: function() {
      return this.$store.state.currentTerminal.is_on;
    }
  },
  methods: {
    logout: function() {
      this.$store.dispatch("logout");
      this.$router.push("/login");
    }
  }
};
</script>
