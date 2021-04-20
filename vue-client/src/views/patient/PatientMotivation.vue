<template>
  <div id="patientMotivation">
    <PatientNavbar />
    <div class="container-fluid">
      <div class="row">
        <div class="col-10 offset-1 mt-5 pt-3">
          <ul class="nav nav-tabs nav-justified" role="tablist">
            <li class="nav-item" role="presentation">
              <a
                class="nav-link active"
                id="ex1-tab-1"
                data-mdb-toggle="tab"
                href="#ex1-tabs-1"
                role="tab"
                aria-controls="ex1-tabs-1"
                aria-selected="true"
                >Videos</a
              >
            </li>
            <li class="nav-item" role="presentation">
              <a
                class="nav-link"
                id="ex1-tab-2"
                data-mdb-toggle="tab"
                href="#ex1-tabs-2"
                role="tab"
                aria-controls="ex1-tabs-2"
                aria-selected="false"
                >Motivational Tips</a
              >
            </li>
          </ul>

          <div class="tab-content pt-2" id="ex1-content">
            <div
              class="tab-pane fade show active"
              id="ex1-tabs-1"
              role="tabpanel"
              aria-labelledby="ex1-tab-1"
            >
              <div class="row mt-3">
                <div class="col">
                  <div class="accordion" id="accordionExample">
                    <div class="accordion-item">
                      <h2 class="accordion-header" id="headingOne">
                        <button
                          class="accordion-button collapsed text-white"
                          type="button"
                          data-mdb-toggle="collapse"
                          data-mdb-target="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          <strong>20 minute Full Body Workout</strong>
                        </button>
                      </h2>
                      <div
                        id="collapseOne"
                        class="accordion-collapse collapse"
                        aria-labelledby="headingOne"
                        data-mdb-parent="#accordionExample"
                      >
                        <div class="accordion-body">
                          <LazyYoutube
                            ref="youtubeLazyVideo"
                            :src="video1"
                            max-width="1200px"
                            aspect-ratio="16:9"
                            thumbnail-quality="standard"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="accordion-item">
                      <h2 class="accordion-header" id="headingTwo">
                        <button
                          class="accordion-button collapsed text-white"
                          type="button"
                          data-mdb-toggle="collapse"
                          data-mdb-target="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                        >
                          <strong>No Equipment Full Body Workout</strong>
                        </button>
                      </h2>
                      <div
                        id="collapseTwo"
                        class="accordion-collapse collapse"
                        aria-labelledby="headingTwo"
                        data-mdb-parent="#accordionExample"
                      >
                        <div class="accordion-body">
                          <LazyYoutube
                            ref="youtubeLazyVideo"
                            :src="video2"
                            max-width="1200px"
                            aspect-ratio="16:9"
                            thumbnail-quality="standard"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="accordion-item">
                      <h2 class="accordion-header" id="headingThree">
                        <button
                          class="accordion-button collapsed text-white"
                          type="button"
                          data-mdb-toggle="collapse"
                          data-mdb-target="#collapseThree"
                          aria-expanded="false"
                          aria-controls="collapseThree"
                        >
                          <strong>Low Impact Home Workout</strong>
                        </button>
                      </h2>
                      <div
                        id="collapseThree"
                        class="accordion-collapse collapse"
                        aria-labelledby="headingThree"
                        data-mdb-parent="#accordionExample"
                      >
                        <div class="accordion-body">
                          <LazyYoutube
                            ref="youtubeLazyVideo"
                            :src="video3"
                            max-width="1200px"
                            aspect-ratio="16:9"
                            thumbnail-quality="standard"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col"></div>
              </div>
            </div>
            <div
              class="tab-pane fade"
              id="ex1-tabs-2"
              role="tabpanel"
              aria-labelledby="ex1-tab-2"
            >
              <div v-for="item in list" :key="item.id">
                <div v-for="i in item" :key="i.id">
                  <div class="card my-3">
                    <div class="card-body">
                      <div class="card-text ps-2">
                        <h5 class="">{{ i.title }}</h5>
                        <p class="txt">{{ i.message }}</p>
                        <div class="text-black-50">
                          {{ moment(i.created).format("DD-MMM-YYYY hh:mm A") }}
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
import PatientNavbar from "../../components/PatientNavbar";
import Cookies from "vue-cookies";
import axios from "axios";
import router from "../../router/index";
import Swal from "sweetalert2";

export default {
  name: "PatientMotivation",
  data() {
    return {
      cookies: "",
      list: [],
      video1: "https://www.youtube.com/watch?v=oKfNUOWuZV8",
      video2: "https://www.youtube.com/watch?v=UBMk30rjy0o",
      video3: "https://www.youtube.com/watch?v=gC_L9qAHVJ8",
    };
  },
  components: {
    PatientNavbar,
  },
  metaInfo() {
    return {
      title: "Get Motivated!",
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
      this.getMotivation();
    }
  },
  methods: {
    getMotivation() {
      let self = this;
      axios
        .get("http://localhost:5000/api/patient/getdailymotivation")
        .then(function (res) {
          console.log(res);
          self.list.push(res.data);
          console.log(self.list);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
#patientMotivation {
  background: linear-gradient(
    31.27deg,
    rgba(212, 70, 215, 0.8) 0%,
    rgba(50, 76, 214, 0.8) 100%
  );
  height: 110vh;

  .card {
    border-radius: 16px;
    background-color: rgba(255, 255, 255, 1);
    transition: 0.3s transform cubic-bezier(0.155, 1.105, 0.295, 1.12),
      0.3s box-shadow,
      0.3s -webkit-transform cubic-bezier(0.155, 1.105, 0.295, 1.12);

    &:hover {
      transform: scale(1.05);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.06);
    }
  }
}
</style>
