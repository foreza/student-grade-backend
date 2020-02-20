

const smokeTestUsers = {};

smokeTestUsers.test_user_1 = {
    _id: "5e4b28f32411805f4dc85809",
    name: 'Jason Chiu',
    grade: 1
};

smokeTestUsers.test_user_2 = {
    _id: "5e4b28f32411805f4dc85808",
    name: 'Yvonne Yuan',
    grade: 99
};


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
    grade: 0
};

validUsers.test_user_2 = {
    _id: "5e4b28f32411805f4dc85808",
    name: 'Yvonne Yuan',
    grade: 100
};

validUsers.test_user_3 = {
    _id: "5e4b28f32411805f4dc85807",
    name: 'Thi Nguyen',
    grade: 99
};

validUsers.test_user_4 = {
    _id: "5e4b28f32411805f4dc85806",
    name: 'Tan Nguyen',
    grade: 50
};

const invalidUsers = {};

// Invalid due to no provided param
invalidUsers.test_user_invalid_0 = {
};

// Invalid due to missing 'grade' param
invalidUsers.test_user_invalid_1 = {
    name: "a"
};

// Invalid due to missing 'name' param
invalidUsers.test_user_invalid_2 = {
    grade: 50
};

// Invalid due to missing both params and including wrong param
invalidUsers.test_user_invalid_3 = {
    invalid: "ignore me"
};

// Invalid due to grade incorrect type
invalidUsers.test_user_invalid_4 = {
    name: "gotYourConk!", grade: "heh"
};

// Invalid due to name incorrect type
invalidUsers.test_user_invalid_5 = {
    name: 123, grade: 99
};

// Invalid due to name too long
invalidUsers.test_user_invalid_6 = {
    name: "big william johnson dorkus", grade: 99
};

// Invalid due to grade under 0
invalidUsers.test_user_invalid_7 = {
    name: "dunce", grade: -1
};

// Invalid due to grade above 100
invalidUsers.test_user_invalid_7 = {
    name: "dunce", grade: 101
};





const params = { smokeTestUsers, modifiedUsers, validUsers, invalidUsers };


module.exports = params;
// export default {test_user, test_user_set}; // TODO: Refactor with quick fix