import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../app';
import config from '../utils/env';
// 1
describe('GET /api/user', () => {
    const token = jwt.sign({ id: 1, role: 'ADMIN' }, config.JWT_SECRET);
    it('should return 200 and list of user', async () => {
        const res = await request(app)
            .get('/api/user')
            .set('Authorization', `Bearer ${token}`); // ← TAMBAH INI
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
        expect(Array.isArray(res.body.data)).toBe(true);
    });
});
// 2
describe('GET /api/user/stats', () => {
    const token = jwt.sign({ id: 1, role: 'ADMIN' }, config.JWT_SECRET);
    it('should return 200 and user statistics', async () => {
        const res = await request(app)
            .get('/api/user/stats')
            .set('Authorization', `Bearer ${token}`);
        // Debug response
        console.log('Stats response:', JSON.stringify(res.body, null, 2));
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
    });
});
// 3
describe('GET /api/user/:id', () => {
    const token = jwt.sign({ id: 1, role: 'ADMIN' }, config.JWT_SECRET);
    it('should return 200 and list of user', async () => {
        const res = await request(app)
            .get('/api/user')
            .set('Authorization', `Bearer ${token}`); // ← TAMBAH INI
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
        expect(Array.isArray(res.body.data)).toBe(true);
    });
});
// 4
describe('POST /api/user/:id', () => {
    const token = jwt.sign({ id: 1, role: 'ADMIN' }, config.JWT_SECRET);
    it('should return 401 if no token provided', async () => {
        const timestamp = Date.now();
        const uniqueUsername = `prabowosubi_${timestamp}`;
        const uniqueEmail = `prabowosubi_${timestamp}@gmail.com`;
        const res = await request(app)
            .post('/api/user')
            .send({
            username: uniqueUsername,
            email: uniqueEmail,
            password_hash: "geuifisafn",
            role: "MEMBER"
        });
        console.log('Response tanpa token:', res.body);
        expect(res.statusCode).toEqual(401);
        expect(res.body.success).toBe(false);
    });
    it('Should return 201 and user that has been created', async () => {
        const timestamp = Date.now();
        const uniqueUsername = `jokowidodo_${timestamp}`;
        const uniqueEmail = `jokowidodo_${timestamp}@gmail.com`;
        const res = await request(app)
            .post('/api/user')
            .send({
            username: uniqueUsername,
            email: uniqueEmail,
            password_hash: "geuifisafn",
            role: "MEMBER"
        })
            .set('Authorization', `Bearer ${token}`);
        console.log('Response dengan token:', res.body);
        expect(res.statusCode).toEqual(201);
        expect(res.body.success).toBe(true);
    });
});
// 5
describe('PUT /api/user/:id', () => {
    const token = jwt.sign({ id: 1, role: 'ADMIN' }, config.JWT_SECRET);
    it('should update user', async () => {
        const timestamp = Date.now();
        const testUsername = `testuser_${timestamp}`;
        const testEmail = `test_${timestamp}@gmail.com`;
        // Buat user
        const createRes = await request(app)
            .post('/api/user')
            .send({
            username: testUsername,
            email: testEmail,
            password_hash: "testpass",
            role: "MEMBER"
        })
            .set('Authorization', `Bearer ${token}`);
        // Pastikan user berhasil dibuat
        expect(createRes.statusCode).toBe(201);
        const userId = createRes.body.data.id;
        // Update hanya email
        const updateRes = await request(app)
            .put(`/api/user/${userId}`)
            .send({
            email: `updated_${timestamp}@gmail.com`
        })
            .set('Authorization', `Bearer ${token}`);
        expect(updateRes.statusCode).toBe(200);
        expect(updateRes.body.success).toBe(true);
    });
});
// 6
describe('DELETE /api/user/:id', () => {
    const token = jwt.sign({ id: 1, role: 'ADMIN' }, config.JWT_SECRET);
    it('should delete user', async () => {
        // 1. Buat user baru
        const timestamp = Date.now();
        const createRes = await request(app)
            .post('/api/user')
            .send({
            username: `user_${timestamp}`,
            email: `user_${timestamp}@gmail.com`,
            password_hash: "password123",
            role: "MEMBER"
        })
            .set('Authorization', `Bearer ${token}`);
        // Pastikan user berhasil dibuat
        expect(createRes.statusCode).toBe(201);
        const userId = createRes.body.data.id;
        // 2. Hapus user
        const deleteRes = await request(app)
            .delete(`/api/user/${userId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(deleteRes.statusCode).toBe(200);
        expect(deleteRes.body.success).toBe(true);
    });
});
//# sourceMappingURL=user.test.js.map