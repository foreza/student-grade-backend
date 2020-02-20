

const modifiedUsers = {};

modifiedUsers.test_user_1 = {
    name: 'Jays0n Choi',
    grade: 99
}

modifiedUsers.test_user_2 = {
    name: 'Yv0n3 Yu@n',
    grade: 88
}


const validUsers = {};

validUsers.test_user_1 = {
    _id: "5e4b28f32411805f4dc85809",
    name: 'Jason Chiu',
    grade: 50
};

validUsers.test_user_2 = {
    _id: "5e4b28f32411805f4dc85808",
    name: 'Yvonne Yuan',
    grade: 99
};

const invalidUsers = {};

invalidUsers.test_user_invalid_1 = { grade: 50 };                               // Invalid due to missing 'name' param
invalidUsers.test_user_invalid_2 = { invalid: "ignore me" };                    // Invalid due to missing both params and including wrong param
invalidUsers.test_user_invalid_3 = { name: "gotYourConk!", grade: "heh" };      // Invalid due to name incorrect type

const params = { modifiedUsers, validUsers, invalidUsers };


module.exports = params;
// export default {test_user, test_user_set}; // TODO: Refactor with quick fix