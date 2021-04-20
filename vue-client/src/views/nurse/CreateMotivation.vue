<template>
  <div id="createMotivation">
    <Header />
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-6 offset-md-3 mt-md-5 pt-md-5 mt-5">
          <div class="card shadow">
            <div class="card-body">
              <div class="card-text mb-2">
                <div class="row">
                  <div class="col mt-2 ms-1">
                    <h5>Create Motivation</h5>
                  </div>
                </div>
                <div class="row">
                  <div class="col mt-3 mx-5 text-center">
                    <input
                      type="text"
                      class="mb-3 customInput"
                      v-model="motivation.title"
                      placeholder="Title"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col mt-2 mx-5 text-center">
                    <textarea
                      type="text"
                      class="mb-3 customInput"
                      v-model="motivation.message"
                      placeholder="Message"
                      rows="2"
                    ></textarea>
                  </div>
                </div>
                <div class="row">
                  <div class="col mt-2 mx-5 mb-2 text-center">
                    <button
                      id="btn"
                      class="btn btn-primary btn-block"
                      v-on:click="create()"
                    >
                      Send
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
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "vue-cookies";
import router from "../../router/index";
import Header from "../../components/Header";

export default {
  name: "CreateMotivation",
  data() {
    return {
      nurseId: "",
      username: "",
      motivation: [{ title: "" }, { message: "" }],
    };
  },
  components: {
    Header,
  },
  metaInfo() {
    return {
      title: "Motivation",
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
      console.log("Nurse is logged in");
      console.log("JWT Payload Username: ", Cookies.get("screen"));
      this.username = check;
      document.getElementById("btn").disabled = false;
    }
  },
  methods: {
    create() {
      if (this.title === "" || this.message === "") {
        Swal.fire({
          icon: "error",
          title: "All fields are required.",
        });
      } else {
        let self = this;
        axios
          .post("http://localhost:5000/api/nurses/dailymotivation", {
            username: self.username,
            title: self.motivation.title,
            message: self.motivation.message,
          })
          .then(function (res) {
            console.log(res);
            router.replace("/nurseDashboard");
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
#createMotivation {
  background: linear-gradient(
    31.27deg,
    rgba(212, 70, 215, 0.8) 0%,
    rgba(50, 76, 214, 0.8) 100%
  );
  height: 100vh;

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

    textarea {
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
    input:active,
    textarea:focus,
    textarea:active {
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
      background: linear-gradient(90deg, #e15bed 0%, #9e00ff 100%);
      box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
      border-radius: 25px;
      font-size: 15px;
      font-weight: 500;
    }
  }
}
</style>
