const Patient = require("mongoose").model("Patient");
const PatientInfo = require("mongoose").model("PatientInfo");
const DailyPatientInfo = require("mongoose").model("DailyPatientInfo");
const PatientAlerts = require("mongoose").model("PatientAlerts");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../../config/config");
const jwtExpirySeconds = 300;
const jwtKey = config.secretKey;

const getErrorMessage = function (err) {
  var message = "";
  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        message = "Patient already exists";
        break;
      default:
        message = "Something went wrong";
    }
  } else {
    for (const errName in err.errors) {
      if (err.errors[errName].message) message = err.errors[errName].message;
    }
  }
  return message;
};

exports.renderIndex = function (req, res, next) {
  res.status(200).json("The Api has been connected Succesfully");
};

// Registering a new Patient
exports.signUpPatient = function (req, res, next) {
  var patient = new Patient(req.body);
  console.log("body: " + req.body.ohipId);

  patient.save(function (err) {
    if (err) {
      return next(err);
    } else {
      res.json(patient);
    }
  });
};

//This is the step 2 of patient registration
exports.patientSignUpStepTwo = function (req, res, next) {
  const patientInfo = new PatientInfo();

  patientInfo.pulseRate = req.body.pulseRate;
  patientInfo.bloodPressure = req.body.bloodPressure;
  patientInfo.weight = req.body.weight;
  patientInfo.bodyTemperature = req.body.bodyTemperature;
  patientInfo.respiratoryRate = req.body.respiratoryRate;

  console.log(req.body);

  Patient.findOne({ ohipId: req.body.ohipId }, (err, patient) => {
    if (err) {
      return getErrorMessage(err);
    }

    req.id = patient._id;
    console.log("patient._id: ", req.id);
  }).then(function () {
    patientInfo.patient = req.id;
    console.log("req.patient._id: ", req.id);

    patientInfo.save((err) => {
      if (err) {
        console.log("error", getErrorMessage(err));

        return res.status(400).send({
          message: getErrorMessage(err),
        });
      } else {
        res.status(200).json(patientInfo);
      }
    });
  });
};

//This is for adding patient's daily info
exports.addDailyPatientInfo = function (req, res, next) {
  const dailyPatientInfo = new DailyPatientInfo();

  dailyPatientInfo.pulseRate = req.body.pulseRate;
  dailyPatientInfo.bloodPressure = req.body.bloodPressure;
  dailyPatientInfo.weight = req.body.weight;
  dailyPatientInfo.bodyTemperature = req.body.bodyTemperature;
  dailyPatientInfo.respiratoryRate = req.body.respiratoryRate;

  console.log(req.body);

  Patient.findOne({ ohipId: req.body.ohipId }, (err, patient) => {
    if (err) {
      return getErrorMessage(err);
    }

    req.id = patient._id;
    console.log("patient._id: ", req.id);
  }).then(function () {
    dailyPatientInfo.patient = req.id;
    console.log("req.patient._id: ", req.id);

    dailyPatientInfo.save((err) => {
      if (err) {
        console.log("error", getErrorMessage(err));

        return res.status(400).send({
          message: getErrorMessage(err),
        });
      } else {
        res.status(200).json(dailyPatientInfo);
      }
    });
  });
};

//This is for sending the alerts
exports.sendPatientAlerts = function (req, res, next) {
  const patientAlerts = new PatientAlerts();

  patientAlerts.title = req.body.title;
  patientAlerts.message = req.body.message;

  console.log(req.body);

  Patient.findOne({ ohipId: req.body.ohipId }, (err, patient) => {
    if (err) {
      return getErrorMessage(err);
    }

    req.id = patient._id;
    console.log("patient._id: ", req.id);
  }).then(function () {
    patientAlerts.patient = req.id;
    console.log("req.patient._id: ", req.id);

    patientAlerts.save((err) => {
      if (err) {
        console.log("error", getErrorMessage(err));

        return res.status(400).send({
          message: getErrorMessage(err),
        });
      } else {
        res.status(200).json(patientAlerts);
      }
    });
  });
};

//This will list all the patients to the nurse
exports.listPatients = function (req, res) {
  Patient.find()
    .populate("patient", "firstName lastName fullName")
    .exec((err, patients) => {
      if (err) {
        return res.status(400).send({
          message: getErrorMessage(err),
        });
      } else {
        res.status(200).json(patients);
      }
    });
};

/*
 * Middleware, utilized by the Nurse to Update the specific patientInfo
 */

//Reading the PatientInfo that we got from the Patient Id param
exports.readPatientInfo = function (req, res) {
  res.status(200).json(req.patientInfo);
};
//Updating the PatientInfo
exports.updateDailyPatientInfo = function (req, res) {
  console.log("in updateDailyPatientInfo:", req.patientInfo);

  const patientInfo = req.patientInfo;

  patientInfo.pulseRate = req.body.pulseRate;
  patientInfo.bloodPressure = req.body.bloodPressure;
  patientInfo.weight = req.body.weight;
  patientInfo.bodyTemperature = req.body.bodyTemperature;
  patientInfo.respiratoryRate = req.body.respiratoryRate;

  patientInfo.save((err) => {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err),
      });
    } else {
      res.status(200).json(patientInfo);
    }
  });
};
//Getting a specific patientInfo by the patient ID
exports.patientInfoByPatientId = function (req, res, next, id) {
  PatientInfo.findOne({ patient: id })
    .populate("patient", "firstName lastName fullName")
    .exec((err, patientInfo) => {
      if (err) return next(err);
      if (!patientInfo)
        return next(
          new Error("Failed to load the patientInfo with patient id: " + id)
        );
      req.patientInfo = patientInfo;
      console.log("in patientInfoByPatientId: ", req.patientInfo);
      next();
    });
};

/**
 * Middleware for the Nurse to get list of Daily Patient Info
 * **/

//Reading the list daily patient that we got from the Patient Id param
exports.readDailyPatientInfo = function (req, res) {
  res.status(200).json(req.dailyPatientInfo);
};
//Getting the list daily patient infos by the patient id
exports.dailypatientInfoByPatientId = function (req, res, next, id) {
  DailyPatientInfo.find({ patient: id })
    .sort("-added")
    .populate("patient", "firstName lastName fullName")
    .exec((err, dailyPatientInfo) => {
      if (err) return next(err);
      if (!dailyPatientInfo)
        return next(
          new Error(
            "Failed to load the dailyPatientInfo with patient id: " + id
          )
        );
      req.dailyPatientInfo = dailyPatientInfo;
      console.log("in dailypatientInfoByPatientId: ", req.dailyPatientInfo);
      next();
    });
};

/**
 * Middleware for the Nurse to get list of All Alerts
 * **/

exports.getPatientAlerts = function (req, res, next) {
  PatientAlerts.find()
    .sort("-added")
    .populate("patient", "firstName lastName fullName ohipId")
    .exec((err, patientAlerts) => {
      if (err) {
        return res.status(400).send({
          message: getErrorMessage(err),
        });
      } else {
        res.status(200).json(patientAlerts);
      }
    });
};

/*
 * For authenticating, Signout and reading the cookie throughout the session
 */

// authenticates a patient
exports.authenticate = function (req, res, next) {
  console.log(req.body);
  const ohipId = req.body.ohipId;
  const password = req.body.password;
  console.log(password);
  console.log(ohipId);
  Patient.findOne({ ohipId: ohipId }, (err, patient) => {
    if (err) {
      return next(err);
    } else {
      console.log(patient);
      if (bcrypt.compareSync(password, patient.password)) {
        const token = jwt.sign(
          { id: patient._id, ohipId: patient.ohipId },
          jwtKey,
          { algorithm: "HS256", expiresIn: jwtExpirySeconds }
        );
        console.log("token:", token);

        res.cookie("token", token, {
          maxAge: jwtExpirySeconds * 1000,
          httpOnly: true,
        });

        req.patient = patient;
        return res.status(200).send({ screen: patient.ohipId });
      } else {
        res.json({
          status: "error",
          message: "Invalid ohip id or passwords",
          data: null,
        });
      }
    }
  });
};

// protected page uses the JWT token for patient
exports.welcome = (req, res) => {
  const token = req.cookies.token;
  console.log(token);
  if (!token) {
    return res.status(401).end();
  }

  var payload;
  try {
    payload = jwt.verify(token, jwtKey);
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      return res.status(401).end();
    }
    return res.status(400).end();
  }
  res.send(`${payload.ohipId}`);
};

//sign out function in controller
exports.signout = (req, res) => {
  res.clearCookie("token");
  return res.status("200").json({ message: "signed out" });
};

//check if the patient is signed in
exports.isSignedIn = (req, res) => {
  const token = req.cookies.token;
  console.log(token);

  if (!token) {
    return res.send({ screen: "auth" }).end();
  }
  var payload;
  try {
    payload = jwt.verify(token, jwtKey);
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      return res.status(401).end();
    }
    return res.status(400).end();
  }
  res.status(200).send({ screen: payload.ohipId });
};

//To check if the patient is authenticated
exports.isAuthenticated = function (req, res, next) {
  const token = req.cookies.token;
  console.log(token);

  if (!token) {
    return res.send({ screen: "auth" }).end();
  }
  var payload;
  try {
    payload = jwt.verify(token, jwtKey);
    console.log("in requires Login - payload:", payload);
    req.id = payload.id;
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      return res.status(401).end();
    }
    return res.status(400).end();
  }
  next();
};
