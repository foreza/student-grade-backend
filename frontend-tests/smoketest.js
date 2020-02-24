import { Selector } from 'testcafe';
fixture `Getting Started`
    .page `http://localhost:3000/`;

    test('Test basic input', async t => {
        await t
            .typeText('#input-name', 'John Smith')
            .typeText('#input-grade', '99')
            .click("#submit-new-student-btn")

    });

    test('Test basic input', async t => {
        await t
            .typeText('#input-name', 'Yvonne Yuan')
            .typeText('#input-grade', '100')
            .click("#submit-new-student-btn")
    });