var express = require('express');
const studentUtils = require('../db/util_students');
var router = express.Router();


/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

/* Rendering student view */
router.get('/', async (req, res, next) => {

  try {
    const students = await studentUtils.listAllStudentsDefaultSorted();
    res.render('index', { title: 'Express', students: students});
  } catch (err) {
    next(err)
  }

  
});

module.exports = router;
