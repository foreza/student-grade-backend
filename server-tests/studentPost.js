const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = require('chai').assert;
const app = require('../app');

const studentModel = require('../models/studentModel');
const testParams = require('./data/testUserSet');
const testUtils = require('./testUtils');


chai.use(chaiHttp);

// This test shall test the following:
// - Add valid student, verify response code 201
// - Check for collision on POST, verify response 409
// - Add invalid students, verify response code 400


describe('Users', function () {
    before(async function () {
        await studentModel.deleteMany({});
    });

    it('Verify database is empty, verify response code (200)', async function () {
        try {
            const response = await chai.request(app).get('/students');
            testUtils.checkBodyLength(response, 0);
            testUtils.checkResStatus(response, 200);
            testUtils.checkHeaderOnSuccess(response);
        } catch (err) {
            throw err;
        }
    });

    it('Add a user 0, verify user 0 returns, verify response code (201)', async function () {

        try {
            const response = await chai.request(app).post('/students').send(testParams.validUsers.test_user_0);
            assert.ownInclude(response.body, testParams.validUsers.test_user_0, 'User 0 should be returned in response');
            assert.equal(response.status, 201, 'Response should be 201');
            assert.equal(response.headers["content-type"] === 'application/json; charset=utf-8', true, 'Headers should match');
        } catch (err) {
            throw err;
        }

    })

    it('Attempt to add user 0 again, verify response code (409)', async function () {

        try {
            const response = await chai.request(app).post('/students').send(testParams.validUsers.test_user_0);
            assert.notOwnInclude(response.body, testParams.validUsers.test_user_0, 'User 0 should not be added due to conflict');
            assert.equal(response.status, 409, 'Response should be 409');
            assert.equal(response.headers["content-type"] === 'text/plain; charset=utf-8', true, 'Headers should match');
        } catch (err) {
            throw err;
        }

    })

    for (let i = 0; i < Object.keys(testParams.invalidUsers).length; ++i) {
        it(`Add invalid user ${i} , verify response code (400)`, async function () {

            console.log(testParams.invalidUsers[`test_user_invalid_${i}`]);

            try {
                const response = await chai.request(app).post('/students').send(testParams.invalidUsers[`test_user_invalid_${i}`]);
                assert.equal(response.status, 400, 'Response should be 400');
                assert.equal(response.headers["content-type"] === 'text/plain; charset=utf-8', true, 'Headers should match');

            } catch (err) {
                throw err;
            }
    
        })
    }

    after(async function () {
        await studentModel.deleteMany({});
    });

});