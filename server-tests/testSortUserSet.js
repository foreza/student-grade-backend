// This is a data set that defines a set of several users for testing sorting operations

const params = {};

params.test_user_set = [
    {
        "_id": "5e4b28f32411805f4dc85809",
        "name": "Annabel James",
        "grade": 87
    },
    {
        "_id": "5e4b6337ca5d47617b4dc4a2",
        "name": "Annabel Xames",
        "grade": 87
    },
    {
        "_id": "5e4b6337ca5d47617b4dc4a3",
        "name": "Casey Webb",
        "grade": 12
    },
    {
        "_id": "5e4b6337ca5d47617b4dc4a4",
        "name": "Crystal Huffman",
        "grade": 56
    },
    {
        "_id": "5e4b6337ca5d47617b4dc4a5",
        "name": "Crystal Huffman",
        "grade": 66
    },
    {
        "_id": "5e4b6337ca5d47617b4dc4a6",
        "name": "Katy Lozano",
        "grade": 92
    },
    {
        "_id": "5e4b6337ca5d47617b4dc4a7",
        "name": "Kenneth Lozano",
        "grade": 92
    },
    {
        "_id": "5e4b6337ca5d47617b4dc4a8",
        "name": "Kian Bernard",
        "grade": 21
    },
    {
        "_id": "5e4b6337ca5d47617b4dc4a9",
        "name": "Lara Lambert",
        "grade": 34
    },
    {
        "_id": "5e4b6337ca5d47617b4dc4aa",
        "name": "Maddie Swanson",
        "grade": 79
    },
    {
        "_id": "5e4b6337ca5d47617b4dc4ab",
        "name": "Maisy Ware",
        "grade": 55
    },
    {
        "_id": "5e4b6337ca5d47617b4dc4ac",
        "name": "Maisy Where",
        "grade": 55
    },
    {
        "_id": "5e4b6337ca5d47617b4dc4ad",
        "name": "Maria Sono",
        "grade": 44
    },
    {
        "_id": "5e4b6337ca5d47617b4dc4ae",
        "name": "Maria Soto",
        "grade": 4
    },
    {
        "_id": "5e4b6337ca5d47617b4dc4af",
        "name": "Martin Soto",
        "grade": 20
    },
    {
        "_id": "5e4b6337ca5d47617b4dc4b0",
        "name": "Raleigh Lozana",
        "grade": 42
    },
    {
        "_id": "5e4b6337ca5d47617b4dc4b1",
        "name": "Rowan Castillo",
        "grade": 23
    },
    {
        "_id": "5e4b6337ca5d47617b4dc4b2",
        "name": "Rowana Castillo",
        "grade": 56
    },
    {
        "_id": "5e4b6337ca5d47617b4dc4b3",
        "name": "Tara Lambert",
        "grade": 34
    }
]

params.test_user_set_sortNameAscending = [
    {
        "_id": "5e4b6337ca5d47617b4dc4b3",
        "name": "Tara Lambert",
        "grade": 34
    },
    {
        "_id": "5e4b6337ca5d47617b4dc4b2",
        "name": "Rowana Castillo",
        "grade": 56
    },
    {
        "_id": "5e4b6337ca5d47617b4dc4b1",
        "name": "Rowan Castillo",
        "grade": 23
    },
    {
        "_id": "5e4b6337ca5d47617b4dc4b0",
        "name": "Raleigh Lozana",
        "grade": 42
    },
    {
        "_id": "5e4b6337ca5d47617b4dc4af",
        "name": "Martin Soto",
        "grade": 20
    },
    {
        "_id": "5e4b6337ca5d47617b4dc4ae",
        "name": "Maria Soto",
        "grade": 4
    },
    {
        "_id": "5e4b6337ca5d47617b4dc4ad",
        "name": "Maria Sono",
        "grade": 44
    },
    {
        "_id": "5e4b6337ca5d47617b4dc4ac",
        "name": "Maisy Where",
        "grade": 55
    },
    {
        "_id": "5e4b6337ca5d47617b4dc4ab",
        "name": "Maisy Ware",
        "grade": 55
    },
    {
        "_id": "5e4b6337ca5d47617b4dc4aa",
        "name": "Maddie Swanson",
        "grade": 79
    },
    {
        "_id": "5e4b6337ca5d47617b4dc4a9",
        "name": "Lara Lambert",
        "grade": 34
    },
    {
        "_id": "5e4b6337ca5d47617b4dc4a8",
        "name": "Kian Bernard",
        "grade": 21
    },
    {
        "_id": "5e4b6337ca5d47617b4dc4a7",
        "name": "Kenneth Lozano",
        "grade": 92
    },
    {
        "_id": "5e4b6337ca5d47617b4dc4a6",
        "name": "Katy Lozano",
        "grade": 92
    },
    {
        "_id": "5e4b6337ca5d47617b4dc4a4",
        "name": "Crystal Huffman",
        "grade": 56
    },
    {
        "_id": "5e4b6337ca5d47617b4dc4a5",
        "name": "Crystal Huffman",
        "grade": 66
    },
    {
        "_id": "5e4b6337ca5d47617b4dc4a3",
        "name": "Casey Webb",
        "grade": 12
    },
    {
        "_id": "5e4b6337ca5d47617b4dc4a2",
        "name": "Annabel Xames",
        "grade": 87
    },
    {
        "_id": "5e4b28f32411805f4dc85809",
        "name": "Annabel James",
        "grade": 87
    }
]

params.test_user_set_sortNameDescending = [{ "_id": "5e4b28f32411805f4dc85809", "name": "Annabel James", "grade": 87 } , { "_id": "5e4b6337ca5d47617b4dc4a2", "name": "Annabel Xames", "grade": 87 } , { "_id": "5e4b6337ca5d47617b4dc4a3", "name": "Casey Webb", "grade": 12 } , { "_id": "5e4b6337ca5d47617b4dc4a4", "name": "Crystal Huffman", "grade": 56 } , { "_id": "5e4b6337ca5d47617b4dc4a5", "name": "Crystal Huffman", "grade": 66 } , { "_id": "5e4b6337ca5d47617b4dc4a6", "name": "Katy Lozano", "grade": 92 } , { "_id": "5e4b6337ca5d47617b4dc4a7", "name": "Kenneth Lozano", "grade": 92 } , { "_id": "5e4b6337ca5d47617b4dc4a8", "name": "Kian Bernard", "grade": 21 } , { "_id": "5e4b6337ca5d47617b4dc4a9", "name": "Lara Lambert", "grade": 34 } , { "_id": "5e4b6337ca5d47617b4dc4aa", "name": "Maddie Swanson", "grade": 79 } , { "_id": "5e4b6337ca5d47617b4dc4ab", "name": "Maisy Ware", "grade": 55 } , { "_id": "5e4b6337ca5d47617b4dc4ac", "name": "Maisy Where", "grade": 55 } , { "_id": "5e4b6337ca5d47617b4dc4ad", "name": "Maria Sono", "grade": 44 } , { "_id": "5e4b6337ca5d47617b4dc4ae", "name": "Maria Soto", "grade": 4 } , { "_id": "5e4b6337ca5d47617b4dc4af", "name": "Martin Soto", "grade": 20 } , { "_id": "5e4b6337ca5d47617b4dc4b0", "name": "Raleigh Lozana", "grade": 42 } , { "_id": "5e4b6337ca5d47617b4dc4b1", "name": "Rowan Castillo", "grade": 23 } , { "_id": "5e4b6337ca5d47617b4dc4b2", "name": "Rowana Castillo", "grade": 56 } , { "_id": "5e4b6337ca5d47617b4dc4b3", "name": "Tara Lambert", "grade": 34 } ]

module.exports = params;
// export default {test_user, test_user_set};