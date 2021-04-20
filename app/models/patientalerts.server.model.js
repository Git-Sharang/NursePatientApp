const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const PatientAlertsSchema = new Schema({
    added:{
        type: Date,
        default: Date.now
    },
    title: String,
    message: String,
    patient: {
        type: Schema.ObjectId,
        ref: 'Patient'
    }
});

module.exports = mongoose.model('PatientAlerts', PatientAlertsSchema);