const request = require('supertest');
const app = require('../app');
const iconv = require('iconv-lite');
const encodings = require('iconv-lite/encodings');
iconv.encodings = encodings;

describe('Test the purchase creation', () => {
    test('It should not create a purchase with empty user_id', async () => {
        const newPurchase = {
            date: '2023-12-13',
            total: 100.0,
            status: 'pending',
            user_id: ''
        };

        const response = await request(app)
            .post('/api/purchase')
            .send(newPurchase);

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('Missing data');
    });
});
