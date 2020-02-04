const studentModel =  require('../models/studentModel');        // Get our student model
const studentModelUtilities = {};                               // We'll define our utilities and add them to this collection


// Return the mongoose method to find all student items
studentModelUtilities.listAllStudentsDefaultSorted = () => {
    return studentModel.find().sort({name:1});    // TODO: What if we have too many students??
}

studentModelUtilities.listAllStudentsSortedByName = (dir) => {
    return studentModel.find().sort({name: dir});    
}

studentModelUtilities.listAllStudentsSortedByGrade = (dir) => {
    return studentModel.find().sort({grade: dir});    
}

// Return the mongoose method to find all student items
studentModelUtilities.retrieveStudentByUID = (uid) => {
    return studentModel.findById(uid);
}

// Create the student
studentModelUtilities.createStudent = (obj) => {
    // TODO: Do some additional validation here that isn't specific to mongoose schema validation
    return studentModel(obj).save();

}

// Return the mongoose method to delete a student by a given id
studentModelUtilities.deleteStudentWithUID = (uid) => {
    return studentModel.findByIdAndDelete(uid);
}


// Return the mongoose method to update all student items
studentModelUtilities.updateStudentWithUID = (uid, obj) => {
    return studentModel.findByIdAndUpdate(uid, obj);
}



module.exports = studentModelUtilities;                         // Make this accessible
