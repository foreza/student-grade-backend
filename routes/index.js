var express = require('express');
const studentUtils = require('../db/util_students');
var qs = require ('qs');
var router = express.Router();
const StudentModel = require('../models/studentModel');


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
      "students": [],         // Store the returned / sorted students collection
      "editableId": null,
      "sortType": null,
      "sortDir": null,
      "sortObj": null,
      "darkMode": 1           // Let the page know intended darkMode state. -1 for darkMode off, 1 for on.
    }

    try {
      const params = req.query;
      const sort = {};
      if (params.sortType && params.sortDir) {
        const sortTypes = params.sortType.split(',');
        const sortDirections = params.sortDir.split(',');

        for(let i = 0; i < sortTypes.length; i++) {
          const type = sortTypes[i];
          const dir = Number(sortDirections[i]);

          sort[type]= dir;
        }
      }

      /*
      1. Keep track of sort query strings. ie: ?sortTypes=name,grade&sortDir=1,-1
      2. handle toggling sort states
      3. profit
      */
      renderParams.handleSortQuery = function(field) {
        const currentSort = {...sort};
        const currentDir = currentSort[field];
        switch (currentDir) {
          case 1:
            currentSort[field] = -1;
            break;
          case -1:
            delete currentSort[field];
            break;
          default:
            currentSort[field] = 1;
            break;
        }

        const output = {
          sortType: Object.keys(currentSort).join(','),
          sortDir: Object.values(currentSort).join(','),
        }

        return qs.stringify(output);
      }

      renderParams.students = await StudentModel.Get({}, sort);
      renderParams.sortObj = sort;
      renderParams.sortQuery = qs.stringify(req.query);
      console.log(renderParams.sortQuery);
      res.render('index', renderParams);
    } catch (err){
      next (err);
    }

  });

module.exports = router;
