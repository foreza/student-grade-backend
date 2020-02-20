const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = require('chai').assert;
const app = require('../app');

const studentModel = require('../models/studentModel');
const testParams = require('./data/testSortUserSet');

chai.use(chaiHttp);

/*

Advanced Student API test (GET/Sort)

- (GET) Gets a student collection and performs various sorting operations on it
  * [Simple] Verifies all X students are present
  * [Simple] Compares sorted by name ascending
  * [Simple] Compares sorted by name descending
  * [Simple] Compares sorted by grade ascending
  * [Simple] Compares sorted by grade descending
  * [Nested] Compares sorted by name ascending, then grade ascending
  * [Nested] Compares sorted by name ascending, then grade descending
  * [Nested] Compares sorted by name descending, then grade ascending
  * [Nested] Compares sorted by name descending, then grade descending
  * [Nested] Compares sorted by grade ascending, then name ascending
  * [Nested] Compares sorted by grade ascending, then name descending
  * [Nested] Compares sorted by grade descending, then name ascending
  * [Nested] Compares sorted by grade descending, then name descending
*/

describe('Users', function() {
  before(async function() {
    // runs before all tests in this block

    // Delete all students, add test student collection
    await studentModel.deleteMany({}).then(async function(){
      try {
        await studentModel.collection.insertMany(testParams.test_user_set);
      } catch (err) {
        // something happened with test setup
        throw err;
      }
    });
  });

  it(`Get all ${testParams.test_user_set.length} users after test setup`, async function() {
    try {
      const response = await chai.request(app).get('/students');
      assert.equal(response.body.length === testParams.test_user_set.length, true, `Should have ${testParams.test_user_set.length}`);
      assert.equal(response.status, 200, 'Response should be 200');
    } catch (err) {
      throw err;
    }
  });

  it(`Compare sorted by name ascending`, async function() {
    try {
      const response = await chai.request(app).get('/students/?sort[]=name&dir[]=-1');  
      assert.sameDeepOrderedMembers(response.body, testParams.test_user_set_sortNameAscending, `Should mostly be equal...`)
      assert.equal(response.status, 200, 'Response should be 200');
    } catch (err) {
      throw err;
    }
  });

  
  it(`Compares sorted by name descending`, async function(){
    try {
      const response = await chai.request(app).get('/students/?sort[]=name&dir[]=1');
      assert.deepEqual(response.body, testParams.test_user_set_sortNameDescending, `Should mostly be equal...`)
      assert.equal(response.status, 200, 'Response should be 200');
    } catch (err) {
      throw err;
    }

  })
  it(`Compares sorted by grade ascending`, async function(){
    try {
      const response = await chai.request(app).get('/students');
      // TODO: Implement
      assert.equal(response.status, 200, 'Response should be 200');
    } catch (err) {
      throw err;
    }

  })
  it(`Compares sorted by grade descending`, async function(){
    try {
      const response = await chai.request(app).get('/students');
      // TODO: Implement
      assert.equal(response.status, 200, 'Response should be 200');
    } catch (err) {
      throw err;
    }

  })
  it(`Compares sorted by name ascending, then grade ascending`, async function(){
    try {
      const response = await chai.request(app).get('/students');
      // TODO: Implement
      assert.equal(response.status, 200, 'Response should be 200');
    } catch (err) {
      throw err;
    }

  })
  it(`Compares sorted by name ascending, then grade descending`, async function(){
    try {
      const response = await chai.request(app).get('/students');
      // TODO: Implement
      assert.equal(response.status, 200, 'Response should be 200');
    } catch (err) {
      throw err;
    }

  })
  it(`Compares sorted by name descending, then grade ascending`, async function(){
    try {
      const response = await chai.request(app).get('/students');
      // TODO: Implement
      assert.equal(response.status, 200, 'Response should be 200');
    } catch (err) {
      throw err;
    }

  })
  it(`Compares sorted by name descending, then grade descending`, async function(){
    try {
      const response = await chai.request(app).get('/students');
      // TODO: Implement
      assert.equal(response.status, 200, 'Response should be 200');
    } catch (err) {
      throw err;
    }

  })
  it(`Compares sorted by grade ascending, then name ascending`, async function(){
    try {
      const response = await chai.request(app).get('/students');
      // TODO: Implement
      assert.equal(response.status, 200, 'Response should be 200');
    } catch (err) {
      throw err;
    }

  })
  it(`Compares sorted by grade ascending, then name descending`, async function(){
    try {
      const response = await chai.request(app).get('/students');
      // TODO: Implement
      assert.equal(response.status, 200, 'Response should be 200');
    } catch (err) {
      throw err;
    }

  })
  it(`Compares sorted by grade descending, then name ascending`, async function(){
    try {
      const response = await chai.request(app).get('/students');
      // TODO: Implement
      assert.equal(response.status, 200, 'Response should be 200');
    } catch (err) {
      throw err;
    }

  })
  it(`Compares sorted by grade descending, then name descending`, async function(){
    try {
      const response = await chai.request(app).get('/students');
      // TODO: Implement
      assert.equal(response.status, 200, 'Response should be 200');
    } catch (err) {
      throw err;
    }

  })
  

  after(async function() {
    // runs after all tests in this block
    // await studentModel.deleteMany({});
  });

});