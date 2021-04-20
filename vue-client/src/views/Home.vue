<template>
  <div id="home">
    <div class="container-fluid animate__animated animate__bounceInLeft">
      <div class="row">
        <div class="col mt-5 pt-5 text-center">
          <h1 class="text-white">Welcome</h1>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col text-center">
          <p class="text-white subText">Connected Care For You</p>
        </div>
      </div>
      <div class="row mt-5 pt-5">
        <div class="col text-center introBtn">
          <router-link
            to="/nurseHome"
            class="btn btn-block btn-light animate__animated animate__bounceInRight"
          >
            <a class="customText">Nurse</a>
          </router-link>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col text-center introBtn">
          <router-link
            to="/patientHome"
            class="btn btn-block btn-light animate__animated animate__bounceInRight"
          >
            <a class="customText">Patient</a></router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:root {
  --animate-delay: 0.5s;
}

#home {
  background: linear-gradient(180.51deg, #9346e0 0.73%, #e357c5 99.56%);
  height: 100vh;
  letter-spacing: 0.13em;

  .subText {
    font-size: 20px;
    opacity: 0.9;
  }

  .introBtn {
    margin-left: 30%;
    margin-right: 30%;
  }

  .btn {
    letter-spacing: 0.04em;
    padding: 15px 70px;
    font-size: 18px;
    font-weight: 600;
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
    border-radius: 40px;
  }

  .customText {
    font-weight: 500;
    font-size: 20px;
    background: linear-gradient(90deg, #fa4141 0%, #ffb800 108.48%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>
