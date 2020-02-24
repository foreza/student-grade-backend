const router = require('express').Router();
const studentUtils = require('../db/util_students');
const middleware = require('../middleware/collection')
var qs = require('qs');



// GET: List all students in given sort order provided via query param
router.get('/', middleware.logger, async (req, res, next) => {

    try {

        // TODO: Abstract this into a middleware to use in both index and students

        // Define a sortObj that we will pass to the DB
        let sortObj = [];

        // let sortString = qs.parse(req.query, { comma: true });

        if (req.query.sort != undefined && req.query.dir != undefined) {

            // If these params are both passed, get them and store them
            sortTypes = req.query.sort.split(",");
            sortDir = req.query.dir.split(",");

            for (var i = 0; i < sortTypes.length; ++i) {

                let tSort = sortTypes[i] === undefined ? "name" : sortTypes[i];
                let tDir = sortDir[i] === undefined ? "1" : Math.sign(sortDir[i]);        // Cast it down to -1 or 1. -1 for ascend, +1 for descend
                let sortParam = [tSort, tDir];
                sortObj.push(sortParam);
            }
        }

        const students = await studentUtils.listAllStudentsAndSort(sortObj);
        res.json(students);

    } catch (err) {
        next(err);
    }


})



// POST: Add new student 
router.post('/', [middleware.logger, middleware.checkUIDCollision, middleware.validateSchema], async (req, res, next) => {

    try {
        const result = await studentUtils.createStudent(req.body)
        res.status(201).json(result)
    } catch (err) {
        next(err)
    }

})



// GET: List student given UID
router.get('/:id', [middleware.logger, middleware.checkMongoID], async (req, res, next) => {

    try {
        const students = await studentUtils.retrieveStudentByUID(req.params.id);
        if (students != null) {
            res.json(students);
        } else {
            res.sendStatus(400);
        }

    } catch (err) {
        next(err)
    }

})



// DELETE: Delete student given UID
router.delete('/:id', [middleware.logger, middleware.checkMongoID], async (req, res, next) => {

    try {
        const result = await studentUtils.deleteStudentWithUID(req.params.id);
        if (result != null) {
            res.json(result);
        } else {
            res.sendStatus(400);
        }
    } catch (err) {
        next(err)
    }

})



// PUT: Modify student given UID
router.put('/:id', [middleware.logger, middleware.checkMongoID, middleware.checkGradeRequestParam, middleware.checkNameRequestParam], async (req, res, next) => {

    try {
        const result = await studentUtils.updateStudentWithUID(req.params.id, req.body)
        if (result != null) {
            res.json(result)        // Note: the old object is returned
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        // On error, pass it off to somebody else!
        next(err)

    }

})



module.exports = router;
