var express = require('express');
var router = express.Router();

mongoose.connect('mongodb://localhost:27017/student-grade-db-ttt', { useNewUrlParser: true, useUnifiedTopology: true });

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
