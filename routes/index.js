var express = require('express');
const studentUtils = require('../db/util_students');
var router = express.Router();



/* Rendering student view */
router.get('/', async (req, res, next) => {

     // Make a render params object to be utilized. Set default values
     let renderParams = {
      "title": 'Advanced!',
      "students": null,         // Store the returned / sorted students collection
      "sortType": null,
      "nameSortDir": null,             // Let the page know what the intended sort direction is. 1 for descend, -1 for ascend
      "gradeSortDir": null,           // Let the page know what the intended sort direction is. 1 for descend, -1 for ascend
      "darkMode": 1           // Let the page know intended darkMode state. -1 for darkMode off, 1 for on.
    }

    try {

      // Get the current state of sort.
      renderParams.nameSortDir = req.query.nameSortDir === undefined ? "1" : Math.sign(req.query.nameSortDir);        // Cast it down to -1 or 1. -1 for ascend, +1 for descend
      renderParams.gradeSortDir = req.query.gradeSortDir === undefined ? "1" : Math.sign(req.query.gradeSortDir);        // Cast it down to -1 or 1. -1 for ascend, +1 for descend

      // sortTypes can be either "name" or "grade". If this is not passed in the query param, assume name sort.
      renderParams.sortType = req.query.sortType === undefined ? "name" : req.query.sortType;                 

        // sortDirection is either -1 or 1. If this is not passed in the query param, assume 1.

        // Populate the students collection with the appropriate sort
        switch (renderParams.sortType) {
          case "name":
            renderParams.students = await studentUtils.listAllStudentsSortedByName(renderParams.nameSortDir);
            break;
          case "grade":
            renderParams.students = await studentUtils.listAllStudentsSortedByGrade(renderParams.gradeSortDir);
            break;
          default:
            renderParams.students = await studentUtils.listAllStudentsDefaultSorted();
        }



          // Initially set darkMode cookie if it's not defined
          if (typeof req.cookies.darkMode === "undefined") {
              console.log("setting initial cookie");
              res.cookie('darkMode', -1); 
              renderParams.darkMode = -1;
          } else {

            console.log("req query darkmode", req.query.darkMode);

            if (typeof req.query.darkMode === "undefined") {
              console.log("dark mode not provided in query")
              renderParams.darkMode = Number(req.cookies.darkMode);
            } else {
              console.log("dark mode was provided in query")
              renderParams.darkMode = Number(req.query.darkMode);
              res.cookie('darkMode', Number(req.query.darkMode)); 
            }

        }
        
   
    

        res.render('index', renderParams);

      } catch (err){
        next (err)
      }

  });


//   router.get('/', async (req, res, next) => {

//   try {

//     let renderParams = {
//       "title": 'Advanced!',
//       "students": null,     // Store the returned / sorted students collection
//       "darkMode": -1,        // Let the page know intended darkMode state
//       "sortDir": 1,         // Let the page know what the intended sort direction is
//       "sortType": 0        // Let the page know what the intended sort type is
//     }

//     // If no valid query params were passed, do a default show
//     renderParams.students = await studentUtils.listAllStudentsDefaultSorted();
//     res.render('index', renderParams);
//   } catch (err) {
//     next(err)
//   }

// });

module.exports = router;
