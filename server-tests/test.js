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
- (POST)  Add a user (A), verify response code (201)
- (POST)  Add a second user (B), verify response code (201)
- (GET)   Get user A, verify user A is returned, verify response code (200)
- (GET)   Get nonexistent user by id, verify response code (404)
- (GET)   Verify that database contains 2 users, verify response code (200)
- (PUT)   Modify one property of user A, verify response code (200)
- (DEL)   Delete user B, verify response code (200)
- (GET)   Get size of database (1), verify response code
- (DEL)   Delete user B, verify response code (404)
- (PUT)   Modify user B, verify response code (404)
- (GET)   Get user B, verify response code (404)
- (DEL)   Delete user A, verify response code (200)
- (GET)   Verify students database is 0, verify response code (200)


*/

const userA = {
  name: 'Jason Chiu',
  grade: 50
}

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

  it ('Add a user (A), verify response code (201)', async function() {

    try {
      const response = await chai.request(app).post('/students').send(userA);
      assert.ownInclude(response.body, userA, 'UserA should be returned in response');
      assert.equal(response.status, 201, 'Response should be 201');
    } catch (err){
      throw err;
    }

  })

});