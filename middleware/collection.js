
const middlewareCollection = {};

// Middleware to log things.
middlewareCollection.logger = function (req, res, next) {
    console.log(` Received ${req.method} request to: ${req.baseUrl}`)
    next()
}


// For all routes that take in an ID, check the mongo object ID to verify it is valid
middlewareCollection.checkMongoID = function (req, res, next) {

    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        next()
    } else {
        console.error(`Received bad mongo id in request`)
        res.sendStatus(404);
    }
}

module.exports = middlewareCollection;


