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
  * [Nested] Compares sorted by name ascending, then grade ascending
  * [Nested] Compares sorted by name ascending, then grade descending
  * [Nested] Compares sorted by name descending, then grade ascending
  * [Nested] Compares sorted by name descending, then grade descending
*/

describe('Users', function () {
  before(async function () {
    await studentModel.deleteMany({}).then(async function () {
      try {
        await studentModel.collection.insertMany(testParams.test_user_set_name);
      } catch (err) {
        throw err;
      }
    });
  });

  it(`Get all ${testParams.test_user_set_name.length} users after test setup`, async function () {
    try {
      const response = await chai.request(app).get('/students');
      testUtils.checkBodyLength(response, testParams.test_user_set_name.length);
      testUtils.checkResStatus(response, 200);
      testUtils.checkHeaderOnSuccess(response);
    } catch (err) {
      throw err;
    }
  });

  it(`Compares sorted by name ascending, then grade ascending`, async function () {
    try {
      const response = await chai.request(app).get('/students/?sort[]=name,grade&dir[]=-1,-1');
      assert.deepEqual(response.body, testParams.test_user_set_name_asc_grade_asc, `Should mostly be equal...`)
      assert.equal(response.status, 200, 'Response should be 200');
    } catch (err) {
      throw err;
    }

  })

  it(`Compares sorted by name ascending, then grade descending`, async function () {
    try {
      const response = await chai.request(app).get('/students/?sort[]=name,grade&dir[]=-1,1');
      assert.deepEqual(response.body, testParams.test_user_set_name_asc_grade_desc, `Should mostly be equal...`)
      assert.equal(response.status, 200, 'Response should be 200');
    } catch (err) {
      throw err;
    }

  })

  it(`Compares sorted by name descending, then grade ascending`, async function () {
    try {
      const response = await chai.request(app).get('/students/?sort[]=name,grade&dir[]=1,-1');
      assert.deepEqual(response.body, testParams.test_user_set_name_desc_grade_asc, `Should mostly be equal...`)
      assert.equal(response.status, 200, 'Response should be 200');
    } catch (err) {
      throw err;
    }

  })

  it(`Compares sorted by name descending, then grade descending`, async function () {
    try {
      const response = await chai.request(app).get('/students/?sort[]=name,grade&dir[]=1,1');
      assert.deepEqual(response.body, testParams.test_user_set_name_desc_grade_desc, `Should mostly be equal...`)
      assert.equal(response.status, 200, 'Response should be 200');
    } catch (err) {
      throw err;
    }

  })

  after(async function () {
    await studentModel.deleteMany({});
  });

});