const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = require('chai').assert;
const app = require('../app');

const studentModel = require('../models/studentModel');
const testParams = require('./data/testUserSet');

chai.use(chaiHttp);

// This test shall test the following:
// - Add a valid student, verify response code 201


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

    it('Add an invalid user 1, verify response code (400)', async function () {

        try {
            const response = await chai.request(app).post('/students').send(testParams.invalidUsers.test_user_1);
            assert.equal(response.status, 400, 'Response should be 400');
        } catch (err) {
            throw err;
        }

    })

    after(async function () {
        await studentModel.deleteMany({});
    });

});