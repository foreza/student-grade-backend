const router = require('express').Router();
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
   
    try {
        const students = await studentUtils.retrieveStudentByUID(req.params.id);
        res.json(students);
    } catch (err) {
        // On error, pass it off to somebody else!
        next(err)
    }

})


// POST: Add a new student 
router.post('/', async (req, res, next) => {

    try {
        const result = await studentUtils.createStudent(req.body)

        // TODO: What else to do once we succeed?
        res.json(result)
    } catch (err) {
        // On error, pass it off to somebody else!
        next(err)
    }

})

module.exports = router;
