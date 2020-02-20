const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = require('chai').assert;
const app = require('../app');

const studentModel = require('../models/studentModel')
const testParams = require('./data/testUserSet');

chai.use(chaiHttp);

/*

Smoketest:

This smoketest shall do the following:
- (N/A)   Drop the current (local) student model database. 
- (GET)   Verify database is empty, verify response code (200)
- (POST)  Add a user (A), verify user A returns, verify response code (201)
- (POST)  Add a second user (B), verify user A is not returned, verify response code (201)
- (GET)   Get user A, verify user A is returned, verify response code (200)
- (GET)   Get nonexistent user by id, verify response code (400)
- (GET)   Verify that database contains 2 users, verify response code (200)
- (PUT)   Modify properties of user A, verify response code (200)
- (GET)   Verify property update of user A, verify response code (200)
- (DEL)   Delete user B, verify response code (200)
- (GET)   Get size of database (1), verify response code
- (DEL)   Delete user B, verify response code (404)
- (PUT)   Modify user B, verify response code (404)
- (GET)   Get user B, verify response code (400)
- (DEL)   Delete user A, verify response code (200)
- (GET)   Verify students database is 0, verify response code (200)
*/


describe('Users', function () {
  before(async function () {
    await studentModel.deleteMany({});
  });

  it('Verify database is empty, verify response code (200)', async function () {
    try {
      const response = await chai.request(app).get('/students');
      assert.equal(response.body.length === 0, true, 'Results should be empty');
      assert.equal(response.status, 200, 'Response should be 200');
      // TODO: Test headers
    } catch (err) {
      throw err;
    }
  });

  it('Add a user (A), verify user A returns, verify response code (201)', async function () {

    try {
      const response = await chai.request(app).post('/students').send(testParams.validUsers.test_user_1);
      assert.ownInclude(response.body, testParams.validUsers.test_user_1, 'UserA should be returned in response');
      assert.equal(response.status, 201, 'Response should be 201');
    } catch (err) {
      throw err;
    }

  })

  it('Add a second user (B), verify user A is not returned, verify response code (201)', async function () {

    try {
      const response = await chai.request(app).post('/students').send(testParams.validUsers.test_user_2);
      assert.notOwnInclude(response.body, testParams.validUsers.test_user_1, 'UserA should NOT be returned in response');
      assert.equal(response.status, 201, 'Response should be 201');
    } catch (err) {
      throw err;
    }

  })

  it('Get user A, verify user A is returned, verify response code (200)', async function () {

    try {
      const response = await chai.request(app).get(`/students/${testParams.validUsers.test_user_1._id}`);
      assert.ownInclude(response.body, testParams.validUsers.test_user_1, `${testParams.validUsers.test_user_1.name} should be returned in response`);
      assert.equal(response.status, 200, 'Response should be 200');
    } catch (err) {
      throw err;
    }

  })

  it('Get nonexistent user by id, verify response code (400)', async function () {

    try {
      const response = await chai.request(app).get(`/students/0000000000000`);
      assert.equal(response.status, 400, 'Response should be 400'); // TODO: Should equal 400 instead of 404
    } catch (err) {
      throw err;
    }

  })

  it('Verify that database contains 2 users, verify response code (200)', async function () {

    try {
      const response = await chai.request(app).get('/students');
      assert.equal(response.body.length === Object.keys(testParams.validUsers).length, true, 'Results should be 2 users');
      assert.equal(response.status, 200, 'Response should be 200');
    } catch (err) {
      throw (err);
    }

  })

  it('Modify properties of user A, verify response code (200)', async function () {
    try {

      const response = await chai.request(app).put(`/students/${testParams.validUsers.test_user_1._id}`).send(testParams.modifiedUsers.test_user_1);
      assert.ownInclude(response.body, testParams.validUsers.test_user_1, 'User 1 should be returned');
      assert.equal(response.status, 200, 'Response should be 200');

    } catch (err) {
      throw (err)
    }
  })

  it('Verify property update of user A, verify response code (200)', async function () {

    try {
      const response = await chai.request(app).get(`/students/${testParams.validUsers.test_user_1._id}`);
      assert.notOwnInclude(response.body, testParams.validUsers.test_user_1, 'User 1 should not be returned in response');
      assert.ownInclude(response.body, testParams.modifiedUsers.test_user_1, 'Modified User 1 should be returned in response');
      assert.equal(response.status, 200, 'Response should be 200');
    } catch (err) {
      throw err;
    }

  })

  it('Delete user B, verify response code (200)', async function () {

    try {
      const response = await chai.request(app).delete(`/students/${testParams.validUsers.test_user_2._id}`);
      assert.equal(response.status, 200, 'Response should be 200');
    } catch (err) {
      throw err;
    }

  })

  it('Modify properties of user B, verify response code (404)', async function () {
    try {

      const response = await chai.request(app).put(`/students/${testParams.validUsers.test_user_2._id}`).send(testParams.validUsers.test_user_2);
      assert.equal(response.status, 404, 'Response should be 404');   // TODO: should this be sending a 404 or not? 
    } catch (err) {
      throw (err)
    }
  })

  it('Get user B, verify response code (400)', async function () {
    try {
      const response = await chai.request(app).get(`/students/${testParams.validUsers.test_user_2._id}`);
      assert.equal(response.status, 400, 'Response should be 400');
    } catch (err) {
      throw (err)
    }
  })

  it('Delete user B, verify response code (200)', async function () {

    try {
      const response = await chai.request(app).delete(`/students/${testParams.validUsers.test_user_1._id}`);
      assert.equal(response.status, 200, 'Response should be 200');
    } catch (err) {
      throw err;
    }

  })

  it('Verify database is empty, verify response code (200)', async function () {
    try {
      const response = await chai.request(app).get('/students');
      assert.equal(response.body.length === 0, true, 'Results should be empty');
      assert.equal(response.status, 200, 'Response should be 200');
    } catch (err) {
      throw err;
    }
  });

  after(async function () {
    await studentModel.deleteMany({});
  });

});