const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = require('chai').assert;
const app = require('../app');

const studentModel = require('../models/studentModel')

chai.use(chaiHttp);

/*

Smoketest:

This smoketest shall do the following:
- (N/A)   Drop the current (local) student model database. 
- (GET)   Verify database is empty, verify response code (200)
- (POST)  Add a user (A), verify user A returns, verify response code (201)
- (POST)  Add a second user (B), verify user A is not returned, verify response code (201)
- (GET)   Get user A, verify user A is returned, verify response code (200)
- (GET)   Get nonexistent user by id, verify response code (404)
- (GET)   Verify that database contains 2 users, verify response code (200)
- (PUT)   Modify properties of user A, verify response code (200)
- (GET)   Verify property update of user A, verify response code (200)
- (DEL)   Delete user B, verify response code (200)
- (GET)   Get size of database (1), verify response code
- (DEL)   Delete user B, verify response code (404)
- (PUT)   Modify user B, verify response code (404)
- (GET)   Get user B, verify response code (404)
- (DEL)   Delete user A, verify response code (200)
- (GET)   Verify students database is 0, verify response code (200)
*/


// Test params
const userA = { name: 'Jason Chiu', grade: 50 };
const userA_Modified = { name: 'Jason Choo', grade: 59 };
const userB = { name: 'Yvonne Yuan', grade: 99 };
let userARandId = "";
let userBRandId = "";

describe('Users', function() {
  before(async function() {
    
    // Drop the current (local) student model database.  
    await studentModel.deleteMany({});
  });

  it('Verify database is empty, verify response code (200)', async function() {
    try {
      const response = await chai.request(app).get('/students');
      assert.equal(response.body.length == 0, true, 'Results should be empty');
      assert.equal(response.status, 200, 'Response should be 200');
    } catch (err) {
      throw err;
    }
  });

  it ('Add a user (A), verify user A returns, verify response code (201)', async function() {

    try {
      const response = await chai.request(app).post('/students').send(userA);
      assert.ownInclude(response.body, userA, 'UserA should be returned in response');
      assert.equal(response.status, 201, 'Response should be 201');

      // Save userA's unique ID to be used later
      userARandId = response.body._id;
    } catch (err){
      throw err;
    }

  })

  it ('Add a second user (B), verify user A is not returned, verify response code (201)', async function() {

    try {
      const response = await chai.request(app).post('/students').send(userB);
      assert.notOwnInclude(response.body, userA, 'UserA should NOT be returned in response');
      assert.equal(response.status, 201, 'Response should be 201');

      // Save userB's unique ID to be used later
      userBRandId = response.body._id;
    } catch (err){
      throw err;
    }

  })

  it ('Get user A, verify user A is returned, verify response code (200)', async function(){

    try {
      const response = await chai.request(app).get(`/students/${userARandId}`);
      assert.ownInclude(response.body, userA, 'UserA should be returned in response');
      assert.equal(response.status, 200, 'Response should be 200');
    } catch (err) {
      throw err;
    }

  })

  it ('Get nonexistent user by id, verify response code (404)', async function(){

    try {
      const response = await chai.request(app).get(`/students/0000000000000`);
      assert.equal(response.status, 404, 'Response should be 404');
    } catch (err) {
      throw err;
    }

  })

  it ('Verify that database contains 2 users, verify response code (200)', async function(){

    try {
      const response = await chai.request(app).get('/students');
      assert.equal(response.body.length === 2, true, 'Results should be 2 users');
      assert.equal(response.status, 200, 'Response should be 200');
    } catch (err) {
      throw(err);
    }

  })

  it ('Modify properties of user A, verify response code (200)', async function(){
    try {
      
      const response = await chai.request(app).put(`/students/${userARandId}`).send(userA_Modified);
      assert.ownInclude(response.body, userA, 'User A should be returned');
      assert.equal(response.status, 200, 'Response should be 200');

    } catch (err){
      throw (err)
    }
  })

  it ('Verify property update of user A, verify response code (200)', async function(){

    try {
      const response = await chai.request(app).get(`/students/${userARandId}`);
      assert.notOwnInclude(response.body, userA, 'UserA should not be returned in response');
      assert.ownInclude(response.body, userA_Modified, 'Modified UserA should be returned in response');
      assert.equal(response.status, 200, 'Response should be 200');
    } catch (err) {
      throw err;
    }

  })

  it ('Delete user B, verify response code (200)', async function(){

    try {
      const response = await chai.request(app).delete(`/students/${userBRandId}`);
      assert.equal(response.status, 200, 'Response should be 200');
    } catch (err) {
      throw err;
    }

  })

  it ('Modify properties of user B, verify response code (404)', async function(){
    try {
      
      const response = await chai.request(app).put(`/students/${userBRandId}`).send(userB);
      assert.equal(response.status, 404, 'Response should be 404');
    } catch (err){
      throw (err)
    }
  })

  it ('Get user B, verify response code (404)', async function() {
    try {
      const response = await chai.request(app).get(`/students/${userBRandId}`);
      assert.equal(response.status, 404, 'Response should be 404');
    } catch (err) {
      throw (err)
    }
  })

  it ('Delete user BA verify response code (200)', async function(){

    try {
      const response = await chai.request(app).delete(`/students/${userARandId}`);
      assert.equal(response.status, 200, 'Response should be 200');
    } catch (err) {
      throw err;
    }

  })

  it('Verify database is empty, verify response code (200)', async function() {
    try {
      const response = await chai.request(app).get('/students');
      assert.equal(response.body.length == 0, true, 'Results should be empty');
      assert.equal(response.status, 200, 'Response should be 200');
    } catch (err) {
      throw err;
    }
  });

  after(async function() {
    
    // Drop the current (local) student model database.  
    await studentModel.deleteMany({});
  });

});