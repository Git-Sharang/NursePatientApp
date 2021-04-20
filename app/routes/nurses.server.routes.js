var patient_controller = require("../../app/controllers/patients.server.controller");
var nurses_controller = require("../../app/controllers/nurses.server.controller");

module.exports = function (app) {
  //For Registering a nurse
  app.route("/api/nurses")
    .post(nurses_controller.signUpNurse);

  //For creating the daily motivation
  app.route("/api/nurses/dailymotivation")
    .post(nurses_controller.createDailyMotivation);

  //authenticate the nurse
  app.post("/api/nurse/signin", nurses_controller.authenticate);
  app.get("/api/nurse/signout", nurses_controller.signout);
  app.get("/api/nurse/read_cookie", nurses_controller.isSignedIn);

  //path to a protected page
  app.get("/api/nurse/welcome", nurses_controller.welcome);

  //For getting the list of alerts made by patients
  app.route("/api/nurses/getPatientAlerts")
    .get(patient_controller.getPatientAlerts);

  /*
   *   For Nurses '/api/nurses/allPatients' will be utilized to get the patient Id in the following routes:
   *   '/api/nurses/patientInfo/:patientId'
   *   and
   *   '/api/nurses/dailyPatientInfo/:patientIdForDailyInfo'
   */

  //Getting the list of registered patients
  app.route("/api/nurses/allPatients")
    .get(patient_controller.listPatients);

  //For getting and updating the specific patientInfo (Step 2 of registration) by the patient id
  app.route("/api/nurses/patientInfo/:patientId")
    .get(patient_controller.readPatientInfo)
    .put(patient_controller.updateDailyPatientInfo);
  app.param("patientId", patient_controller.patientInfoByPatientId);

  //For getting the specific daily patient Info list by the patient id
  app.route("/api/nurses/dailyPatientInfo/:patientIdForDailyInfo")
    .get(patient_controller.readDailyPatientInfo);
  app.param("patientIdForDailyInfo", patient_controller.dailypatientInfoByPatientId
  );
};
