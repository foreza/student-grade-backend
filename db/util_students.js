const studentModel =  require('../models/studentModel');        // Get our student model
const studentModelUtilities = {};                               // We'll define our utilities and add them to this collection


// Return the mongoose method to find all student items
studentModelUtilities.listAllStudents = () => {
    return studentModel.find();    
}

// Return the mongoose method to find all student items
studentModelUtilities.retrieveStudentByUID = (uid) => {
    return studentModel.findOne({_id: uid});    
}

// Create the student
studentModelUtilities.createStudent = (obj) => {
    // TODO: Do some additional validation here that isn't specific to mongoose schema validation
    return studentModel(obj).save();

}

module.exports = studentModelUtilities;                         // Make this accessible
