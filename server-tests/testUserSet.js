
// This is a data set that defines several test users for testing GET/DELETE/PUT operations

const params = {};

params.test_user_1 = { name: 'Jason Chiu', grade: 50 };                   // Sample valid test user
params.test_user_2 = { name: 'Yvonne Yuan', grade: 99 };                  // Sample valid test user

params.test_user_invalid_1 = { grade: 50 };                               // Invalid due to missing 'name' param
params.test_user_invalid_2 = { invalid: "ignore me" };                    // Invalid due to missing both params and including wrong param
params.test_user_invalid_3 = { name: "gotYourConk!", grade: "heh" };      // Invalid due to name incorrect type

module.exports = params;
// export default {test_user, test_user_set};