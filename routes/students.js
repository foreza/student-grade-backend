const router = require('express').Router();
const studentUtils = require('../db/util_students');
const middleware = require('../middleware/collection')


// GET: List all students in the given sort order
router.get('/', middleware.logger, async (req, res, next) => {

    if (Object.keys(req.query).length > 1) {
        try {
            let sortType = req.query.sortType;              
            let sortDir = Math.sign(req.query.sortDir);     // Cast it down to -1 or 1. -1 for ascend, +1 for descend

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


router.get('/', middleware.logger, async (req, res, next) => {

        try {
            const students = await studentUtils.listAllStudentsDefaultSorted();
            res.json(students);
        } catch (err) {
            // On error, pass it off to somebody else!
            next(err)
        }
 
})


// POST: Add a new student 
router.post('/', middleware.logger, async (req, res, next) => {

    try {
        const result = await studentUtils.createStudent(req.body)
        res.json(result)
    } catch (err) {
        // On error, pass it off to somebody else!
        next(err)
    }

})




// GET: List a specific student by ID
router.get('/:id', [middleware.logger, middleware.checkMongoID], async (req, res, next) => {

    try {
        const students = await studentUtils.retrieveStudentByUID(req.params.id);
        res.json(students);
    } catch (err) {
        next(err)
    }

})


// DELETE: List a specific student by ID
router.delete('/:id', [middleware.logger, middleware.checkMongoID], async (req, res, next) => {

    try {
        const result = await studentUtils.deleteStudentWithUID(req.params.id);
        res.json(result);
    } catch (err) {
        next(err)
    }


})




// PUT: Modify a student (providing the entire student info in the request) given an ID
router.put('/:id', [middleware.logger, middleware.checkMongoID], async (req, res, next) => {

    try {
        const result = await studentUtils.updateStudentWithUID(req.params.id, req.body)
        res.json(result)        // Note: the old object is returned
    } catch (err) {
        // On error, pass it off to somebody else!
        next(err)

    }

})



module.exports = router;
