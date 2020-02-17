const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = require('chai').assert;
const app = require('../app');

const studentModel = require('../models/studentModel');
const testParams = require('./testUserSet');

chai.use(chaiHttp);

/*

Advanced Student API test (GET)

- (GET) Gets a student by a missing/invalid/badly formatted ID or some equivalent
  * Super long numeric id
  * Unexpected characters
  * Wrong route name
  * non-existent
  * 


*/

let test_user_id = "";

describe('Users', function() {
  before(async function() {
    // runs before all tests in this block

    // Delete all students, add a student
    await studentModel.deleteMany({}).then(async function(){
      try {
        const response = await chai.request(app).post('/students').send(testParams.test_user_1);
        test_user_id = response.body._id;
      } catch (err) {
        // something happened with test setup
        throw err;
      }
    });
  });

  it('Get all users after test setup', async function() {
    try {
      const response = await chai.request(app).get('/students');
      assert.equal(response.body.length == 1, true, 'Should have one result');
      assert.equal(response.status, 200, 'Response should be 200');
    } catch (err) {
      throw err;
    }
  });

  it('Get user by the unique provided id', async function() {
    try {
      const response = await chai.request(app).get(`/students/${test_user_id}`);
      assert.ownInclude(response.body, testParams.test_user_1, 'Should be the same user');
      assert.equal(response.status, 200, 'Response should be 200');
    } catch (err) {
      throw err;
    }
  });


  it ('Get user by id with very long (invalid) id, verify response code (404)', async function(){

    try {
      const response = await chai.request(app).get(`/students/342057837450928347520983475209834759238475290384573420578374509283475209834752098347592384752903845734205783745092834752098347520983475923847529038457342057837450928347520983475209834759238475290384573420578374509283475209834752098347592384752903845734205783745092834752098347520983475923847529038457342057837450928347520983475209834759238475290384573420578374509283475209834752098347592384752903845734205783745092834752098347520983475923847529038457342057837450928347520983475209834759238475290384573420578374509283475209834752098347592384752903845734205783745092834752098347520983475923847529038457342057837450928347520983475209834759238475290384573420578374509283475209834752098347592384752903845734205783745092834752098347520983475923847529038457342057837450928347520983475209834759238475290384573420578374509283475209834752098347592384752903845734205783745092834752098347520983475923847529038457342057837450928347520983475209834759238475290384573420578374509283475209834752098347592384752903845734205783745092834752098347520983475923847529038457342057837450928347520983475209834759238475290384573420578374509283475209834752098347592384752903845734205783745092834752098347520983475923847529038457342057837450928347520983475209834759238475290384573420578374509283475209834752098347592384752903845734205783745092834752098347520983475923847529038457342057837450928347520983475209834759238475290384573420578374509283475209834752098347592384752903845734205783745092834752098347520983475923847529038457342057837450928347520983475209834759238475290384573420578374509283475209834752098347592384752903845734205783745092834752098347520983475923847529038457342057837450928347520983475209834759238475290384573420578374509283475209834752098347592384752903845734205783745092834752098347520983475923847529038457342057837450928347520983475209834759238475290384573420578374509283475209834752098347592384752903845734205783745092834752098347520983475923847529038457342057837450928347520983475209834759238475290384573420578374509283475209834752098347592384752903845734205783745092834752098347520983475923847529038457342057837450928347520983475209834759238475290384573420578374509283475209834752098347592384752903845734205783745092834752098347520983475923847529038457342057837450928347520983475209834759238475290384573420578374509283475209834752098347592384752903845734205783745092834752098347520983475923847529038457342057837450928347520983475209834759238475290384573420578374509283475209834752098347592384752903845734205783745092834752098347520983475923847529038457342057837450928347520983475209834759238475290384573420578374509283475209834752098347592384752903845734205783745092834752098347520983475923847529038457342057837450928347520983475209834759238475290384573420578374509283475209834752098347592384752903845734205783745092834752098347520983475923847529038457342057837450928347520983475209834759238475290384573420578374509283475209834752098347592384752903845734205783745092834752098347520983475923847529038457342057837450928347520983475209834759238475290384573420578374509283475209834752098347592384752903845734205783745092834752098347520983475923847529038457342057837450928347520983475209834759238475290384573420578374509283475209834752098347592384752903845734205783745092834752098347520983475923847529038457342057837450928347520983475209834759238475290384573420578374509283475209834752098347592384752903845734205783745092834752098347520983475923847529038457342057837450928347520983475209834759238475290384573420578374509283475209834752098347592384752903845734205783745092834752098347520983475923847529038457342057837450928347520983475209834759238475290384573420578374509283475209834752098347592384752903845734205783745092834752098347520983475923847529038457342057837450928347520983475209834759238475290384573420578374509283475209834752098347592384752903845734205783745092834752098347520983475923847529038457342057837450928347520983475209834759238475290384573420578374509283475209834752098347592384752903845734205783745092834752098347520983475923847529038457342057837450928347520983475209834759238475290384573420578374509283475209834752098347592384752903845734205783745092834752098347520983475923847529038457342057837450928347520983475209834759238475290384573420578374509283475209834752098347592384752903845734205783745092834752098347520983475923847529038457342057837450928347520983475209834759238475290384573420578374509283475209834752098347592384752903845734205783745092834752098347520983475923847529038457342057837450928347520983475209834759238475290384573420578374509283475209834752098347592384752903845734205783745092834752098347520983475923847529038457342057837450928347520983475209834759238475290384573420578374509283475209834752098347592384752903845734205783745092834752098347520983475923847529038457342057837450928347520983475209834759238475290384573420578374509283475209834752098347592384752903845734205783745092834752098347520983475923847529038457342057837450928347520983475209834759238475290384573420578374509283475209834752098347592384752903845734205783745092834752098347520983475923847529038457342057837450928347520983475209834759238475290384573420578374509283475209834752098347592384752903845734205783745092834752098347520983475923847529038457342057837450928347520983475209834759238475290384573420578374509283475209834752098347592384752903845734205783745092834752098347520983475923847529038457342057837450928347520983475209834759238475290384573420578374509283475209834752098347592384752903845734205783745092834752098347520983475923847529038457342057837450928347520983475209834759238475290384573420578374509283475209834752098347592384752903845734205783745092834752098347520983475923847529038457342057837450928347520983475209834759238475290384573420578374509283475209834752098347592384752903845734205783745092834752098347520983475923847529038457342057837450928347520983475209834759238475290384573420578374509283475209834752098347592384752903845734205783745092834752098347520983475923847529038457342057837450928347520983475209834759238475290384573420578374509283475209834752098347592384752903845734205783745092834752098347520983475923847529038457342057837450928347520983475209834759238475290384573420578374509283475209834752098347592384752903845734205783745092834752098347520983475923847529038457342057837450928347520983475209834759238475290384573420578374509283475209834752098347592384752903845734205783745092834752098347520983475923847529038457342057837450928347520983475209834759238475290384573420578374509283475209834752098347592384752903845734205783745092834752098347520983475923847529038457342057837450928347520983475209834759238475290384573420578374509283475209834752098347592384752903845734205783745092834752098347520983475923847529038457342057837450928347520983475209834759238475290384573420578374509283475209834752098347592384752903845734205783745092834752098347520983475923847529038457342057837450928347520983475209834759238475290384573420578374509283475209834752098347592384752903845734205783745092834752098347520983475923847529038457342057837450928347520983475209834759238475290384573420578374509283475209834752098347592384752903845734205783745092834752098347520983475923847529038457342057837450928347520983475209834759238475290384573420578374509283475209834752098347592384752903845734205783745092834752098347520983475923847529038457342057837450928347520983475209834759238475290384573420578374509283475209834752098347592384752903845734205783745092834752098347520983475923847529038457'`);
      assert.equal(response.status, 404, 'Response should be 404');
    } catch (err) {
      throw err;

    }

  })

  it ('Get user by id with special characters, verify response code (404)', async function(){

    try {
      const response = await chai.request(app).get(`/students/~!@#$%^&*()_+{}|:"<>?,./;[]'`);
      assert.equal(response.status, 404, 'Response should be 404');
    } catch (err) {
      throw err;

    }

  })

  it ('Get user with an incorrect route name (/studen) , verify response code (404)', async function(){

    try {
      const response = await chai.request(app).get(`/studen/123`);
      assert.equal(response.status, 404, 'Response should be 404');
    } catch (err) {
      throw err;

    }

  })

  it ('Get user with a nonexisting student , verify response code (404)', async function(){

    try {
      const response = await chai.request(app).get(`/student/123`);
      assert.equal(response.status, 404, 'Response should be 404');
    } catch (err) {
      throw err;

    }

  })


  it('Get user (again) by the unique provided id', async function() {
    try {
      const response = await chai.request(app).get(`/students/${test_user_id}`);
      assert.ownInclude(response.body, testParams.test_user_1, 'Should be the same user');
      assert.equal(response.status, 200, 'Response should be 200');
    } catch (err) {
      throw err;
    }
  });

  it('Get user (again) by the unique provided id, but add something to the id', async function() {
    try {
      const response = await chai.request(app).get(`/students/${test_user_id + 1}`);
      assert.equal(response.status, 404, 'Response should be 404');
      assert.notOwnInclude(response.body, testParams.test_user_1, 'Should NOT be the same user');
    } catch (err) {
      throw err;
    }
  });

  after(async function() {
    // runs after all tests in this block
    await studentModel.deleteMany({});
  });

});