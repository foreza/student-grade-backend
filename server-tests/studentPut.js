const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = require('chai').assert;
const app = require('../app');

const studentModel = require('../models/studentModel');
const testParams = require('./data/testUserSet');

chai.use(chaiHttp);

// This test shall test the following:
// - Add 2 valid students, then make various (invalid and valid) modifications to it



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

    it('Add a user (1), verify user 1 returns, verify response code (201)', async function () {

        try {
            const response = await chai.request(app).post('/students').send(testParams.validUsers.test_user_0);
            assert.ownInclude(response.body, testParams.validUsers.test_user_0, 'UserA should be returned in response');
            assert.equal(response.status, 201, 'Response should be 201');
            assert.equal(response.headers["content-type"] === 'application/json; charset=utf-8', true, 'Headers should match');
        } catch (err) {
            throw err;
        }

    })

    it('Add a user 2, verify user 2 returns, verify response code (201)', async function () {

        try {
            const response = await chai.request(app).post('/students').send(testParams.validUsers.test_user_1);
            assert.ownInclude(response.body, testParams.validUsers.test_user_1, 'UserA should be returned in response');
            assert.equal(response.status, 201, 'Response should be 201');
            assert.equal(response.headers["content-type"] === 'application/json; charset=utf-8', true, 'Headers should match');
        } catch (err) {
            throw err;
        }

    })

    for (let i = 0; i < Object.keys(testParams.modifiedUsers).length; ++i) {

        const t1ID = testParams.validUsers.test_user_0._id;

        it(`Attempt to update user 1 with VALID test information in ${i} , verify response code (400)`, async function () {

            const tUser = testParams.modifiedUsers[`test_user_${i}`];

            try {
                const response = await chai.request(app).put(`/students/${t1ID}`).send(tUser);
                assert.equal(response.status, 200, 'Response should be 200');
                assert.equal(response.headers["content-type"] === 'application/json; charset=utf-8', true, 'Headers should match');
            } catch (err) {
                throw err;
            }
    
        })
    }

    for (let i = 0; i < Object.keys(testParams.invalidUsers).length; ++i) {

        const t1ID = testParams.validUsers.test_user_0._id;

        it(`Attempt to update user 1 with invalid test information in ${i} , verify response code (400)`, async function () {

            const tUser = testParams.invalidUsers[`test_user_invalid_${i}`];

            try {
                const response = await chai.request(app).put(`/students/${t1ID}`).send(tUser);
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