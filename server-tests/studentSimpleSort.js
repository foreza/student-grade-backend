const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = require('chai').assert;
const app = require('../app');

const studentModel = require('../models/studentModel');
const testParams = require('./data/SimpleSortUserSet');
const testUtils = require('./testUtils');


chai.use(chaiHttp);

/*

Advanced Student API test (GET/Sort)

- (GET) Gets a student collection and performs various sorting operations on it
  * [Simple] Verifies all X students are present
  * [Simple] Compares sorted by name ascending
  * [Simple] Compares sorted by name descending
  * [Simple] Compares sorted by grade ascending
  * [Simple] Compares sorted by grade descending
*/

describe('Users', function () {
  before(async () => {

    await studentModel.deleteMany({}).then(async () => {
      try {
        await studentModel.collection.insertMany(testParams.test_user_set);
      } catch (err) {
        throw err;
      }
    });
  });

  it(`Get all ${testParams.test_user_set.length} users after test setup`, async () => {
    try {
      const response = await chai.request(app).get('/students');
      testUtils.checkBodyLength(response, testParams.test_user_set.length);
      testUtils.checkResStatus(response, 200);
      testUtils.checkHeaderOnSuccess(response);
    } catch (err) {
      throw err;
    }
  });

  it(`Compare sorted by name ascending`, async () => {
    try {
      const response = await chai.request(app).get('/students/?sort=name&dir=-1');
      assert.sameDeepOrderedMembers(response.body, testParams.test_user_set_sortNameAscending, `Should mostly be equal...`)
      assert.equal(response.status, 200, 'Response should be 200');
    } catch (err) {
      throw err;
    }
  });


  it(`Compares sorted by name descending`, async () => {
    try {
      const response = await chai.request(app).get('/students/?sort=name&dir=1');
      assert.deepEqual(response.body, testParams.test_user_set_sortNameDescending, `Should mostly be equal...`)
      assert.equal(response.status, 200, 'Response should be 200');
    } catch (err) {
      throw err;
    }

  })
  it(`Compares sorted by grade ascending`, async () => {
    try {
      const response = await chai.request(app).get('/students/?sort=grade&dir=1');
      assert.deepEqual(response.body, testParams.test_user_set_sortGradeAscending, `Should mostly be equal...`)
      assert.equal(response.status, 200, 'Response should be 200');
    } catch (err) {
      throw err;
    }

  })
  it(`Compares sorted by grade descending`, async () => {
    try {
      const response = await chai.request(app).get('/students/?sort=grade&dir=-1');
      assert.deepEqual(response.body, testParams.test_user_set_sortGradeDescending, `Should mostly be equal...`)
      assert.equal(response.status, 200, 'Response should be 200');
    } catch (err) {
      throw err;
    }

  })

  after(async () => {
    await studentModel.deleteMany({});
  });

});