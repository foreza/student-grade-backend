import { Selector } from 'testcafe';
fixture `Getting Started`
    .page `http://localhost:3000/basic_index.html`;

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