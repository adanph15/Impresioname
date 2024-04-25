const request = require('supertest');
const app= require('../app');
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

describe('Test the carry delete', () => {
    test('It should not delete an article without ids', async () => {
        let id = null;
        const response = await request(app)
            .delete(`/api/article/${id}`)
        expect(response.statusCode).toBe(500);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('Error deleting Article');
    });
});

describe('Test the user update', () => {
    test("It should not update a user that doesn't exist'", async () => {
        let id = 100;
        const response = await request(app)
            .put(`/api/users/${id}`)

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe(`Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`);
    });
});

describe('Test the user findCategory', () => {
    test("It should get an article with a category'", async () => {
        let category = 'men';
        const response = await request(app)
            .get(`/api/article/category/${category}`)

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });
});

describe('Test the user findAll', () => {
    test("It should get all the articles", async () => {
        const response = await request(app)
            .get(`/api/article/`)

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });
});

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

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe("Purchase cannot be deleted.");
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

//------------------------------------------------------------------------------------

describe('Test the user creation', () => {
    test('It should not create an admin without empty username or password', async () => {
        const newUser = {
            username: 'admin',
            name: 'adan',
            last_name: 'adan',
            mail: 'adan@gmail.com',
            password: null,
        };

        const response = await request(app)
            .post('/api/users/admin/')
            .send(newUser);

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe("Content can not be empty!");
    });
});

describe('Test the user update', () => {
    test("It should not update a user that doesn't exist'", async () => {
        let id = 100;
        const response = await request(app)
            .put(`/api/users/${id}`)

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe(`Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`);
    });
});

describe('Test the user delete', () => {
    test("It should not delete a user that doesn't exist'", async () => {
        let id = 100;
        const response = await request(app)
            .delete(`/api/users/${id}`)

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe(`Cannot delete User with id=${id}. Maybe User was not found!`);
    });
});

describe('Test the user getUserDirections', () => {
    test("It should not get the directions of a user that doesn't exist'", async () => {
        const response = await request(app)
            .get(`/api/users/direction/`)

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message');
    });
});


describe('Test the user getUserDirections', () => {
    test("It should get the directions of a user that exist'", async () => {
        let id = 1;
        const response = await request(app)
            .get(`/api/users/direction/${id}`)

        expect(response.statusCode).toBe(300);
        expect(response.body).toBeInstanceOf(Array);

    });
});

describe('Test the user findAll', () => {
    test("It should get the users'", async () => {
        const response = await request(app)
            .get(`/api/users/`)

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);

    });
});

describe('Test the user signin', () => {
    test("It should not signin a user that doesn't have a password or username", async () => {
        const userNamePassword = {
            username: null,
            password: '1234',
        };

        const response = await request(app)
            .post('/api/users/signin/')
            .send(userNamePassword);

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe("Username or Password required.");
    });
});

describe('Test the user isAuthenticated', () => {
    test("It should not get a user that doesn't have been Authenticated before", async () => {
        const token =  null;
        let id = 1;
        const response = await request(app)
            .get('/api/users/1',token)

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe("Token is required.");
