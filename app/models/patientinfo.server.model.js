const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const PatientInfoSchema = new Schema({
    pulseRate: Number,
    bloodPressure: String,
    weight: String,
    bodyTemperature: String,
    respiratoryRate: String,
    patient: {
        type: Schema.ObjectId,
        ref: 'Patient'
    }
});

module.exports = mongoose.model('PatientInfo', PatientInfoSchema);