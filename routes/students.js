const router = require('express').Router();
const studentUtils = require('../db/util_students');


// GET: List all students
router.get('/', async (req, res, next) => {
    console.log("Hit this route!")
    const students = await studentUtils.listAllStudents();
    res.json(students);

})


// POST: Add a new student 
router.post('/', async (req, res, next) => {
    
    console.log("Hit POST route!")

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
