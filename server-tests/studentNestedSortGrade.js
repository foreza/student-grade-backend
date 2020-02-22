const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = require('chai').assert;
const app = require('../app');

const studentModel = require('../models/studentModel');
const testParams = require('./data/NestedSortUserSet');
const testUtils = require('./testUtils');


chai.use(chaiHttp);

/*

Advanced Student API test (GET/Sort)

- (GET) Gets a student collection and performs various sorting operations on it
  * [Nested] Compares sorted by grade ascending, then name ascending
  * [Nested] Compares sorted by grade ascending, then name descending
  * [Nested] Compares sorted by grade descending, then name ascending
  * [Nested] Compares sorted by grade descending, then name descending
*/

describe('Users', function () {
  before(async function () {
    // runs before all tests in this block

    // Delete all students, add test student collection
    await studentModel.deleteMany({}).then(async function () {
      try {
        await studentModel.collection.insertMany(testParams.test_user_set_grade);
      } catch (err) {
        // something happened with test setup
        throw err;
      }
    });
  });

  it(`Get all ${testParams.test_user_set_grade.length} users after test setup`, async function () {
    try {
      const response = await chai.request(app).get('/students');

      testUtils.checkBodyLength(response, testParams.test_user_set_grade.length);
      testUtils.checkResStatus(response, 200);
      testUtils.checkHeaderOnSuccess(response);
    } catch (err) {
      throw err;
    }
  });

  it(`Compares sorted by grade ascending, then name ascending`, async function () {
    try {
      const response = await chai.request(app).get('/students/?sort[]=grade,name&dir[]=-1,-1');
      assert.deepEqual(response.body, testParams.test_user_set_grade_asc_name_asc, `Should mostly be equal...`)
      assert.equal(response.status, 200, 'Response should be 200');
    } catch (err) {
      throw err;
    }

  })
  it(`Compares sorted by grade ascending, then name descending`, async function () {
    try {
      const response = await chai.request(app).get('/students/?sort[]=grade,name&dir[]=-1,1');
      assert.deepEqual(response.body, testParams.test_user_set_grade_asc_name_desc, `Should mostly be equal...`)
      assert.equal(response.status, 200, 'Response should be 200');
    } catch (err) {
      throw err;
    }

  })
  it(`Compares sorted by grade descending, then name ascending`, async function () {
    try {
      const response = await chai.request(app).get('/students/?sort[]=grade,name&dir[]=1,-1');
      assert.deepEqual(response.body, testParams.test_user_set_grade_desc_name_asc, `Should mostly be equal...`)
      assert.equal(response.status, 200, 'Response should be 200');
    } catch (err) {
      throw err;
    }

  })
  it(`Compares sorted by grade descending, then name descending`, async function () {
    try {
      const response = await chai.request(app).get('/students/?sort[]=grade,name&dir[]=1,1');
      assert.deepEqual(response.body, testParams.test_user_set_grade_desc_name_desc, `Should mostly be equal...`)
      assert.equal(response.status, 200, 'Response should be 200');
    } catch (err) {
      throw err;
    }

  })


  after(async function () {
    // runs after all tests in this block
    // await studentModel.deleteMany({});
  });

});