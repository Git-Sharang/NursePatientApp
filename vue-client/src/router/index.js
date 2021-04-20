import Vue from "vue";
import VueRouter from "vue-router";
// Welcome
import Home from "../views/Home.vue";
// Nurse
import NurseHome from "../views/nurse/NurseHome.vue";
import NurseDashboard from "../views/nurse/NurseDashboard.vue";
import PatientInfo from "../views/nurse/PatientInfo.vue";
import PatientInfoLog from "../views/nurse/PatientInfoLog.vue";
import DailyPatientInfo from "../views/nurse/DailyPatientInfo.vue";
import Alerts from "../views/nurse/Alerts.vue";
import CreateMotivation from "../views/nurse/CreateMotivation.vue";
// Patient
import PatientHome from "../views/patient/PatientHome.vue";
import PatientDashboard from "../views/patient/PatientDashboard.vue";
import PatientStepTwoSignUp from "../views/patient/PatientStepTwoSignUp.vue";
import PatientDailyInfo from "../views/patient/PatientDailyInfo.vue";
import PatientMotivation from "../views/patient/PatientMotivation.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/nurseHome",
    name: "NurseHome",
    component: NurseHome,
  },
  {
    path: "/patientHome",
    name: "PatientHome",
    component: PatientHome,
  },
  {
    path: "/nurseDashboard",
    name: "NurseDashboard",
    component: NurseDashboard,
  },
  {
    path: "/patientInfo/:id",
    name: "PatientInfo",
    component: PatientInfo,
  },
  {
    path: "/patientInfoLog",
    name: "PatientInfoLog",
    component: PatientInfoLog,
  },
  {
    path: "/dailyPatientInfo/:id",
    name: "DailyPatientInfo",
    component: DailyPatientInfo,
  },
  {
    path: "/nurseAlerts",
    name: "Alerts",
    component: Alerts,
  },
  {
    path: "/createMotivation",
    name: "CreateMotivation",
    component: CreateMotivation,
  },
  // Patient
  {
    path: "/patientDashboard",
    name: "PatientDashBoard",
    component: PatientDashboard,
  },
  {
    path: "/patientStepTwoSignUp/:id",
    name: "PatientStepTwoSignUp",
    component: PatientStepTwoSignUp,
  },
  {
    path: "/patientDailyInfo",
    name: "PatientDailyInfo",
    component: PatientDailyInfo,
  },
  {
    path: "/patientMotivation",
    name: "PatientMotivation",
    component: PatientMotivation,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
