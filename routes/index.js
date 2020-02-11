var express = require('express');
const studentUtils = require('../db/util_students');
var router = express.Router();



router.post('/', async (req, res, next) => {

  try {
    const result = await studentUtils.createStudent(req.body)
    res.redirect('/')
} catch (err) {
    // On error, pass it off to somebody else!
    next(err)
}

})

router.get('/delete/:id', async (req, res, next) => {

  try {
    const result = await studentUtils.deleteStudentWithUID(req.params.id);
    res.redirect('/')
} catch (err) {
    next(err)
}

});

/* Rendering student view */
router.get('/', async (req, res, next) => {

     // Make a render params object to be utilized. Set default values
     let renderParams = {
      "title": 'Advanced!',
      "students": null,         // Store the returned / sorted students collection
      "sortType": null,
      "sortDir": null,
      "darkMode": 1           // Let the page know intended darkMode state. -1 for darkMode off, 1 for on.
    }

    try {

      // Get the current state of sort.
      renderParams.sortDir = req.query.sortDir === undefined ? "1" : Math.sign(req.query.sortDir) * -1;        // Cast it down to -1 or 1. -1 for ascend, +1 for descend

      // sortTypes can be either "name" or "grade". If this is not passed in the query param, assume name sort.
      renderParams.sortType = req.query.sortType === undefined ? "name" : req.query.sortType;                 

        // sortDirection is either -1 or 1. If this is not passed in the query param, assume 1.

        // Populate the students collection with the appropriate sort
        switch (renderParams.sortType) {
          case "name":
            renderParams.students = await studentUtils.listAllStudentsSortedByName(renderParams.sortDir);
            break;
          case "grade":
            renderParams.students = await studentUtils.listAllStudentsSortedByGrade(renderParams.sortDir);
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
