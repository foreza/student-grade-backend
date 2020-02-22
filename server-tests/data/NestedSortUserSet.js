// This is a data set that defines a set of several users for testing sorting operations

const params = {};

// Name Nested Sort Cases (Sorts Grade as 2nd param)
params.test_user_set_name = [
    {
        "_id": "5e4f82a128f749e8bc4c66d8",
        "name": "Alfred",
        "grade": 65
    },
    {
        "_id": "5e4f82a100d8278c1baf9cd9",
        "name": "Molina",
        "grade": 99
    },
    {
        "_id": "5e4f82a100d8278c1baf9cd5",
        "name": "Leon",
        "grade": 80
    },
    {
        "_id": "5e4f82a1dae43cb2291bbda2",
        "name": "Leon",
        "grade": 45
    },
    {
        "_id": "5e4f82a1cb74bb9e0c823703",
        "name": "Zeus",
        "grade": 27
    }
];
params.test_user_set_name_desc_grade_desc = [
    {
        "_id": "5e4f82a128f749e8bc4c66d8",
        "name": "Alfred",
        "grade": 65
    },
    {
        "_id": "5e4f82a1dae43cb2291bbda2",
        "name": "Leon",
        "grade": 45
    },
    {
        "_id": "5e4f82a100d8278c1baf9cd5",
        "name": "Leon",
        "grade": 80
    },
    {
        "_id": "5e4f82a100d8278c1baf9cd9",
        "name": "Molina",
        "grade": 99
    },
    {
        "_id": "5e4f82a1cb74bb9e0c823703",
        "name": "Zeus",
        "grade": 27
    }
];
params.test_user_set_name_desc_grade_asc = [
    {
        "_id": "5e4f82a128f749e8bc4c66d8",
        "name": "Alfred",
        "grade": 65
    },
    {
        "_id": "5e4f82a100d8278c1baf9cd5",
        "name": "Leon",
        "grade": 80
    },
    {
        "_id": "5e4f82a1dae43cb2291bbda2",
        "name": "Leon",
        "grade": 45
    },
    {
        "_id": "5e4f82a100d8278c1baf9cd9",
        "name": "Molina",
        "grade": 99
    },
    {
        "_id": "5e4f82a1cb74bb9e0c823703",
        "name": "Zeus",
        "grade": 27
    }
];
params.test_user_set_name_asc_grade_asc = [
    {
        "_id": "5e4f82a1cb74bb9e0c823703",
        "name": "Zeus",
        "grade": 27
    },
    {
        "_id": "5e4f82a100d8278c1baf9cd9",
        "name": "Molina",
        "grade": 99
    },
    {
        "_id": "5e4f82a100d8278c1baf9cd5",
        "name": "Leon",
        "grade": 80
    },
    {
        "_id": "5e4f82a1dae43cb2291bbda2",
        "name": "Leon",
        "grade": 45
    },
    {
        "_id": "5e4f82a128f749e8bc4c66d8",
        "name": "Alfred",
        "grade": 65
    }
];
params.test_user_set_name_asc_grade_desc = [
    {
        "_id": "5e4f82a1cb74bb9e0c823703",
        "name": "Zeus",
        "grade": 27
    },
    {
        "_id": "5e4f82a100d8278c1baf9cd9",
        "name": "Molina",
        "grade": 99
    },
    {
        "_id": "5e4f82a1dae43cb2291bbda2",
        "name": "Leon",
        "grade": 45
    },
    {
        "_id": "5e4f82a100d8278c1baf9cd5",
        "name": "Leon",
        "grade": 80
    },
    {
        "_id": "5e4f82a128f749e8bc4c66d8",
        "name": "Alfred",
        "grade": 65
    }
];


// Grade Nested Sort Cases (Sorts Name as 2nd param)
params.test_user_set_grade = [
    {
        "_id": "5e4f82a128f749e8bc4c66d8",
        "name": "Yvonne",
        "grade": 99
    },
    {
        "_id": "5e4f82a100d8278c1baf9cd9",
        "name": "Albert",
        "grade": 74
    },
    {
        "_id": "5e4f82a100d8278c1baf9cd5",
        "name": "Miles",
        "grade": 49
    },
    {
        "_id": "5e4f82a1dae43cb2291bbda2",
        "name": "Jason",
        "grade": 49
    },
    {
        "_id": "5e4f82a1cb74bb9e0c823703",
        "name": "Fred",
        "grade": 15
    }
];
params.test_user_set_grade_desc_name_desc = [
    {
        "_id": "5e4f82a1cb74bb9e0c823703",
        "name": "Fred",
        "grade": 15
    },
    {
        "_id": "5e4f82a1dae43cb2291bbda2",
        "name": "Jason",
        "grade": 49
    },
    {
        "_id": "5e4f82a100d8278c1baf9cd5",
        "name": "Miles",
        "grade": 49
    },
    {
        "_id": "5e4f82a100d8278c1baf9cd9",
        "name": "Albert",
        "grade": 74
    },
    {
        "_id": "5e4f82a128f749e8bc4c66d8",
        "name": "Yvonne",
        "grade": 99
    },

];
params.test_user_set_grade_desc_name_asc = [
    {
        "_id": "5e4f82a1cb74bb9e0c823703",
        "name": "Fred",
        "grade": 15
    },
    {
        "_id": "5e4f82a100d8278c1baf9cd5",
        "name": "Miles",
        "grade": 49
    },
    {
        "_id": "5e4f82a1dae43cb2291bbda2",
        "name": "Jason",
        "grade": 49
    },
    {
        "_id": "5e4f82a100d8278c1baf9cd9",
        "name": "Albert",
        "grade": 74
    },
    {
        "_id": "5e4f82a128f749e8bc4c66d8",
        "name": "Yvonne",
        "grade": 99
    },

];
params.test_user_set_grade_asc_name_desc =
    [
        {
            "_id": "5e4f82a128f749e8bc4c66d8",
            "name": "Yvonne",
            "grade": 99
        },
        {
            "_id": "5e4f82a100d8278c1baf9cd9",
            "name": "Albert",
            "grade": 74
        },
        {
            "_id": "5e4f82a1dae43cb2291bbda2",
            "name": "Jason",
            "grade": 49
        },
        {
            "_id": "5e4f82a100d8278c1baf9cd5",
            "name": "Miles",
            "grade": 49
        },
        {
            "_id": "5e4f82a1cb74bb9e0c823703",
            "name": "Fred",
            "grade": 15
        }
];
params.test_user_set_grade_asc_name_asc = [
    {
        "_id": "5e4f82a128f749e8bc4c66d8",
        "name": "Yvonne",
        "grade": 99
    },
    {
        "_id": "5e4f82a100d8278c1baf9cd9",
        "name": "Albert",
        "grade": 74
    },
    {
        "_id": "5e4f82a100d8278c1baf9cd5",
        "name": "Miles",
        "grade": 49
    },
    {
        "_id": "5e4f82a1dae43cb2291bbda2",
        "name": "Jason",
        "grade": 49
    },
    {
        "_id": "5e4f82a1cb74bb9e0c823703",
        "name": "Fred",
        "grade": 15
    }
];



module.exports = params;