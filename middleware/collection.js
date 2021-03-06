
const studentUtils = require('../db/util_students');
const middlewareCollection = {};
const yup = require('yup');


middlewareCollection.logger = function (req, res, next) {
    console.log(` Received ${req.method} request to: ${req.baseUrl}`)
    next()
}


middlewareCollection.checkUIDCollision = async function (req, res, next) {

    try {
        const uid = req.body._id;
        if (uid != undefined) {
            const students = await studentUtils.retrieveStudentByUID(uid)
            if (students != null) {
                res.sendStatus(409)
            } else {
                next();
            }
        } else {
            next();
        }

    } catch {
        res.sendStatus(400);
    }

}



let studentSchema = yup.object().shape({
    name: yup
        .string()
        .required()
        .min(1)
        .max(12),
    grade: yup
        .number()
        .required()
        .positive()
        .integer()
        .min(0)
        .max(100)
});


middlewareCollection.validateSchema = async (req, res, next) => {

    let err = [];

    if (await studentSchema.validate(req.body).catch((e) => { err = e; })) {
        next();
    } else {
        res.setHeader("Content-Type", "text/plain; charset=utf-8")
        res.status(400).send(err.errors);
    }

};

middlewareCollection.checkGradeRequestParam = function (req, res, next) {

    const gradeParam = req.body.grade;

    if (gradeParam != undefined
        && (typeof (gradeParam) === 'number')
        && gradeParam <= 100
        && gradeParam >= 0) {
        next()
    } else {
        res.sendStatus(400);
    }

}


middlewareCollection.checkNameRequestParam = function (req, res, next) {

    const nameParam = req.body.name;

    if (nameParam
        && (typeof (nameParam) === 'string')
        && nameParam.length > 0
        && nameParam.length <= 12) {
        next()
    } else {
        res.sendStatus(400);
    }

}

// For all routes that take in an ID, check the mongo object ID to verify it is valid
middlewareCollection.checkMongoID = function (req, res, next) {

    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        next()
    } else {
        res.sendStatus(400);
    }
}

module.exports = middlewareCollection;


