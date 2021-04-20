<template>
  <div id="patientDailyInfo">
    <PatientNavbar />
    <div class="container-fluid">
      <div class="row mt-md-5 mt-3 pt-md-5 pt-2">
        <div class="col-md-8 offset-md-2">
          <div class="card">
            <div class="card-body">
              <div class="card-text pt-1">
                <div class="row">
                  <h5 class="col mt-2 ms-md-5 ps-md-4 ms-2 ps-2 text-black">
                    Enter Daily Information
                  </h5>
                </div>
                <div class="row mb-md-3 mb-1 mx-md-5 mt-md-4 mx-1 mt-2">
                  <div class="col text-center">
                    <input
                      class="customInput"
                      type="number"
                      v-model="pulseRate"
                      placeholder="Pulse Rate"
                    />
                  </div>
                </div>
                <div class="row mb-md-3 mb-1 mx-md-5 mt-md-4 mx-1 mt-2">
                  <div class="col text-center">
                    <input
                      class="customInput"
                      placeholder="Blood Pressure"
                      type="text"
                      v-model="bloodPressure"
                    />
                  </div>
                </div>
                <div class="row mb-md-3 mb-1 mx-md-5 mt-md-4 mx-1 mt-2">
                  <div class="col text-center">
                    <input
                      type="text"
                      class="customInput"
                      v-model="weight"
                      placeholder="Weight"
                    />
                  </div>
                </div>
                <div class="row mb-md-3 mb-1 mx-md-5 mt-md-4 mx-1 mt-2">
                  <div class="col text-center">
                    <input
                      type="number"
                      class="customInput"
                      v-model="bodyTemperature"
                      placeholder="Body Temperature"
                    />
                  </div>
                </div>
                <div class="row mb-md-3 mb-1 mx-md-5 mt-md-4 mx-1 mt-2">
                  <div class="col text-center">
                    <input
                      type="number"
                      class="customInput"
                      v-model="respiratoryRate"
                      placeholder="Respiratory Rate"
                    />
                  </div>
                </div>
                <div class="row mb-md-3 mb-2 mx-md-5 mt-md-4 mx-1 mt-3">
                  <div class="col text-center">
                    <button
                      class="btn btn-primary btn-block checkBtn"
                      v-on:click="sendInfo()"
                    >
                      Submit
                    </button>
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
import PatientNavbar from "../../components/PatientNavbar";
import Cookies from "vue-cookies";
import axios from "axios";
import router from "../../router/index";
import Swal from "sweetalert2";

export default {
  name: "PatientDailyInfo",
  data() {
    return {
      ohipId: "",
      pulseRate: "",
      bloodPressure: "",
      weight: "",
      bodyTemperature: "",
      respiratoryRate: "",
    };
  },
  components: {
    PatientNavbar,
  },
  metaInfo() {
    return {
      title: "Daily Information",
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
      this.ohipId = check;
    }
  },
  methods: {
    sendInfo() {
      if (
        this.pulse === "" ||
        this.bloodPressure === "" ||
        this.weight === "" ||
        this.bodyTemperature === "" ||
        this.respiratoryRate === ""
      ) {
        Swal.fire({
          icon: "error",
          title: "All fields are required.",
        });
      } else {
        let self = this;
        axios
          .post("http://localhost:5000/api/patient/patientdailyinfo", {
            ohipId: self.ohipId,
            pulseRate: self.pulseRate,
            bloodPressure: self.bloodPressure,
            weight: self.weight,
            bodyTemperature: self.bodyTemperature,
            respiratoryRate: self.respiratoryRate,
          })
          .then(function (res) {
            console.log(res);
            router.replace("/patientDashboard");
          })
          .catch(function (err) {
            console.log(err);
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#patientDailyInfo {
  height: 100vh !important;
  background: linear-gradient(
    31.27deg,
    rgba(212, 70, 215, 0.8) 0%,
    rgba(50, 76, 214, 0.8) 100%
  );

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
