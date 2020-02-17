const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = require('chai').assert;
const app = require('../app');

const studentModel = require('../models/studentModel')

chai.use(chaiHttp);

describe('Users', function() {
  before(async function() {
    // runs before all tests in this block
    await studentModel.deleteMany({});
  });

  it('TODO', async function() {
    try {
      const response = await chai.request(app).get('/students');
      assert.equal(response.body.length == 0, true, 'Results should be empty');
    } catch (err) {
      throw err;
    }
  });

  after(async function() {
    // runs after all tests in this block
    await studentModel.deleteMany({});
  });

});