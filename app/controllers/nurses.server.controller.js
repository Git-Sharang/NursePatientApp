const Nurse = require("mongoose").model("Nurse");
const DailyMotivation = require("mongoose").model("DailyMotivation");
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
        message = "Nurse already exists";
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

// Registering a Nurse
exports.signUpNurse = function (req, res, next) {
  var nurse = new Nurse(req.body);
  console.log("body: " + req.body.username);

  nurse.save(function (err) {
    if (err) {
      return next(err);
    } else {
      res.json(nurse);
    }
  });
};

//For Creating a daily motivation
exports.createDailyMotivation = function (req, res, next) {
  const dailyMotivation = new DailyMotivation();

  dailyMotivation.title = req.body.title;
  dailyMotivation.message = req.body.message;

  console.log(req.body);

  Nurse.findOne({ username: req.body.username }, (err, nurse) => {
    if (err) {
      return getErrorMessage(err);
    }

    req.id = nurse._id;
    console.log("nurse._id: ", req.id);
  }).then(function () {
    dailyMotivation.nurse = req.id;
    console.log("req.nurse._id: ", req.id);
    dailyMotivation.save((err) => {
      if (err) {
        console.log("error", getErrorMessage(err));
        return res.status(400).send({
          message: getErrorMessage(err),
        });
      } else {
        res.status(200).json(dailyMotivation);
      }
    });
  });
};

/**
 * Middleware for the Patient to get list of Daily Motivation
 * **/
exports.getDailyMotivation = function (req, res, next) {
  DailyMotivation.find()
    .sort("-created")
    .populate("nurse", "firstName lastName fullName")
    .exec((err, dailyMotivation) => {
      if (err) {
        return res.status(400).send({
          message: getErrorMessage(err),
        });
      } else {
        res.status(200).json(dailyMotivation);
      }
    });
};

/*
 * For authenticating the nurse, Signout and reading the cookie throughout the session
 */

// authenticates a nurse
exports.authenticate = function (req, res, next) {
  console.log(req.body);
  const username = req.body.username;
  const password = req.body.password;
  console.log(password);
  console.log(username);
  Nurse.findOne({ username: username }, (err, nurse) => {
    if (err) {
      return next(err);
    } else {
      console.log(nurse);
      if (bcrypt.compareSync(password, nurse.password)) {
        const token = jwt.sign(
          { id: nurse._id, username: nurse.username },
          jwtKey,
          { algorithm: "HS256", expiresIn: jwtExpirySeconds }
        );
        console.log("token:", token);

        res.cookie("token", token, {
          maxAge: jwtExpirySeconds * 1000,
          httpOnly: true,
        });
        res.status(200).send({ screen: nurse.username });

        req.nurse = nurse;
        next();
      } else {
        res.json({
          status: "error",
          message: "Invalid username or passwords",
          data: null,
        });
      }
    }
  });
};

// protected page uses the JWT token for nurse
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
  res.send(`${payload.username}`);
};

//sign out for the nurse
exports.signout = (req, res) => {
  res.clearCookie("token");
  return res.status("200").json({ message: "signed out" });
};

//check if the nurse is signed in
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
  res.status(200).send({ screen: payload.username });
};

//To check if the nurse is authenticated
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
