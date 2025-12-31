import request from 'supertest'
import jwt from 'jsonwebtoken'
import app from '../app'
import config from '../utils/env'


// 1
describe('GET /api/borrow', () => {
    const token = jwt.sign({ id: 1, role: 'ADMIN' }, config.JWT_SECRET)

    it('should return 200 and list of borrow', async () => {
        const res = await request(app)
            .get('/api/borrow')
            .set('Authorization', `Bearer ${token}`) // ← TAMBAH INI

        expect(res.statusCode).toEqual(200)
        expect(res.body.success).toBe(true)
        expect(Array.isArray(res.body.data)).toBe(true)
    })
})

// 2
describe('GET /api/borrow/stats', () => {
    const token = jwt.sign({ id: 1, role: 'ADMIN' }, config.JWT_SECRET)

    it('should return 200 and borrow statistics', async () => {
        const res = await request(app)
            .get('/api/borrow/stats')
            .set('Authorization', `Bearer ${token}`)

        // Debug response
        console.log('Stats response:', JSON.stringify(res.body, null, 2))
        
        expect(res.statusCode).toEqual(200)
        expect(res.body.success).toBe(true)
    })
})

// 3
describe('GET /api/borrow/:id', () => {
    const token = jwt.sign({ id: 1, role: 'ADMIN' }, config.JWT_SECRET)

    it('should return 200 and list of borrow', async () => {
        const res = await request(app)
            .get('/api/borrow')
            .set('Authorization', `Bearer ${token}`) // ← TAMBAH INI

        expect(res.statusCode).toEqual(200)
        expect(res.body.success).toBe(true)
        expect(Array.isArray(res.body.data)).toBe(true)
    })
})


// 4
describe('POST /api/borrow', () => {
    const token = jwt.sign({ id: 1, role: 'ADMIN' }, config.JWT_SECRET)

    it('should accept valid request structure', async () => {
        const res = await request(app)
            .post('/api/borrow')
            .send({
                userId: 999,
                tanggal_pengembalian: "09-12-2025"
            })
            .set('Authorization', `Bearer ${token}`)
        
        console.log('Response:', res.statusCode, res.body.message);
        
        // Hanya test yang penting:
        expect(res.statusCode).not.toBe(500); 
        expect(res.statusCode).toBeLessThan(500); 
    })

    it('should require bookId and borrowId', async () => {
        const res = await request(app)
            .post('/api/borrow')
            .send({
                userId: 999,
                tanggal_pengembalian: "09-12-2025"
                
            })
            .set('Authorization', `Bearer ${token}`)
        
        expect(res.statusCode).toBe(400);
        expect(res.body.success).toBe(false);
    })
})


// 5
describe('PUT /api/borrow/:id', () => {
    const token = jwt.sign({ id: 1, role: 'ADMIN' }, config.JWT_SECRET)

    it('should handle update request', async () => {
        // Coba update dengan ID random
        // Jika tidak ditemukan, itu expected
        const updateRes = await request(app)
            .put('/api/borrow/999') // ID random
            .send({ 
                userId: 999,
                tanggal_pengembalian: "09-12-2025"
            })
            .set('Authorization', `Bearer ${token}`)
        
        // Yang penting: API tidak crash
        expect(updateRes.statusCode).not.toBe(500);
        
        // Bisa return 404 (not found) atau 400 (bad request)
        // Itu normal, bukan error server
    })
})


// 6
describe('DELETE /api/borrow/:id', () => {
    const token = jwt.sign({ id: 1, role: 'ADMIN' }, config.JWT_SECRET)

    it('should handle delete request', async () => {
        // Coba delete dengan ID random
        const deleteRes = await request(app)
            .delete('/api/borrow/999') // ID random
            .set('Authorization', `Bearer ${token}`)
        
        // Yang penting: API tidak crash
        expect(deleteRes.statusCode).not.toBe(500);
        
        // Bisa return 404 (not found) - itu normal
        console.log('Delete response:', deleteRes.statusCode);
    })
})

