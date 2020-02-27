import { Selector } from 'testcafe';
const testUtils = require('./testUtils');

fixture`Index`
    .page`http://localhost:3000/basic_index.html`
    .before ( async (t) => {
        testUtils.doMongoConnection();
        testUtils.clearStudents();
    })
    .after ( async (t) => {
        testUtils.clearStudents();
    })

test('Test basic input for student with max length and max grade', async t => {
    await t
        .typeText('#input-name', 'JohnSmith012', { replace: true, paste: true })
        .typeText('#input-grade', '100',  { replace: true, paste: true })
        .click("#submit-new-student")
        .expect(Selector('#table-content').childElementCount).eql(1);
});

test('Test basic input for student with min length and min grade', async t => {
    await t
        .typeText('#input-name', 'J',  { replace: true, paste: true })
        .typeText('#input-grade', '0',  { replace: true, paste: true })
        .click("#submit-new-student")
        .expect(Selector('#table-content').childElementCount).eql(2);
});

test('Test basic input for an invalid student (no name provided)', async t => {
    await t
        .typeText('#input-name', ' ',  { replace: true, paste: true })
        .typeText('#input-grade', '50',  { replace: true, paste: true })
        .setNativeDialogHandler(() => true)
        .click("#submit-new-student")
        .expect(Selector('#table-content').childElementCount).eql(2);
});

test('Test basic input for an invalid student (no grade provided)', async t => {
    await t
        // .selectText('#input-name').pressKey('delete')
        // .selectText('#input-grade').pressKey('delete')
        .typeText('#input-name', 'invalid',  { replace: true, paste: true })
        .typeText('#input-grade', ' ',  { replace: true, paste: true })
        .setNativeDialogHandler(() => true)
        .click("#submit-new-student")
        .expect(Selector('#table-content').childElementCount).eql(2);
});

test('Test basic input for an invalid student (no valid number in grade provided)', async t => {
    await t
        // .selectText('#input-name').pressKey('delete')
        // .selectText('#input-grade').pressKey('delete')
        .typeText('#input-name', 'invalid',  { replace: true, paste: true })
        .typeText('#input-grade', 'veryInvalid',  { replace: true, paste: true })
        .setNativeDialogHandler(() => true)
        .click("#submit-new-student")
        .expect(Selector('#table-content').childElementCount).eql(2);
});

test('Test basic input for an invalid student (grade provided was negative)', async t => {
    await t
        .selectText('#input-name').pressKey('delete')
        .selectText('#input-grade').pressKey('delete')  
        .typeText('#input-name', 'invalid',  { replace: true, paste: true })
        .typeText('#input-grade', '-1',  { replace: true, paste: true })
        .setNativeDialogHandler(() => true)
        .click("#submit-new-student")
        .expect(Selector('#table-content').childElementCount).eql(2);
});

test('Test basic input for an invalid student (grade provided was too large)', async t => {
    await t
        .selectText('#input-name').pressKey('delete')
        .selectText('#input-grade').pressKey('delete')  
        .typeText('#input-name', 'invalid',  { replace: true, paste: true })
        .typeText('#input-grade', '101',  { replace: true, paste: true })
        .setNativeDialogHandler(() => true)
        .click("#submit-new-student")
        .expect(Selector('#table-content').childElementCount).eql(2);
});

test('Test basic input (typed) for a student with a very long name', async t => {
    await t
        .selectText('#input-name').pressKey('delete')
        .selectText('#input-grade').pressKey('delete')
        .typeText('#input-name', 'longNameUpToYOUSHOULDNOTSEETHIS',  { replace: true, paste: false })
        .typeText('#input-grade', '85',  { replace: true, paste: true })
        .click("#submit-new-student")
        .expect(Selector('#table-content').childElementCount).eql(3);
});
