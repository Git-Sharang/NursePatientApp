var patient_controller = require("../../app/controllers/patients.server.controller");
var nurse_controller = require("../../app/controllers/nurses.server.controller");
var symptoms_controller = require("../../app/controllers/symptoms.server.controller");

module.exports = function (app) {
  app.route("/").get(patient_controller.renderIndex);

  //For Registering a patient and nurse can get the list of patients as well
  app.route("/api/patients")
    .post(patient_controller.signUpPatient);


  //For adding Patient Info after filling the registration form
  app.route("/api/patient/patientInfo")
    .post(patient_controller.patientSignUpStepTwo);


  //For getting the latest daily motivation
  app.route('/api/patient/getdailymotivation')
    .get(nurse_controller.getDailyMotivation);


  //For getting the results of the symptoms
  app.route("/api/patient/checkSymptoms")
    .post(symptoms_controller.userDataPredict);


  //authenticate the patient
  app.post('/api/patient/signin', patient_controller.authenticate);
  app.get('/api/patient/signout', patient_controller.signout);
  app.get('/api/patient/read_cookie', patient_controller.isSignedIn);

  // For adding the daily info the patient needs to be signed in
  app.route("/api/patient/patientdailyinfo")
    .post(patient_controller.addDailyPatientInfo);

  //For sending the patient alerts
  app.route("/api/patient/patientalerts")
    .post(patient_controller.sendPatientAlerts);

  //For getting the latest daily motivation
  app.route("/api/patient/getdailymotivation")
    .get(nurse_controller.getDailyMotivation);

  //authenticate the patient
  app.post("/api/patient/signin", patient_controller.authenticate);
  app.get("/api/patient/signout", patient_controller.signout);
  app.get("/api/patient/read_cookie", patient_controller.isSignedIn);

  //path to a protected page
  app.get("/api/patient/welcome", patient_controller.welcome);
};
