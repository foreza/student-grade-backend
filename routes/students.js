const router = require('express').Router();
const studentUtils = require('../db/util_students');


// MiddleWare: logging all requests to /student
var debugLogger = function (req, res, next) {
    console.log(` Received ${req.method} request to: ${req.baseUrl}`)
    next()
}



// All routers should use the debug logger (TEMP)
router.use(debugLogger)


// GET: List all students in the given sort order
router.get('/', async (req, res, next) => {

    console.log(`keys: ${Object.keys(req.query)}`)

    if (Object.keys(req.query).length > 1) {
        try {
            let sortType = req.query.sortType;              
            let sortDir = Math.sign(req.query.sortDir);     // Cast it down to -1 or 1. -1 for ascend, +1 for descend

            console.log(`Sort dir: ${sortDir} and Sort Type: ${sortType}`)

            switch (sortType) {

                case 'name': {
                    const students = await studentUtils.listAllStudentsSortedByName(sortDir);
                    res.json(students);
                    break;
                }
            
                case 'grade': {
                    const students = await studentUtils.listAllStudentsSortedByGrade(sortDir);
                    res.json(students);
                    break;
                }
                    
                default:
                    // If we don't match any of the supported sort types, pass to the default handler
                    next();
                }

            } catch (err) {
            // On error, pass it off to default error handler
            next(err);
        } 
    } else {
        // If we don't have more than 1 query param, assume default list sort
        next();
    }
    
 
})


router.get('/', async (req, res, next) => {

        try {
            const students = await studentUtils.listAllStudentsDefaultSorted();
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
        res.json(result)
    } catch (err) {
        // On error, pass it off to somebody else!
        next(err)
    }

})



// For all routes that take in an ID, check the mongo object ID to verify it is valid
router.all('/:id', function (req, res, next) {

    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        next()
    } else {
        console.error(`Received bad mongo id in request`)
        res.sendStatus(404);
    }
});



// GET: List a specific student by ID
router.get('/:id', async (req, res, next) => {

    try {
        const students = await studentUtils.retrieveStudentByUID(req.params.id);
        res.json(students);
    } catch (err) {
        next(err)
    }

})


// DELETE: List a specific student by ID
router.delete('/:id', async (req, res, next) => {

    try {
        const result = await studentUtils.deleteStudentWithUID(req.params.id);
        res.json(result);
    } catch (err) {
        next(err)
    }


})




// PUT: Modify a student (providing the entire student info in the request) given an ID
router.put('/:id', async (req, res, next) => {

    try {
        const result = await studentUtils.updateStudentWithUID(req.params.id, req.body)
        res.json(result)        // Note: the old object is returned
    } catch (err) {
        // On error, pass it off to somebody else!
        next(err)

    }

})



module.exports = router;
