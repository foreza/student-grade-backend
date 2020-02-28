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
    .before(async (t) => {
        testUtils.doMongoConnection();
        testUtils.clearStudents();
        testUtils.addSampleSet(test_user_set);
    })
    .after(async (t) => {
        testUtils.clearStudents();
    });

test('Verify test params were added', async t => {
    await t
    .expect(Selector('#table-content').childElementCount).eql(test_user_set.length);
});

const middleIndex = Number(test_user_set.length / 2 - 1);
const studentData = test_user_set[middleIndex];
const hoverSelector = Selector('#table-content .on-hover-show').nth(middleIndex);
const editSelector = Selector(`#edit-${studentData._id}`);
const saveSelector = Selector(`#save-${studentData._id}`);
const nameTypeSelector = Selector(`#student-input-name${studentData._id}`);
const gradeTypeSelector = Selector(`#student-input-grade${studentData._id}`);
const expectNameSelector = Selector(`#student-name${studentData._id} .nameContent`);
const expectGradeSelector = Selector(`#student-grade${studentData._id} .gradeContent`);


test(`Edit the middle student of the set, which is at index: ${middleIndex}`, async t => {

    let editData = { name: "letusedit", grade: "1" };

    await t
        .hover(hoverSelector).click(editSelector)
        .typeText(nameTypeSelector, editData.name, { replace: true, paste: true })
        .typeText(gradeTypeSelector, editData.grade, { replace: true, paste: true })
        .click(saveSelector)
        .expect(expectNameSelector.innerText).eql(editData.name)
        .expect(expectGradeSelector.innerText).eql(editData.grade);

});

test('Test basic edit for student with max length and max grade', async t => {

    let editData = { name: "JohnSmith012", grade: "99" };

    await t
        .hover(hoverSelector).click(editSelector)
        .typeText(nameTypeSelector, editData.name, { replace: true, paste: true })
        .typeText(gradeTypeSelector, editData.grade, { replace: true, paste: true })
        .click(saveSelector)
        .expect(expectNameSelector.innerText).eql(editData.name)
        .expect(expectGradeSelector.innerText).eql(editData.grade);

});

test('Test basic input for student with min length and min grade', async t => {

    let editData = { name: "J", grade: "5" };

    await t
        .hover(hoverSelector).click(editSelector)
        .selectText(nameTypeSelector).pressKey('delete')
        .typeText(nameTypeSelector, editData.name, { replace: true })
        .typeText(gradeTypeSelector, editData.grade, { replace: true })
        .click(saveSelector)
        .expect(expectNameSelector.innerText).eql(editData.name)
        .expect(expectGradeSelector.innerText).eql(editData.grade);


});

test('Test basic input for an invalid student (no name provided)', async t => {

    const editData = { name: " ", grade: "50" };

    await t
        .hover(hoverSelector).click(editSelector)
        .selectText(nameTypeSelector).pressKey('delete')
        .typeText(nameTypeSelector, editData.name, { replace: true, paste: true })
        .typeText(gradeTypeSelector, editData.grade, { replace: true, paste: true })
        .click(saveSelector)
        .expect(Selector(`.error`).exists).ok();
});

test('Test basic input for an invalid student (no grade provided)', async t => {

    const editData = { name: "invalid", grade: " " };

    await t
        .hover(hoverSelector).click(editSelector)
        .selectText(nameTypeSelector).pressKey('delete')
        .typeText(nameTypeSelector, editData.name, { replace: true, paste: true })
        .typeText(gradeTypeSelector, editData.grade, { replace: true, paste: true })
        .click(saveSelector)
        .expect(Selector(`.error`).exists).ok();

});

test('Test basic input for an invalid student (no valid number in grade provided)', async t => {

    const editData = { name: "invalid", grade: "veryInvalid" };

    await t
        .hover(hoverSelector).click(editSelector)
        .typeText(nameTypeSelector, editData.name, { replace: true, paste: true })
        .typeText(gradeTypeSelector, editData.grade, { replace: true, paste: true })
        .click(saveSelector)
        .expect(Selector(`.error`).exists).ok();


});

test('Test basic input for an invalid student (grade provided was negative)', async t => {

    const editData = { name: "invalid", grade: "-1" };

    await t
        .hover(hoverSelector).click(editSelector)
        .typeText(nameTypeSelector, editData.name, { replace: true, paste: true })
        .typeText(gradeTypeSelector, editData.grade, { replace: true, paste: true })
        .click(saveSelector)
        .expect(Selector(`.error`).exists).ok();

});

test('Test basic input for an invalid student (grade provided was too large)', async t => {

    const editData = { name: "invalid", grade: "101" };

    await t
        .hover(hoverSelector).click(editSelector)
        .typeText(nameTypeSelector, editData.name, { replace: true, paste: true })
        .typeText(gradeTypeSelector, editData.grade, { replace: true, paste: true })
        .click(saveSelector)
        .expect(Selector(`.error`).exists).ok();


});

test('Test basic input (typed) for a student with a very long name', async t => {

    const editData = { name: "longNameUpToYOUSHOULDNOTSEETHIS", grade: "50" };

    await t
        .hover(hoverSelector).click(editSelector)
        .typeText(nameTypeSelector, editData.name, { replace: true, paste: true })
        .typeText(gradeTypeSelector, editData.grade, { replace: true, paste: true })
        .click(saveSelector)
        .expect(Selector(`.error`).exists).ok();


});