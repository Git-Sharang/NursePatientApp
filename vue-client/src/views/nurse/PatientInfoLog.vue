<template>
  <div id="patientInfoLog">
    <Header />
    <div class="container-fluid">
      <div class="row mt-5">
        <div class="col-10 offset-1">
          <div class="card">
            <div class="card-body">
              <div class="card-text">
                <div class="row">
                  <h5 class="col ms-2 mt-3">List of Patients</h5>
                </div>
                <div class="row">
                  <div class="col mt-1 mb-2">
                    <table class="table table-hover">
                      <thead>
                        <tr>
                          <th>OHIP ID</th>
                          <th>Name</th>
                          <th>Phone #</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in patientList" :key="item.id">
                          <td v-for="data in item" :key="data.id">
                            {{ data.ohipId }}
                          </td>
                          <td v-for="data in item" :key="data.id">
                            {{ data.fullName }}
                          </td>
                          <td v-for="data in item" :key="data.id">
                            {{ data.phoneNumber }}
                          </td>
                          <td v-for="data in item" :key="data.id">
                            <button
                              class="btn btn-secondary btn-sm"
                              v-on:click="dailyLog(data)"
                            >
                              View
                            </button>
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
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "vue-cookies";
import router from "../../router/index";
import Header from "../../components/Header";

export default {
  name: "PatientInfoLog",
  data() {
    return {
      patientList: [],
      cookie: "",
    };
  },
  metaInfo() {
    return {
      title: "Patient Log",
    };
  },
  components: {
    Header,
  },
  mounted() {
    var check = Cookies.get("screen");
    if (check === "auth") {
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
      this.listOfPatients();
    }
  },
  methods: {
    listOfPatients() {
      var self = this;
      axios
        .get("http://localhost:5000/api/nurses/allPatients")
        .then(function (res) {
          console.log("All Patients:", res.data);
          var list = res.data;
          self.patientList.push(list);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    dailyLog(data) {
      var id = data.id;
      console.log("Passing id:", data.id);
      router.replace("/dailyPatientInfo/" + id);
    },
  },
};
</script>

<style lang="scss" scoped>
#patientInfoLog {
  background: linear-gradient(180.51deg, #9346e0 0.73%, #e357c5 99.56%);
  height: 100vh;

  .card {
    background: rgba(255, 255, 255, 0.5);
    border-radius: 30px;
    box-shadow: 0 25px 50px rgba (0, 0, 0, 0.1) !important;

    thead,
    tbody {
      border: none;
    }
  }
}
</style>
