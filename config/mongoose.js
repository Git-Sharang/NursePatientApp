var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function () {
    const db = mongoose.connect(config.db, {
        useUnifiedTopology: true,
        useNewUrlParser: true, useCreateIndex: true
    }).then(() => console.log('Group4-DB Connected!'))
        .catch(err => {
            console.log('Error');
        });

    require('../app/models/nurse.server.model');
    require('../app/models/dailymotivation.server.model');

    require('../app/models/patient.server.model');
    require('../app/models/patientinfo.server.model');
    require('../app/models/dailypatientinfo.server.model');
    require('../app/models/patientalerts.server.model');

    return db;
};