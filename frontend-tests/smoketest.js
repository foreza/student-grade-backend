import { Selector } from 'testcafe';
const testUtils = require('testUtils');



fixture`Index`
    .page`http://localhost:3000/basic_index.html`;

test('Test basic input for a student', async t => {
    await t
        .typeText('#input-name', 'John Smith')
        .typeText('#input-grade', '99')
        .click("#submit-new-student")
        .expect(Selector('#table-content').childElementCount).eql(1);
});

test('Test basic input for a second student', async t => {
    await t
        .typeText('#input-name', 'Yvonne Yuan')
        .typeText('#input-grade', '100')
        .click("#submit-new-student")
        .expect(Selector('#table-content').childElementCount).eql(2);
});

test('Test basic input for an invalid student (grade exceeds 100)', async t => {
    await t
        .typeText('#input-name', 'Morton')
        .typeText('#input-grade', '101')
        .setNativeDialogHandler(() => true)
        .click("#submit-new-student")
        .expect(Selector('#table-content').childElementCount).eql(2);
});

test('Test basic input for an invalid student (grade is lower than 0)', async t => {
    await t
        .typeText('#input-name', 'Morton')
        .typeText('#input-grade', '-1')
        .setNativeDialogHandler(() => true)
        .click("#submit-new-student")
        .expect(Selector('#table-content').childElementCount).eql(2);
});

test('Test basic input for an invalid student (name not provided)', async t => {
    await t
        .typeText('#input-grade', '-1')
        .setNativeDialogHandler(() => true)
        .click("#submit-new-student")
        .expect(Selector('#table-content').childElementCount).eql(2);
});

test('Test basic input for an invalid student (grade not provided)', async t => {
    await t
        .typeText('#input-name', 'chonker')
        .setNativeDialogHandler(() => true)
        .click("#submit-new-student")
        .expect(Selector('#table-content').childElementCount).eql(2);
});


test('Edit the first student', async t => {

    await t
        .hover(Selector('#table-content .on-hover-show').nth(0))
        .click("#table-content .link-edit")
        .selectText('#table-content .edit-name-field').pressKey('delete')
        .selectText('#table-content .edit-grade-field').pressKey('delete')
        .typeText('#table-content .edit-name-field', 'beastboy')
        .typeText('#table-content .edit-grade-field', '11')
        .click("#table-content .link-save")
        .expect(Selector('#table-content').childElementCount).eql(2);

});

test('Check the first student', async t => {

    await t
        .hover(Selector('#table-content .on-hover-show').nth(0))
        .expect(Selector('#table-content tr .nameContent').nth(0).innerText).eql('beastboy')


});

test('Delete the first student', async t => {

    await t
        .hover(Selector('#table-content .on-hover-show').nth(0))
        .click("#table-content .link-delete")
        .expect(Selector('#table-content').childElementCount).eql(1);

});

test('Delete the remaining student', async t => {

    await t
        .hover(Selector('#table-content .on-hover-show').nth(0))
        .click("#table-content .link-delete")
        .expect(Selector('#table-content').childElementCount).eql(0);

});

