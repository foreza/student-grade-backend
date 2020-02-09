var express = require('express');
const studentUtils = require('../db/util_students');
var router = express.Router();


/* Rendering student view */
router.get('/', async (req, res, next) => {

  // look at the request object to figure out what needs to be served
  if (Object.keys(req.query).length > 1) {

    try {

    // Make a render params object to be utilized
    let renderParams = {
      "title": 'Advanced!',
      "students": null,     // Store the returned / sorted students collection
      "darkMode": 0,        // Let the page know intended darkMode state
      "sortDir": 0,         // Let the page know what the intended sort direction is
      "sortType": 0,        // Let the page know what the intended sort type is
      "sortNameLink": `?sortType=name&sortDir=`,
      "sortGradeLink": "?sortType=grade&sortDir=",
    }

        // Pick up all the possible query params
        renderParams.sortType = req.query.sortType;                 // sortTypes can be either "student" or "grade"
        renderParams.sortDir = Math.sign(req.query.sortDir);        // Cast it down to -1 or 1. -1 for ascend, +1 for descend
        renderParams.darkMode = Math.abs(req.query.darkMode) % 2;   // Cast it down to 1 or 0. 0 for no darkMode, 1 for darkMode

        if (renderParams.sortDir == 0) {
          renderParams.sortDir = 1;   // Set a default value
        }

        // Populate the students collection with the appropriate sort
        switch (renderParams.sortType) {
          case "name":
            console.log(`sorting by name, ${renderParams.sortDir * -1}`);
            renderParams.sortNameLink = `?sortType=name&sortDir=${renderParams.sortDir * -1}`
            renderParams.students = await studentUtils.listAllStudentsSortedByName(renderParams.sortDir * -1);
            break;
          case "grade":
            console.log(`sorting by grade, ${renderParams.sortDir * -1}`);
            renderParams.students = await studentUtils.listAllStudentsSortedByGrade(renderParams.sortDir  * -1);
            break;
          default:
            console.log(`sorting by default`);

            renderParams.students = await studentUtils.listAllStudentsDefaultSorted();
        }

        // TODO: Handle Darkmode

        res.render('index', renderParams);

      } catch (err){
        next (err)
      }

    } else {
      // Pass to the next handler
      next();
    }

  });


  router.get('/', async (req, res, next) => {

  try {

    let renderParams = {
      "title": 'Advanced!',
      "students": null,     // Store the returned / sorted students collection
      "sortNameLink": "?sortType=name&sortDir=1",
      "sortGradeLink": "?sortType=grade&sortDir=1",
      "darkMode": 0,        // Let the page know intended darkMode state
      "sortDir": 0,         // Let the page know what the intended sort direction is
      "sortType": 0        // Let the page know what the intended sort type is
    }

    // If no valid query params were passed, do a default show
    renderParams.students = await studentUtils.listAllStudentsDefaultSorted();
    res.render('index', renderParams);
  } catch (err) {
    next(err)
  }

});

module.exports = router;
