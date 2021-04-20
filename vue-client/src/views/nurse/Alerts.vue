<template>
  <div id="alerts">
    <Header />
    <div class="container">
      <div class="row">
        <div class="col leftCol">
          <div class="row mt-md-5 pt-md-3 mt-5">
            <div class="col">
              <div class="card shadow">
                <div class="card-body">
                  <div class="card-text">
                    <div class="row">
                      <div class="col ms-2 mt-3">
                        <h5>Alerts List</h5>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col mt-1 mb-2">
                        <div class="table-responsive">
                          <table class="table table-hover">
                            <thead>
                              <tr>
                                <td>Date</td>
                                <td>OHIP ID</td>
                                <td>Name</td>
                                <td>Title</td>
                                <td>Message</td>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="item in alertsList" :key="item.id">
                                <td>
                                  {{ moment(item.added).format("DD-MMM-YYYY") }}
                                </td>
                                <td>
                                  {{ item.patient.ohipId }}
                                </td>
                                <td>
                                  {{ item.patient.fullName }}
                                </td>
                                <td>
                                  {{ item.title }}
                                </td>
                                <td>
                                  {{ item.message }}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Cookies from "vue-cookies";
import Header from "../../components/Header";
import router from "../../router/index";
import Swal from "sweetalert2";

export default {
  name: "Alerts",
  data() {
    return {
      alertsList: [],
    };
  },
  components: {
    Header,
  },
  metaInfo() {
    return {
      title: "Alerts",
    };
  },
  mounted() {
    var check = Cookies.get("screen");
    if (check === "auth") {
      console.log("Sign in again");
      Swal.fire({
        icon: "error",
        title: "Login Again",
        text: `Sorry we don't recognize you.`,
      }).then((res) => {
        if (res) {
          router.replace("/nurseHome");
        }
      });
    } else {
      console.log("Nurse Dashboard is logged in");
      console.log("JWT Payload Username: ", Cookies.get("screen"));
      this.getAlerts();
    }
  },
  methods: {
    getAlerts() {
      let self = this;
      axios
        .get("http://localhost:5000/api/nurses/getPatientAlerts")
        .then(function (res) {
          console.log("Alerts", res.data);
          var list = res.data;
          list.forEach((element) => {
            self.alertsList.push(element);
          });
        })
        .catch(function (err) {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
#alerts {
  background: linear-gradient(
    31.27deg,
    rgba(212, 70, 215, 0.8) 0%,
    rgba(50, 76, 214, 0.8) 100%
  );
  height: 100vh;

  .card {
    border-radius: 16px !important;
    background-color: rgba(255, 255, 255, 1) !important;
  }
}
</style>
