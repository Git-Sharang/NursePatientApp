<template>
  <div id="nurseDashboard">
    <Header />
    <div class="container-fluid">
      <div class="row">
        <div class="col-10 offset-1">
          <div class="row mt-sm-3 mt-md-4 mt-lg-5">
            <div class="col mx-2">
              <div class="card shadow">
                <div class="card-body">
                  <div class="card-text py-2">
                    <div class="row">
                      <div class="col-md-7 ms-1 my-2">
                        <h5>Update Patient Info</h5>
                      </div>
                      <div class="col text-end">
                        <div class="input-group">
                          <div class="form-outline">
                            <input
                              type="search"
                              class="form-control custominput"
                              v-model="search"
                            />
                            <label class="form-label">Search ID</label>
                          </div>
                          <button
                            class="btn btn-primary"
                            v-on:click="searchPatient()"
                          >
                            <i class="fas fa-search"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col">
                        <div class="table-responsive">
                          <table class="table table-hover">
                            <thead>
                              <tr>
                                <td>OHIP ID</td>
                                <td>Name</td>
                                <td>Phone #</td>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="item in patientList" :key="item.id">
                                <td>
                                  {{ item.ohipId }}
                                </td>
                                <td>
                                  {{ item.fullName }}
                                </td>
                                <td>
                                  {{ item.phoneNumber }}
                                </td>
                                <td>
                                  <button
                                    class="btn btn-secondary btn-sm"
                                    v-on:click="detailedInfo(item)"
                                  >
                                    View
                                  </button>
                                  <button
                                    class="btn btn-secondary btn-sm ms-md-2 mt-sm-2"
                                    v-on:click="infoLog(item)"
                                  >
                                    Daily Log
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
import _ from "lodash";

export default {
  name: "NurseDashboard",
  data() {
    return {
      patientList: [],
      cookie: "",
      search: "",
    };
  },
  components: {
    Header,
  },
  metaInfo() {
    return {
      title: "Hello " + this.cookie,
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
      this.cookie = check;
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
          list.forEach((element) => {
            self.patientList.push(element);
          });
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    searchPatient() {
      if (_.isEmpty(this.search) && this.patientList.length) {
        // this.listOfPatients();
        console.log("OHIP Id not entered");
        this.patientList = [];
        this.listOfPatients();
      } else {
        var id = this.search;
        var list = this.patientList;
        console.log("check:", id);
        console.log("patient list:", list);
        var check = list.find((c) => c.ohipId === id);
        console.log(check);

        this.patientList = [];
        check = this.patientList.push(check);
      }
    },
    detailedInfo(data) {
      var id = data.id;
      console.log("Passing id:", data.id);
      router.replace("/patientInfo/" + id);
    },
    infoLog(data) {
      var id = data.id;
      console.log("Passing id:", data.id);
      router.replace("/dailyPatientInfo/" + id);
    },
    patientInfoLog() {
      router.replace("/patientInfoLog");
    },
    getAlerts() {
      router.replace("/nurseAlerts");
    },
    createMotivation() {
      router.replace("/createMotivation");
    },
  },
};
</script>

<style lang="scss" scoped>
#nurseDashboard {
  height: 100vh !important;
  background: linear-gradient(
    31.27deg,
    rgba(212, 70, 215, 0.8) 0%,
    rgba(50, 76, 214, 0.8) 100%
  );

  .card {
    border-radius: 16px;
    background-color: rgba(255, 255, 255, 1);

    .custominput {
      border: 1px solid rgba(0, 0, 0, 0.05);
      &:focus {
        border: none;
      }
    }
  }
}
</style>
