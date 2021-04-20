<template>
  <div id="patientInfo">
    <Header />
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12 col-md-6 offset-md-3 mt-5">
          <div class="card">
            <div class="card-body">
              <div class="card-text">
                <div class="row">
                  <h5 class="col mt-3 ms-3 text-center">
                    Patient Name: {{ patientName }}
                  </h5>
                </div>
                <div v-for="item in info" :key="item.id">
                  <div class="row">
                    <div class="col">
                      <div class="row mb-3 mx-5 mt-3 pt-1">
                        <div
                          class="col-3 d-flex align-items-center justify-content-end"
                        >
                          <label class="labelText">Pulse Rate</label>
                        </div>
                        <div class="col">
                          <input
                            type="text"
                            class="customInput"
                            id="pr"
                            name="pr"
                            :placeholder="currentinfo.pulseRate"
                            v-model="updateinfo.pulseRate"
                          />
                        </div>
                      </div>
                      <div class="row mb-3 mx-5 mt-4">
                        <div
                          class="col-3 d-flex align-items-center justify-content-end"
                        >
                          <label class="labelText">Blood Pressure</label>
                        </div>
                        <div class="col">
                          <input
                            type="text"
                            class="customInput"
                            id="bp"
                            name="bp"
                            :placeholder="currentinfo.bloodPressure"
                            v-model="updateinfo.bloodPressure"
                          />
                        </div>
                      </div>
                      <div class="row mb-3 mx-5 mt-4">
                        <div
                          class="col-3 d-flex align-items-center justify-content-end"
                        >
                          <label class="labelText">Weight</label>
                        </div>
                        <div class="col">
                          <input
                            type="text"
                            class="customInput"
                            id="w"
                            name="w"
                            :placeholder="currentinfo.weight"
                            v-model="updateinfo.weight"
                          />
                        </div>
                      </div>
                      <div class="row mb-3 mx-5 mt-4">
                        <div
                          class="col-3 d-flex align-items-center justify-content-end"
                        >
                          <label class="labelText">Body Temp</label>
                        </div>
                        <div class="col">
                          <input
                            type="text"
                            class="customInput"
                            id="bt"
                            name="bt"
                            :placeholder="currentinfo.bodyTemperature"
                            v-model="updateinfo.bodyTemperature"
                          />
                        </div>
                      </div>
                      <div class="row mb-2 mx-5 mt-4">
                        <div
                          class="col-3 d-flex align-items-center justify-content-end"
                        >
                          <label class="labelText">Resp Rate</label>
                        </div>
                        <div class="col">
                          <input
                            type="text"
                            class="customInput"
                            id="rr"
                            name="rr"
                            :placeholder="currentinfo.respiratoryRate"
                            v-model="updateinfo.respiratoryRate"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row mb-4 mx-5 mt-5 px-3 text-center">
                    <div class="col text-center">
                      <button
                        class="btn btn-light btn-block checkBtn text-white"
                        v-on:click="update()"
                      >
                        Update
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
  </div>
</template>

<script>
import router from "../../router/index";
import Swal from "sweetalert2";
import Cookies from "vue-cookies";
import axios from "axios";
import Header from "../../components/Header.vue";

export default {
  name: "PatientInfo",
  data() {
    return {
      patientId: "",
      patientName: "",
      info: [],
      updateinfo: [
        { pulseRate: "" },
        { bloodPressure: "" },
        { weight: "" },
        { bodyTemperature: "" },
        { respiratoryRate: "" },
      ],
      currentinfo: [
        { pulseRate: "" },
        { bloodPressure: "" },
        { weight: "" },
        { bodyTemperature: "" },
        { respiratoryRate: "" },
      ],
    };
  },
  metaInfo() {
    return {
      title: "Patient Info",
    };
  },
  components: {
    Header,
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
      this.loadPatientInfo();
    }
  },
  methods: {
    loadPatientInfo() {
      console.log("Patient ID:", this.patientId);
      let self = this;
      axios
        .get("http://localhost:5000/api/nurses/patientInfo/" + self.patientId)
        .then(function (res) {
          console.log("Patient Info:", res.data);
          self.info.push(res.data);
          self.patientName = res.data.patient.fullName;
          self.currentinfo.pulseRate = res.data.pulseRate;
          self.currentinfo.bloodPressure = res.data.bloodPressure;
          self.currentinfo.weight = res.data.weight;
          self.currentinfo.bodyTemperature = res.data.bodyTemperature;
          self.currentinfo.respiratoryRate = res.data.respiratoryRate;
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    update() {
      var newPulseRate = "";
      var currentPulseRate = this.currentinfo.pulseRate;
      var updatedPulseRate = this.updateinfo.pulseRate;
      if (Object.is(updatedPulseRate, undefined)) {
        newPulseRate = currentPulseRate;
      } else {
        newPulseRate = updatedPulseRate;
      }

      var newBloodPressure = "";
      var currentBP = this.currentinfo.bloodPressure;
      var updatedBP = this.updateinfo.bloodPressure;
      if (Object.is(updatedBP, undefined)) {
        newBloodPressure = currentBP;
      } else {
        newBloodPressure = updatedBP;
      }

      var newWeight = "";
      var currentWeight = this.currentinfo.weight;
      var updatedWeight = this.updateinfo.weight;
      if (Object.is(updatedBP, undefined)) {
        newWeight = currentWeight;
      } else {
        newWeight = updatedWeight;
      }

      var newBodyTemp = "";
      var currentBT = this.currentinfo.bodyTemperature;
      var updatedBT = this.updateinfo.bodyTemperature;
      if (Object.is(updatedBT, undefined)) {
        newBodyTemp = currentBT;
      } else {
        newBodyTemp = updatedBT;
      }

      var newRespRate = "";
      var currentRR = this.currentinfo.respiratoryRate;
      var updatedRR = this.updateinfo.respiratoryRate;
      if (Object.is(updatedRR, undefined)) {
        newRespRate = currentRR;
      } else {
        newRespRate = updatedRR;
      }

      let self = this;
      axios
        .put("http://localhost:5000/api/nurses/patientInfo/" + self.patientId, {
          pulseRate: newPulseRate,
          bloodPressure: newBloodPressure,
          weight: newWeight,
          bodyTemperature: newBodyTemp,
          respiratoryRate: newRespRate,
        })
        .then(function (res) {
          console.log(res.data);
          console.log("Patient info has been updated.");
          router.replace("/nurseDashboard");
        })
        .catch(function (err) {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
#patientInfo {
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
