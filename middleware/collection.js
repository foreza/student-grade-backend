
const middlewareCollection = {};

middlewareCollection.logger = function (req, res, next) {
    console.log(` Received ${req.method} request to: ${req.baseUrl}`)
    next()
}


middlewareCollection.checkRequestParam = function(req, res, next) {

    if (req.body.name && req.body.grade) {
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


