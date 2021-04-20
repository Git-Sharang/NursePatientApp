const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const Schema = mongoose.Schema;

var PatientSchema = new Schema({
    firstName: String,
	lastName: String,
	email: {
		type: String,
		match: [/.+\@.+\..+/, "Please fill a valid email address"]
	},
	ohipId: {
		type: String,
        trim: true,
		unique: true,
		required: 'OHIP ID is required'
	},
	password: {
		type: String,
        trim: true,
		validate: [
			(password) => password && password.length > 6,
			'Password should be longer than 6 digits'
		]
	},
    age: Number,
    address: String,
    phoneNumber: String,
});


PatientSchema.virtual('fullName').get(function() {
	return this.firstName + ' ' + this.lastName;
}).set(function(fullName) {
	const splitName = fullName.split(' ');
	this.firstName = splitName[0] || '';
	this.lastName = splitName[1] || '';
});


PatientSchema.pre('save', function(next){
	this.password = bcrypt.hashSync(this.password, saltRounds);
	next();
});

PatientSchema.methods.authenticate = function(password) {
	return this.password === bcrypt.hashSync(password, saltRounds);
};

PatientSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

module.exports = mongoose.model('Patient', PatientSchema);