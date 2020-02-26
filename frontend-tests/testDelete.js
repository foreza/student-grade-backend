import { Selector } from 'testcafe';

// TODO: Add this into a test file
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
        // SETUP TESTS
    });

    // TODO: Replace
    test('Add test params' , async t => {

        for (let i = 0; i < test_user_set.length; ++i){
            await t
            .typeText('#input-name', test_user_set[i].name)
            .typeText('#input-grade', String(test_user_set[i].grade))
            .click("#submit-new-student");
        }

        await t
            .expect(Selector('#table-content').childElementCount).eql(test_user_set.length);
    });


    // const middleIndex = Number(test_user_set.length/2 -1);
    // const middleIndex = 1;

    // test(`Delete the middle student of the set, which is at index: ${middleIndex}`, async t => {

    //     // t deleteSelector = 

    //     await t
    //     .hover(Selector('#table-content .on-hover-show').nth(middleIndex))
    //     await t.find('.link-delete').click()
    //     .expect(Selector('#table-content tr .nameContent').nth(middleIndex).innerText).notEql(test_user_set[middleIndex].name)
    //     .expect(Selector('#table-content').childElementCount).eql(test_user_set.length - 1);

    //     await t
    //         .hover(Selector('#table-content .on-hover-show').nth(middleIndex))
    //         .click("#table-content .link-delete")
    //         .expect(Selector('#table-content tr .nameContent').nth(middleIndex).innerText).notEql(test_user_set[middleIndex].name)
    //         .expect(Selector('#table-content').childElementCount).eql(test_user_set.length - 1);
    
    // });
    


