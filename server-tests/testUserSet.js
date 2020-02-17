

const params = {};

params.test_user_1 = { name: 'Jason Chiu', grade: 50 };                   // Sample test user
params.test_user_2 = { name: 'Yvonne Yuan', grade: 99 };                  // Sample test user

params.test_user_invalid_1 = { grade: 50 };                              // Invalid due to only including grade
params.test_user_invalid_2 = { invalid: "ignore me"};                    // Invalid due to wrong params
params.test_user_invalid_3 = { name: "gotYourConk!", grade: "heh"};      // Invalid due to name incorrect type


params.test_user_set_10_f = [
{ name: "Maisy Ware", grade: 55 },
{ name: "Tara Lambert", grade: 34 },
{ name: "Rowan Castillo", grade: 23 },
{ name: "Crystal Huffman", grade: 56 },
{ name: "Maddie Swanson", grade: 79 },
{ name: "Kian Bernard", grade: 21 },
{ name: "Casey Webb", grade: 12 },
{ name: "Maria Soto", grade: 4 },
{ name: "Katy Lozano", grade: 92 },
{ name: "Annabel James", grade: 87 }
];

module.exports = params;
// export default {test_user, test_user_set};