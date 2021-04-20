<template>
  <div id="header">
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <!-- Container wrapper -->
      <div class="container-fluid">
        <!-- Navbar brand -->
        <a class="navbar-brand" href="#">Group 4</a>

        <!-- Toggle button -->
        <button
          class="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i class="fas fa-bars"></i>
        </button>

        <!-- Collapsible wrapper -->
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <!-- Left links -->
          <ul class="navbar-nav mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" aria-current="page"
                ><router-link to="/nurseDashboard">{{
                  linkvalue
                }}</router-link></a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" aria-current="page"
                ><router-link to="/nurseAlerts">{{ alerts }}</router-link></a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" aria-current="page"
                ><router-link to="/createMotivation">{{
                  motivation
                }}</router-link></a
              >
            </li>
          </ul>
          <!-- Left links -->

          <div class="d-flex input-group w-auto ms-auto">
            <button
              class="btn btn-outline-secondary"
              type="button"
              data-mdb-ripple-color="dark"
              v-on:click="signOut()"
            >
              {{ buttonvalue }}
            </button>
          </div>
        </div>
        <!-- Collapsible wrapper -->
      </div>
      <!-- Container wrapper -->
    </nav>
    <!-- Navbar -->
  </div>
</template>

<script>
import axios from "axios";
import Cookies from "vue-cookies";
import router from "../router/index";
export default {
  name: "Header",
  data() {
    return {
      linkvalue: "Home",
      alerts: "Alerts",
      motivation: "Motivation",
      buttonvalue: "Sign Out",
      username: "",
    };
  },
  mounted() {
    var check = Cookies.get("screen");
    if (check === "auth") {
      console.log("Sign in again");
      this.buttonvalue = "Sign In";
      this.linkvalue = "";
      this.alerts = "";
      this.motivation = "";
    } else {
      console.log("Navbar currently signed in");
      this.username = check;
    }
  },

  methods: {
    signOut() {
      axios
        .get("http://localhost:5000/api/nurse/signout")
        .then(function (res) {
          console.log(res);
          Cookies.set("screen", "auth");
          router.replace("/");
        })
        .catch(function (err) {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
#header {
  .btn {
    border-radius: 16px !important;
    &:hover {
      background-color: purple;
      color: white;
    }
  }
}
</style>
