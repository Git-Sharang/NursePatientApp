<template>
  <div id="patientStepTwoSignUp">
    <PatientNavbar />
    <div class="container-fluid">
      <div class="row">
        <div class="col mt-5 pt-4 text-center">
          <h1 class="text-white">Step Two</h1>
        </div>
      </div>
      <div class="row">
        <div class="col mt-2 text-center">
          <p class="subtext text-white">Connected Care For You</p>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12 col-md-8 offset-md-2 mt-5">
          <div class="card">
            <div class="card-body">
              <div class="card-text">
                <div class="row mb-3 mx-5 mt-4">
                  <div class="col text-center">
                    <input
                      class="customInput"
                      type="text"
                      v-model="info.pulseRate"
                      placeholder="Pulse Rate"
                    />
                  </div>
                </div>
                <div class="row mb-3 mx-5 mt-4">
                  <div class="col text-center">
                    <input
                      class="customInput"
                      placeholder="Blood Pressure"
                      type="text"
                      v-model="info.bloodPressure"
                    />
                  </div>
                </div>
                <div class="row mb-3 mx-5 mt-4">
                  <div class="col text-center">
                    <input
                      type="text"
                      class="customInput"
                      v-model="info.weight"
                      placeholder="Weight"
                    />
                  </div>
                </div>
                <div class="row mb-3 mx-5 mt-4">
                  <div class="col text-center">
                    <input
                      type="text"
                      class="customInput"
                      v-model="info.bodyTemperature"
                      placeholder="Body Temperature"
                    />
                  </div>
                </div>
                <div class="row mb-3 mx-5 mt-4">
                  <div class="col text-center">
                    <input
                      type="text"
                      class="customInput"
                      v-model="info.respiratoryRate"
                      placeholder="Respiratory Rate"
                    />
                  </div>
                </div>
                <div class="row mb-4 mx-5 mt-5">
                  <div class="col text-center">
                    <button
                      class="btn btn-light btn-block"
                      v-on:click="addInfo()"
                    >
                      Add
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
  name: "PatientStepTwoSignUp",
  data() {
    return {
      cookie: "",
      ohipId: "",
      info: [
        { pulseRate: "" },
        { bloodPressure: "" },
        { weight: "" },
        { bodyTemperature: "" },
        { respiratoryRate: "" },
      ],
    };
  },
  components: {
    PatientNavbar,
  },
  metaInfo() {
    return {
      title: "Sign Up - Step Two",
    };
  },
  mounted() {
    this.ohipId = this.$route.params.id;
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
      console.log("Patient step two is logged in");
      console.log("JWT Payload Username: ", Cookies.get("screen"));
      this.cookie = check;
    }
  },
  methods: {
    addInfo() {
      let self = this;
      axios
        .post("http://localhost:5000/api/patient/patientInfo", {
          ohipId: self.ohipId,
          pulseRate: self.info.pulseRate,
          bloodPressure: self.info.bloodPressure,
          weight: self.info.weight,
          bodyTemperature: self.info.bodyTemperature,
          respiratoryRate: self.info.respiratoryRate,
        })
        .then(function (res) {
          console.log(res.data);
          router.replace("/patientDashboard");
        })
        .catch(function (err) {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
#patientStepTwoSignUp {
  background: linear-gradient(180.51deg, #9346e0 0.73%, #e357c5 99.56%);
  height: 100vh;

  .subtext {
    font-size: 18px;
    opacity: 0.8;
  }

  .card {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 24px;
    box-shadow: 0 25px 50px rgba (0, 0, 0, 0.1) !important;

    .customInput {
      background: #ffffff70;
      border-radius: 20px;
      border: none;
      padding: 8px 10px;
      outline: none;
      width: 100%;
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

    .btn {
      box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
      border-radius: 25px;
      font-size: 16px;
      font-weight: 500;
    }

    .changeText {
      cursor: pointer;
      font-weight: 500;
      padding: 5px 0;

      &:hover {
        background-color: rgba(0, 0, 0, 0.1);
        border-radius: 30px;
        color: white !important;
      }
    }
  }
}
</style>
