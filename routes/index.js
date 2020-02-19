var express = require('express');
const studentUtils = require('../db/util_students');
var qs = require ('qs');
var router = express.Router();



router.post('/', async (req, res, next) => {

  try {
    await studentUtils.createStudent(req.body)
    res.redirect(util_generateRedirectStringFromReq(req))
} catch (err) {
    next(err)
}

})

router.get('/delete/:id', async (req, res, next) => {

  try {
    await studentUtils.deleteStudentWithUID(req.params.id);
    res.redirect(util_generateRedirectStringFromReq(req));
} catch (err) {
    next(err)
}

});


// TODO: Middleware function to redirect
function util_generateRedirectStringFromReq(req, res, next){
  let sortDir = req.query.sortDir === undefined ? "1" : Math.sign(req.query.sortDir);
  let sortType = req.query.sortType === undefined ? "name" : req.query.sortType;  
  return `/?sortType=${sortType}&sortDir=${sortDir}`;  
}



router.post('/save/:id', async (req, res, next) => {

  try {
    await studentUtils.updateStudentWithUID(req.params.id, req.body);
    res.redirect(util_generateRedirectStringFromReq(req))
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
      "editableId": null,
      "sortType": null,
      "sortDir": null,
      "sortObj": null,
      "darkMode": 1           // Let the page know intended darkMode state. -1 for darkMode off, 1 for on.
    }

   


    try {

      // Get the current state of sort.
      renderParams.sortDir = req.query.sortDir === undefined ? "1" : Math.sign(req.query.sortDir);        // Cast it down to -1 or 1. -1 for ascend, +1 for descend

      // sortTypes can be either "name" or "grade". If this is not passed in the query param, assume name sort.
      renderParams.sortType = req.query.sortType === undefined ? "name" : req.query.sortType;       
      
      renderParams.editableId = req.query.editable === undefined ? "" : req.query.editable;        // Cast it down to -1 or 1. -1 for ascend, +1 for descend
      console.log("editable id: " + req.query.editable);

        // sortDirection is either -1 or 1. If this is not passed in the query param, assume 1.

        

      // WIP: Nested Sort implementation hook into main API
      // Sample test: http://localhost:3000/?sort[]=name,grade&dir[]=-1,-1

      renderParams.sortObj = [];               // Define a sortObj that we will pass to the DB

      let sortString = qs.parse(req.query, { comma: true });
      if (sortString.sort != undefined && sortString.dir != undefined) {
        sortTypes = (sortString.sort[0]).split(",");
        sortDir = (sortString.dir[0]).split(",");

        for (var i = 0; i < sortTypes.length; ++i) {
          // sortTypes can be either "name" or "grade". If this is not passed in the query param, assume name sort.
          let tSort = sortTypes[i] === undefined ? "name" : sortTypes[i];   
          let tDir = sortDir[i] === undefined ? "1" : Math.sign(sortDir[i]);        // Cast it down to -1 or 1. -1 for ascend, +1 for descend
          let sortParam = [tSort,tDir];
    
          renderParams.sortObj.push(sortParam);
        }
      }

        if (renderParams.sortObj.length > 0){
          // v2 sort - nested sort (only through API presently)
          console.warn('Using v2 (nested sort) as sortObj params are provided')
          renderParams.students = await studentUtils.listAllStudentsAndSort(renderParams.sortObj);          

        } else {
            // v1 sort - basic simple sort
            console.warn('Using v1 (basic sort)');
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

module.exports = router;
