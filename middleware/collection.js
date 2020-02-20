
const middlewareCollection = {};

middlewareCollection.logger = function (req, res, next) {
    console.log(` Received ${req.method} request to: ${req.baseUrl}`)
    next()
}


middlewareCollection.checkGradeRequestParam = function(req, res, next) {

    const gradeParam = req.body.grade;

    if (gradeParam != undefined 
        && (typeof(gradeParam) === 'number')
        && gradeParam <= 100
        && gradeParam >= 0) {
        next()
    } else {
        res.sendStatus(400);
    }

}


middlewareCollection.checkNameRequestParam = function(req, res, next) {

    const nameParam = req.body.name;

    if (nameParam 
        && (typeof(nameParam) === 'string')
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


