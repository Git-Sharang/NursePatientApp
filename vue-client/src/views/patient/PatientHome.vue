<template>
  <div id="patientHome">
    <div class="container-fluid" v-if="displayLogin">
      <div class="row">
        <div class="col mt-5 pt-4 text-center">
          <h1 class="text-white">Login</h1>
        </div>
      </div>
      <div class="row">
        <div class="col mt-2 text-center">
          <p class="subtext text-white">Connected Care For You</p>
        </div>
      </div>
      <div class="row">
        <div
          class="col-sm-10 offset-sm-1 col-md-8 col-lg-6 col-xl-4 offset-md-2 offset-lg-3 offset-xl-4 mt-5"
        >
          <div class="card">
            <div class="card-body">
              <div class="card-text">
                <div class="row mb-3 mx-5 mt-5 pt-1">
                  <div class="col text-center">
                    <input
                      type="text"
                      class="customInput"
                      id="username"
                      name="username"
                      v-model="auth.ohipId"
                      placeholder="OHIP ID"
                    />
                  </div>
                </div>
                <div class="row mb-3 mx-5 mt-4">
                  <div class="col text-center">
                    <input
                      type="password"
                      class="customInput"
                      id="password"
                      name="password"
                      v-model="auth.password"
                      placeholder="Password"
                    />
                  </div>
                </div>
                <div class="row mb-3 mx-5 mt-5">
                  <div class="col text-center">
                    <button
                      class="btn btn-light btn-block"
                      v-on:click="loginPatient()"
                    >
                      Login
                    </button>
                  </div>
                </div>
                <div class="row mb-4 mx-5 mt-3">
                  <div class="col text-center">
                    <a
                      class="text-secondary changeText btn-block"
                      v-on:click="displayLogin = false"
                      >Register Here!</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid" v-else-if="!displayLogin">
      <div class="row">
        <div class="col mt-5 pt-4 text-center">
          <h1 class="text-white">Sign Up</h1>
        </div>
      </div>
      <div class="row">
        <div class="col mt-2 text-center">
          <p class="subtext text-white">Connected Care For You</p>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-10 offset-sm-1 col-md-6 offset-md-3 mt-5">
          <div class="card">
            <div class="card-body">
              <div class="card-text">
                <div class="row mb-3 mx-3 mt-5">
                  <div class="col text-center">
                    <input
                      class="customInput"
                      type="text"
                      v-model="firstName"
                      placeholder="First Name"
                    />
                  </div>
                  <div class="col text-center">
                    <input
                      class="customInput"
                      placeholder="Last Name"
                      type="text"
                      v-model="lastName"
                    />
                  </div>
                </div>
                <div class="row mb-3 mx-3 mt-4">
                  <div class="col text-center">
                    <input
                      type="text"
                      class="customInput"
                      v-model="email"
                      placeholder="Email"
                    />
                  </div>
                  <div class="col text-center">
                    <input
                      type="text"
                      class="customInput"
                      v-model="ohipId"
                      placeholder="OHIP ID"
                    />
                  </div>
                </div>
                <div class="row mb-3 mx-3 mt-4">
                  <div class="col pe-0">
                    <input
                      type="password"
                      class="customInput"
                      v-model="password"
                      placeholder="Password"
                    />
                  </div>
                  <div class="col pe-0">
                    <input
                      type="text"
                      class="customInput"
                      v-model="age"
                      placeholder="Age"
                    />
                  </div>
                  <div class="col">
                    <input
                      type="text"
                      class="customInput"
                      v-model="phoneNumber"
                      placeholder="Phone #"
                    />
                  </div>
                </div>
                <div class="row mb-3 mx-3 mt-4">
                  <div class="col">
                    <input
                      type="text"
                      class="customInput"
                      v-model="address"
                      placeholder="Address"
                    />
                  </div>
                </div>
                <div class="row mb-3 mx-3 mt-5">
                  <div class="col text-center">
                    <button
                      class="btn btn-light btn-block"
                      v-on:click="registerPatient()"
                    >
                      Register
                    </button>
                  </div>
                </div>
                <div class="row mb-3 mx-3 mt-3">
                  <div class="col text-center">
                    <a
                      class="text-secondary changeText btn-block"
                      v-on:click="displayLogin = true"
                      >Login Here!</a
                    >
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
import router from "../../router/index.js";

export default {
  name: "PatientHome",
  data() {
    return {
      displayLogin: Boolean,
      firstName: "",
      lastName: "",
      email: "",
      ohipId: "",
      password: "",
      age: "",
      address: "",
      phoneNumber: "",
      auth: {
        ohipId: "",
        password: "",
      },
    };
  },
  metaInfo() {
    return {
      title: "Patient System",
    };
  },
  mounted() {
    this.displayLogin = true;
  },
  methods: {
    registerPatient() {
      // let self = this;
      const apiUrl = "http://localhost:5000/api/patients";
      axios
        .post(apiUrl, {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          ohipId: this.ohipId,
          password: this.password,
          age: this.age,
          address: this.address,
          phoneNumber: this.phoneNumber,
        })
        .then(function (res) {
          console.log(res);
          var ohipId = res.data.ohipId;
          Cookies.set("screen", ohipId);
          router.replace("/patientStepTwoSignUp/" + ohipId);
        })
        .catch(function (err) {
          Swal.fire({
            title: "Oops!",
            text: err.message,
            showConfirmButton: true,
          });
        });
    },
    loginPatient() {
      console.log("auth: ", this.auth.ohipId, this.auth.password);

      let self = this;
      const apiUrl = "http://localhost:5000/api/patient/signin";
      axios
        .post(apiUrl, {
          ohipId: self.auth.ohipId,
          password: self.auth.password,
        })
        .then(function (res) {
          console.log(res);
          Cookies.set("screen", res.data.screen);
          router.replace("/patientDashboard");
        })
        .catch(function (err) {
          Swal.fire({
            title: "Oops!",
            text: err.message,
            showConfirmButton: true,
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
#patientHome {
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
