<template>
  <div id="dailyPatientInfo">
    <Header />
    <div class="container-fluid">
      <div class="row mt-5">
        <div class="col-10 offset-1 mt-5">
          <div class="card">
            <div class="card-body">
              <div class="card-text">
                <div class="row">
                  <div class="col-6 ps-3 mt-4">
                    <h5 class="patientNameEffect">
                      {{ patientTitle }} {{ patientName }}
                    </h5>
                  </div>
                </div>
                <div class="row">
                  <div class="col mt-1 mb-3 mx-1">
                    <table class="table table-hover">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Pulse</th>
                          <th>B.P.</th>
                          <th>Body Temp</th>
                          <th>Resp Rate</th>
                          <th>Weight</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in info" :key="item.id">
                          <td>
                            {{
                              moment(item.added).format("DD-MMM-YYYY hh:mm A")
                            }}
                          </td>
                          <td>
                            {{ item.pulseRate }}
                          </td>
                          <td>
                            {{ item.bloodPressure }}
                          </td>
                          <td>
                            {{ item.bodyTemperature }}
                          </td>
                          <td>
                            {{ item.respiratoryRate }}
                          </td>
                          <td>{{ item.weight }}</td>
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
</template>

<script>
import router from "../../router/index";
import Swal from "sweetalert2";
import Cookies from "vue-cookies";
import axios from "axios";
import Header from "../../components/Header.vue";

export default {
  name: "DailyPatientInfo",
  data() {
    return {
      patientId: "",
      patientTitle: "Patient Name:",
      patientName: "",
      info: [],
    };
  },
  components: {
    Header,
  },
  metaInfo() {
    return {
      title: "Daily Patient Info",
    };
  },
  mounted() {
    this.patientId = this.$route.params.id;
    var isLoggedIn = Cookies.get("screen");
    if (isLoggedIn === "auth") {
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
      this.dailyLog();
    }
  },
  methods: {
    dailyLog() {
      console.log("Patient ID:", this.patientId);
      let self = this;
      axios
        .get(
          "http://localhost:5000/api/nurses/dailyPatientInfo/" + self.patientId
        )
        .then(function (res) {
          console.log(res.data);
          var list = res.data;
          if (list.length === 0) {
            self.patientTitle = "";
            self.patientName = "No Daily Log";
          } else {
            list.forEach((element) => {
              self.info.push(element);
            });
            self.patientName = res.data[0].patient.fullName;
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
$animate: all 0.2s ease-in-out;

#dailyPatientInfo {
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
