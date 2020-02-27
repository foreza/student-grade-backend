
const testCafe_utils = {};

const mongoose = require('mongoose');
const studentModel = require('../models/studentModel')
const mongoTestConnectString = 'mongodb://localhost:27017/student-db-tests';


testCafe_utils.doMongoConnection = () => {

    console.log(`Connecting to ${mongoTestConnectString}`);
    mongoose.connect(mongoTestConnectString, { useCreateIndex: true, useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true });
    
    // Event handlers
    mongoose.connection.on('error', err => { console.log(`Mongoose test env connection error`)});
    mongoose.connection.on('connected', () => { console.log(`Mongoose test env connected success`)});
    mongoose.connection.on('disconnected', () => { console.log(`Mongoose test env disconnected`)});
}

testCafe_utils.clearStudents = async () => {
    await studentModel.deleteMany({});
}



module.exports = testCafe_utils;