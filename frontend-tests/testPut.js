import { Selector } from 'testcafe';
const testUtils = require('./testUtils');


const test_user_set = [
    {
        "_id": "5e5310039a2a04b4046e431a",
        "name": "Kirsten",
        "grade": 18
    },
    {
        "_id": "5e53100300804de60dc68e5d",
        "name": "Underwood",
        "grade": 100
    },
    {
        "_id": "5e531003c024563b7eab786e",
        "name": "Decker",
        "grade": 82
    },
    {
        "_id": "5e531003fa5342041c12713e",
        "name": "Merritt",
        "grade": 26
    },
    {
        "_id": "5e5310033e97d9e8ddb84ead",
        "name": "Fran",
        "grade": 34
    },
    {
        "_id": "5e531003c238616acfb44ff0",
        "name": "Irwin",
        "grade": 8
    }
];

fixture`Index`
    .page`http://localhost:3000/basic_index.html`
    .before ( async (t) => {
        testUtils.doMongoConnection();
        testUtils.clearStudents();
        testUtils.addSampleSet(test_user_set);
    })
    .after ( async (t) => {
        testUtils.clearStudents();
    });

    test('Verify test params were added' , async t => {
        await t
            .expect(Selector('#table-content').childElementCount).eql(test_user_set.length);
    });


    const middleIndex = Number(test_user_set.length/2 -1);

    test(`Edit the middle student of the set, which is at index: ${middleIndex}`, async t => {

        const studentData = test_user_set[middleIndex];
        const editData = { name: "JohnSmith012", grade: "99"};

        await t
            .hover(Selector('#table-content .on-hover-show').nth(middleIndex))
            .click(Selector(`#edit-${studentData._id}`))
            .typeText(`#student-input-name${studentData._id}`, editData.name, { replace: true, paste: true })
            .typeText(`#student-input-grade${studentData._id}`, editData.grade, { replace: true, paste: true })
            .click(Selector(`#save-${studentData._id}`))
            .expect(Selector(`#student-name${studentData._id} .nameContent`).innerText).eql(editData.name)
            .expect(Selector(`#student-grade${studentData._id} .gradeContent`).innerText).eql(editData.grade)


        
    });