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

    for (let i = 0; i < Object.keys(testParams.invalidUsers).length; ++i) {
        it(`Add invalid user ${i} , verify response code (400)`, async function () {

            console.log(testParams.invalidUsers[`test_user_invalid_${i}`]);

            try {
                const response = await chai.request(app).post('/students').send(testParams.invalidUsers[`test_user_invalid_${i}`]);
                assert.equal(response.status, 400, 'Response should be 400');
            } catch (err) {
                throw err;
            }
    
        })
    }

    // it('Add invalid user 0, verify response code (400)', async function () {

    //     try {
    //         const response = await chai.request(app).post('/students').send(testParams.invalidUsers.test_user_invalid_0);
    //         assert.equal(response.status, 400, 'Response should be 400');
    //     } catch (err) {
    //         throw err;
    //     }

    // })

    // it('Add invalid user 1, verify response code (400)', async function () {

    //     try {
    //         const response = await chai.request(app).post('/students').send(testParams.invalidUsers.test_user_invalid_1);
    //         assert.equal(response.status, 400, 'Response should be 400');
    //     } catch (err) {
    //         throw err;
    //     }

    // })

    // it('Add invalid user 2, verify response code (400)', async function () {

    //     try {
    //         const response = await chai.request(app).post('/students').send(testParams.invalidUsers.test_user_invalid_2);
    //         assert.equal(response.status, 400, 'Response should be 400');
    //     } catch (err) {
    //         throw err;
    //     }

    // })

    // it('Add invalid user 3, verify response code (400)', async function () {

    //     try {
    //         const response = await chai.request(app).post('/students').send(testParams.invalidUsers.test_user_invalid_3);
    //         assert.equal(response.status, 400, 'Response should be 400');
    //     } catch (err) {
    //         throw err;
    //     }

    // })

    // it('Add invalid user 4, verify response code (400)', async function () {

    //     try {
    //         const response = await chai.request(app).post('/students').send(testParams.invalidUsers.test_user_invalid_4);
    //         assert.equal(response.status, 400, 'Response should be 400');
    //     } catch (err) {
    //         throw err;
    //     }

    // })

    // it('Add invalid user 5, verify response code (400)', async function () {

    //     try {
    //         const response = await chai.request(app).post('/students').send(testParams.invalidUsers.test_user_invalid_4);
    //         assert.equal(response.status, 400, 'Response should be 400');
    //     } catch (err) {
    //         throw err;
    //     }

    // })

    after(async function () {
        await studentModel.deleteMany({});
    });

});