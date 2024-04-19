const request = require('supertest');
const app= require('../app'); // Importamos app y server desde app.js
const iconv = require('iconv-lite');
const encodings = require('iconv-lite/encodings');
iconv.encodings = encodings;

describe('Test the direction creation', () => {
    test('It should not create an direction with empty user_id', async () => {
        const newDirection = {
            direction: 'Calle Principal 123',
            post_code: '28001',
            location: 'Madrid',
            province: 'Madrid',
            user_id: ''
        };

        const response = await request(app)
            .post('/api/direction')
            .send(newDirection);

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('Missing data');
    });
});

describe('Test the direction findByUserId', () => {
    test('It should not found a user_id that not exist', async () => {
        const response = await request(app)
            .get(`/api/direction/user/`)

        expect(response.statusCode).toBe(500);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe("Error finding direction.");
    });
});


describe('Test the direction delete', () => {
    test('It should not delete a direction that not exist', async () => {
        const response = await request(app)
            .delete("/api/direction/67")

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe("Error finding direction.");
    });
});


describe('Test the direction findOne', () => {
    test('It should not found a direction that not exist', async () => {
        const response = await request(app)
            .get("/api/direction/67")

        expect(response.statusCode).toBe(500);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe("Error finding direction.");
    });
});

describe('Test the direction findOne', () => {
    test('It should not found a direction that not exist', async () => {
        const response = await request(app)
            .put("/api/direction/2")

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe("Direction cannot be updated.");
    });
});

//------------------------------------------------------------------------------------

describe('Test the carry creation', () => {
    test('It should not create a carry with empty article_id', async () => {
        const newCarry = {
            article_id: null,
            purchase_id: 200
        };

        const response = await request(app)
            .post('/api/carry')
            .send(newCarry);

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('Missing data');
    });
});


describe('Test the carry put', () => {
    test('It should not update a carry with incorrects ids', async () => {
        const response = await request(app)
            .put("/api/carry/200/200")
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe("Carry cannot be updated.");
    });
});

describe('Test the carry delete', () => {
    test('It should not delete a carry with incorrects ids', async () => {
        const response = await request(app)
            .delete("/api/carry/200/200")

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe("Error finding carries.");
    });
});

describe('Test the carry findOne', () => {
    test('It should not delete a carry with incorrects ids', async () => {
        const response = await request(app)
            .get("/api/carry/200/200")

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe( "Carry not found.");
    });
});


//------------------------------------------------------------------------------------

describe('Test the article creation', () => {
    test('It should not create an article with empty atribute', async () => {
        const newArticle = {
            name: "test",
            description: "test",
            price: null,
            category: "test",
            stock: "true",
        };

        const response = await request(app)
            .post("/api/article/")
            .send(newArticle);

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('Missing data');
    });
});

//------------------------------------------------------------------------------------

// describe('Test the article creation', () => {
//     test('It should not create an article with empty atribute', async () => {
//         const newUser = {
//             username: "adan",
//             name: "adan",
//             last_name: "adan",
//             mail: "adan",
//             password:"adan",
//             role: "user",
//         };

//         const response = await request(app)
//             .post('/api/users/signup/')
//             .send(newUser);

//         expect(response.statusCode).toBe(409);
//         expect(response.body).toHaveProperty('message');
//         expect(response.body.message).toBe("Username already exists!");
//     });
// });

//------------------------------------------------------------------------------------

describe('Test the purchase creation', () => {
    test('It should not create an purchase with empty atribute', async () => {
        const newPurchase = {
            date: null,
            total: 100,
            status: "arriving",
            user_id: 1
        };

        const response = await request(app)
            .post("/api/purchase/")
            .send(newPurchase);

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('Missing data');
    });
});

describe('Test the purchase delete', () => {
    test('It should not delete a purchase with incorrects ids', async () => {
        const response = await request(app)
            .delete("/api/purchase/200")

        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe("Purchase not found.");
    });
});

describe('Test the purchase findOne', () => {
    test('It should found a purchase that exist', async () => {
        const response = await request(app)
            .get("/api/purchase/1")

        expect(response.statusCode).toBe(404);
        expect(response.body).toBeInstanceOf(Object);
    });
});

describe('Test the purchase findAll', () => {
    test('It should found all purchases that exists', async () => {
        const response = await request(app)
            .get("/api/purchase")

        expect(response.statusCode).toBe(200);
    });
});