<template>
  <div id="patientDashboard">
    <PatientNavbar />
    <div class="container-fluid">
      <div class="row">
        <!-- Left column -->
        <div class="col-sm-8 col-md-8 offset-md-0 leftCol">
          <div class="row mt-md-5 pt-md-5 pt-sm-3 mb-sm-3 pt-3 pb-3">
            <div class="col mx-3">
              <div class="card shadow">
                <div class="card-body">
                  <div class="card-text">
                    <div class="row mb-md-3 mx-md-5 mx-sm-3 mt-md-4 ml-2 mt-1">
                      <div class="col">
                        <h5>Please select all that apply</h5>
                      </div>
                    </div>
                    <div class="row mb-md-3 mx-md-5 mb-sm-2 mx-sm-2 mx-2">
                      <div class="col">
                        <input type="checkbox" v-model="age" />
                        <label for="checkbox" class="ms-2"
                          >50 years old or older</label
                        >
                      </div>
                    </div>
                    <div class="row mb-md-3 mx-md-5 mb-sm-2 mx-sm-2 mx-2">
                      <div class="col">
                        <input type="checkbox" v-model="cp" />
                        <label for="checkbox" class="ms-2">Chest pain</label>
                      </div>
                    </div>
                    <div class="row mb-md-3 mx-md-5 mb-sm-2 mx-sm-2 mx-2">
                      <div class="col">
                        <input type="checkbox" v-model="fbs" />
                        <label for="checkbox" class="ms-2"
                          >120mg/dl or higher Fasting Blood Sugar</label
                        >
                      </div>
                    </div>
                    <div class="row mb-md-3 mx-md-5 mb-sm-2 mx-sm-2 mx-2">
                      <div class="col">
                        <input type="checkbox" v-model="exang" />
                        <label for="checkbox" class="ms-2"
                          >Angina from exercising</label
                        >
                      </div>
                    </div>
                    <div class="row mb-md-3 mx-md-5 mb-sm-2 mx-sm-2 mx-2">
                      <div class="col">
                        <input type="checkbox" v-model="fatigue" />
                        <label for="checkbox" class="ms-2">Fatigue</label>
                      </div>
                    </div>
                    <div class="row mb-md-3 mx-md-5 mb-sm-2 mx-sm-2 mx-2">
                      <div class="col">
                        <input type="checkbox" v-model="nausea" />
                        <label for="checkbox" class="ms-2">Nausea</label>
                      </div>
                    </div>
                    <div class="row mb-md-3 mx-md-5 mb-sm-2 mx-sm-2 mx-2">
                      <div class="col">
                        <input type="checkbox" v-model="sex" />
                        <label for="checkbox" class="ms-2">Are a Female</label>
                      </div>
                    </div>
                    <div class="row mb-md-3 mx-md-5 mb-sm-2 mx-sm-2 m-2">
                      <div class="col">
                        <input
                          type="number"
                          v-model="trestbps"
                          placeholder="Resting Blood Pressure (mmHG)"
                          class="customInput"
                        />
                      </div>
                    </div>
                    <div class="row mb-md-3 mx-md-5 mb-sm-2 mx-sm-2 m-2">
                      <div class="col">
                        <input
                          type="number"
                          v-model="chol"
                          placeholder="Serum Cholestrol (mg/dl)"
                          class="customInput"
                        />
                      </div>
                    </div>
                    <div class="row mb-md-3 mx-md-5 mb-sm-2 mx-sm-2 m-2">
                      <div class="col">
                        <input
                          type="number"
                          v-model="thalach"
                          placeholder="Highest Heart Rate"
                          class="customInput"
                        />
                      </div>
                    </div>
                    <div class="row mb-md-4 mx-md-5 mb-sm-2 mx-sm-2 m-2">
                      <div class="col text-center">
                        <button
                          class="btn btn-dark btn-block checkBtn"
                          v-on:click="checkSymptoms()"
                        >
                          Check Symptoms
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Right Column -->
        <div class="col-4 rightCol">
          <div class="row mt-4 mx-2 rightRow">
            <div class="col text-center">
              <button
                class="otherBtn btn-block py-3"
                v-on:click="dailyInfoLog()"
              >
                Daily Info
              </button>
            </div>
          </div>
          <div class="row mt-4 mx-2">
            <div class="col text-center">
              <button
                class="otherBtn btn-block py-3"
                v-on:click="createAlert()"
              >
                Alerts
              </button>
            </div>
          </div>
          <div class="row mt-4 mx-2">
            <div class="col text-center">
              <button class="otherBtn btn-block py-3" v-on:click="motivation()">
                Motivation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PatientNavbar from "../../components/PatientNavbar";
import Cookies from "vue-cookies";
import router from "../../router/index";
import Swal from "sweetalert2";
import axios from "axios";

export default {
  name: "PatientDashboard",
  data() {
    return {
      cookie: "",
      age: "",
      sex: "",
      cp: "",
      trestbps: "",
      chol: "",
      fbs: "",
      thalach: "",
      exang: "",
      fatigue: "",
      nausea: "",
      alert: [{ title: "" }, { message: "" }],
    };
  },
  components: {
    PatientNavbar,
  },
  metaInfo() {
    return {
      title: "Patient Dashboard",
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
          router.replace("/patientHome");
        }
      });
    } else {
      console.log("Patient Dashboard is logged in");
      console.log("JWT Payload Username:", Cookies.get("screen"));
      this.cookie = check;
    }
  },
  methods: {
    checkSymptoms() {
      let self = this;

      Swal.fire({
        icon: "info",
        title: "Please hold on while we obtain your results",
      }).then(function (response) {
        if (response) {
          runCheck;
        }
      });
      var runCheck = axios
        .post("http://localhost:5000/api/patient/checkSymptoms", {
          age: self.age,
          cp: self.cp,
          sex: self.sex,
          trestbps: self.trestbps,
          chol: self.chol,
          fbs: self.fbs,
          thalach: self.thalach,
          exang: self.exang,
        })
        .then(function (res) {
          console.log(res);
          // var possibilityNumber = Math.round(res.data.possibility * 100) / 100;
          var possibility = "Possibility: " + res.data.possibility;
          var message = res.data.message;
          Swal.fire({
            icon: "info",
            title: "Your Result",
            text: possibility + " - " + message,
          });
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    dailyInfoLog() {
      router.replace("/patientDailyInfo");
    },
    createAlert() {
      let self = this;
      Swal.fire({
        title: "Send Nurse an Alert",
        html: `<input type="text" id="alertTitle" class="swal2-input" placeholder="Title" >
          <textarea rows="2" type="text" id="alertMessage" class="swal2-input" placeholder="Message"></textarea> `,
        confirmButtonText: "Send",
        focusConfirm: false,
        preConfirm: () => {
          const title = Swal.getPopup().querySelector("#alertTitle").value;
          const message = Swal.getPopup().querySelector("#alertMessage").value;
          if (!title || !message) {
            Swal.showValidationMessage(`Please enter Title and Message`);
          }
          return { title: title, message: message };
        },
      }).then((result) => {
        console.log(result);
        console.log(result.value);
        self.alert.title = result.value.title;
        self.alert.message = result.value.message;
        axios
          .post("http://localhost:5000/api/patient/patientalerts", {
            ohipId: self.cookie,
            title: self.alert.title,
            message: self.alert.message,
          })
          .then(function (res) {
            console.log(res);
            console.log("Alert sent");
            Swal.fire({
              icon: "success",
              title: "Alert Sent!",
            });
          })
          .catch(function (err) {
            console.log(err);
          });
      });
    },
    motivation() {
      router.replace("/patientMotivation");
    },
  },
};
</script>

<style lang="scss" scoped>
#patientDashboard {
  @media (max-width: 767.98px) {
    .leftCol {
      background: linear-gradient(
        31.27deg,
        rgba(212, 70, 215, 0.8) 0%,
        rgba(50, 76, 214, 0.8) 100%
      );
      width: 100%;
    }
    .rightCol {
      background: white !important;
      width: 100%;
    }
  }

  @media (min-width: 768px) {
    .leftCol {
      height: 94vh !important;
      background: linear-gradient(
        31.27deg,
        rgba(212, 70, 215, 0.8) 0%,
        rgba(50, 76, 214, 0.8) 100%
      );
    }
    .rightRow {
      padding-top: 60% !important;
    }

    .rightCol {
      background: #f4f3f3 !important;
    }
  }

  .otherBtn {
    border: none;
    outline: none;
    background: linear-gradient(90deg, #e15bed 0%, #9e00ff 100%);
    border-radius: 50px !important;
    color: white;
    font-weight: 600;
  }

  .card {
    border-radius: 16px;
    background-color: rgba(255, 255, 255, 1);

    .customInput {
      background-color: rgba(235, 235, 235, 0.63);
      border-radius: 20px;
      border: none;
      padding: 8px 10px;
      outline: none;
      width: 100%;
      text-indent: 10px;
    }

    ::placeholder {
      /* Chrome, Firefox, Opera, Safari 10.1+ */
      text-indent: 10px;
      opacity: 1; /* Firefox */
      font-weight: 400;
      line-height: 29px;
      color: #bd00ff;
    }

    input:focus,
    input:active {
      text-indent: 10px;
    }

    :-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      text-indent: 10px;
      opacity: 1; /* Firefox */
      font-weight: 400;
      line-height: 29px;
      color: #bd00ff;
    }

    ::-ms-input-placeholder {
      /* Microsoft Edge */
      text-indent: 10px;
      opacity: 1; /* Firefox */
      font-weight: 400;
      line-height: 29px;
      color: #bd00ff;
    }

    .checkBtn {
      background: linear-gradient(90deg, #e15bed 0%, #9e00ff 100%);
    }

    .btn {
      box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
      border-radius: 25px;
      font-size: 15px;
      font-weight: 500;
    }
  }
}
</style>
