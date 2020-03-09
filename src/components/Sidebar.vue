<template>
  <div class="nav-left-sidebar sidebar-dark">
    <div class="menu-list">
      <nav class="navbar navbar-expand-lg navbar-light">
        <a class="d-xl-none d-lg-none" href="#">Dashboard</a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav flex-column">
            <li class="nav-divider">
              Menu
            </li>
            <li class="nav-item">
              <router-link exact class="nav-link" to="/">
                <font-awesome-icon
                  icon="rocket"
                  class="mr-2"
                />Dashboard</router-link
              >
            </li>

            <li class="nav-item">
              <router-link
                to="/terminals"
                exact
                :event="''"
                class="nav-link first"
                href="#"
                data-toggle="collapse"
                aria-expanded="false"
                data-target="#submenu-terminals"
                aria-controls="submenu-terminals"
                ><font-awesome-icon icon="user" class="mr-2" />
                Terminaux</router-link
              >
              <div id="submenu-terminals" class="collapse submenu" style="">
                <ul class="nav flex-column">
                  <li class="nav-item">
                    <router-link class="nav-link" to="/terminals"
                      >Tous les terminaux</router-link
                    >
                  </li>
                  <li class="nav-item">
                    <router-link class="nav-link" :to="{ name: 'addTerminal' }"
                      >Ajouter un terminal</router-link
                    >
                  </li>
                </ul>
              </div>
            </li>

            <li class="nav-item">
              <a
                to="/campaigns"
                class="nav-link first"
                exact
                :event="''"
                href="#"
                data-toggle="collapse"
                aria-expanded="false"
                data-target="#submenu-campaigns"
                aria-controls="submenu-campaigns"
                ><font-awesome-icon icon="file" class="mr-2" /> Campagnes</a
              >
              <div id="submenu-campaigns" class="collapse submenu" style="">
                <ul class="nav flex-column">
                  <li class="nav-item">
                    <router-link class="nav-link" to="/campaigns"
                      >Toutes les campagnes</router-link
                    >
                  </li>
                  <li class="nav-item">
                    <router-link class="nav-link" :to="{ name: 'addCampaign' }"
                      >Ajouter une campagne</router-link
                    >
                  </li>
                </ul>
              </div>
            </li>

            <li class="nav-item">
              <a
                class="nav-link first"
                exact
                :event="''"
                href="#"
                data-toggle="collapse"
                aria-expanded="false"
                data-target="#submenu-games"
                aria-controls="submenu-games"
                ><font-awesome-icon icon="gamepad" class="mr-2" /> Jeux</a
              >
              <div id="submenu-games" class="collapse submenu" style="">
                <ul class="nav flex-column">
                  <li class="nav-item">
                    <a class="nav-link" href="pages/cards.html"
                      >Tous les jeux</a
                    >
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="pages/general.html"
                      >Ajouter un jeu</a
                    >
                  </li>
                </ul>
              </div>
            </li>

            <li class="nav-divider">
              Gestion
            </li>

            <li class="nav-item">
              <a
                class="nav-link first"
                exact
                :event="''"
                href="#"
                data-toggle="collapse"
                aria-expanded="false"
                data-target="#submenu-clients"
                aria-controls="submenu-clients"
                ><font-awesome-icon icon="columns" class="mr-2" /> Clients</a
              >
              <div id="submenu-clients" class="collapse submenu" style="">
                <ul class="nav flex-column">
                  <li class="nav-item">
                    <a class="nav-link" href="pages/cards.html"
                      >Tous les clients</a
                    >
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="pages/general.html"
                      >Ajouter un client</a
                    >
                  </li>
                </ul>
              </div>
            </li>

            <li class="nav-item">
              <router-link to="/" exact class="nav-link first" href="#"
                ><font-awesome-icon icon="wallet" class="mr-2" />
                Donateurs</router-link
              >
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sidebar"
};
</script>
