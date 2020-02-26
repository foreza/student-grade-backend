import { Selector } from 'testcafe';
var mongoose = require('mongoose');
const studentModel = require('../models/studentModel')



fixture`Index`
    .page`http://localhost:3000/basic_index.html`
    .before ( async (t) => {
        // await studentModel.deleteMany({});
    });

test('Test basic input for student with max length and max grade', async t => {
    await t
        .typeText('#input-name', 'JohnSmith012')
        .typeText('#input-grade', '100')
        .click("#submit-new-student")
        .expect(Selector('#table-content').childElementCount).eql(1);
});

test('Test basic input for student with min length and min grade', async t => {
    await t
        .typeText('#input-name', 'J')
        .typeText('#input-grade', '0')
        .click("#submit-new-student")
        .expect(Selector('#table-content').childElementCount).eql(2);
});

test('Test basic input for an invalid student (no name provided)', async t => {
    await t
        .typeText('#input-name', ' ')
        .typeText('#input-grade', '50')
        .setNativeDialogHandler(() => true)
        .click("#submit-new-student")
        .expect(Selector('#table-content').childElementCount).eql(2);
});

test('Test basic input for an invalid student (no grade provided)', async t => {
    await t
        .selectText('#input-name').pressKey('delete')
        .selectText('#input-grade').pressKey('delete')
        .typeText('#input-name', 'invalid')
        .typeText('#input-grade', ' ')
        .setNativeDialogHandler(() => true)
        .click("#submit-new-student")
        .expect(Selector('#table-content').childElementCount).eql(2);
});

test('Test basic input for an invalid student (no valid number in grade provided)', async t => {
    await t
        .selectText('#input-name').pressKey('delete')
        .selectText('#input-grade').pressKey('delete')
        .typeText('#input-name', 'invalid')
        .typeText('#input-grade', 'veryInvalid')
        .setNativeDialogHandler(() => true)
        .click("#submit-new-student")
        .expect(Selector('#table-content').childElementCount).eql(2);
});

test('Test basic input for an invalid student (grade provided was negative)', async t => {
    await t
        .selectText('#input-name').pressKey('delete')
        .selectText('#input-grade').pressKey('delete')  
        .typeText('#input-name', 'invalid')
        .typeText('#input-grade', '-1')
        .setNativeDialogHandler(() => true)
        .click("#submit-new-student")
        .expect(Selector('#table-content').childElementCount).eql(2);
});

test('Test basic input for an invalid student (grade provided was too large)', async t => {
    await t
        .selectText('#input-name').pressKey('delete')
        .selectText('#input-grade').pressKey('delete')  
        .typeText('#input-name', 'invalid')
        .typeText('#input-grade', '101')
        .setNativeDialogHandler(() => true)
        .click("#submit-new-student")
        .expect(Selector('#table-content').childElementCount).eql(2);
});

test('Test basic input for a student with a very long name', async t => {
    await t
        .selectText('#input-name').pressKey('delete')
        .selectText('#input-grade').pressKey('delete')
        .typeText('#input-name', 'longNameUpToYOUSHOULDNOTSEETHIS')
        .typeText('#input-grade', '85')
        .click("#submit-new-student")
        .expect(Selector('#table-content').childElementCount).eql(3);
});

test('Delete the first student', async t => {
    await t
        .hover(Selector('#table-content .on-hover-show').nth(0))
        .click("#table-content .link-delete")
        .expect(Selector('#table-content').childElementCount).eql(2);

});

test('Delete the 2nd student', async t => {
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