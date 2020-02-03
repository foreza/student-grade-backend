const router = require('express').Router();
const studentModel =  require('../models/studentModel');        // Get our student model
const studentUtils = require('../db/util_students');


// MiddleWare: logging all requests to /student
var debugLogger = function (req, res, next) {
    console.log(` Received ${req.method} request to: ${req.baseUrl}`)
    next()
}
  

  router.use(debugLogger)



// GET: List all students
router.get('/', async (req, res, next) => {

    try {
        const students = await studentUtils.listAllStudents();
        res.json(students);
    } catch (err) {
        // On error, pass it off to somebody else!
        next(err)
    }
})


// GET: List a specific student by ID
router.get('/:id', async (req, res, next) => {

    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        try {
            const students = await studentUtils.retrieveStudentByUID(req.params.id);
            res.json(students);
        } catch (err) {
            next(err)
        }      
    } else {
        res.sendStatus(404);
    }

})


// DELETE: List a specific student by ID
router.delete('/:id', async (req, res, next) => {

    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        try {
            const result = await studentUtils.deleteStudentWithUID(req.params.id);
            res.json(result);
        } catch (err) {
            next(err)
        }      
    } else {
        res.sendStatus(404);
    }

})


// POST: Add a new student 
router.post('/', async (req, res, next) => {

    try {
        const result = await studentUtils.createStudent(req.body)
        res.json(result)
    } catch (err) {
        // On error, pass it off to somebody else!
        next(err)
    }

})


// POST: Modify a student (providing the entire student info in the request)
router.put('/:id', async (req, res, next) => {

    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        try {
            const result = await studentUtils.updateStudentWithUID(req.params.id, req.body)
            res.json(result)        // Note: the old object is returned
        } catch (err) {
            // On error, pass it off to somebody else!
            next(err)
        }
    } else {
        res.sendStatus(404);
    }

    

})



module.exports = router;
