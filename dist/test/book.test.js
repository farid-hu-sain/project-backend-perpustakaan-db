import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../app.js";
import config from "../utils/env.js";
// 1
describe("GET /api/book", () => {
    const token = jwt.sign({ id: 1, role: "ADMIN" }, config.JWT_SECRET);
    it("should return 200 and list of book", async () => {
        const res = await request(app)
            .get("/api/book")
            .set("Authorization", `Bearer ${token}`); // ← TAMBAH INI
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
        expect(Array.isArray(res.body.data)).toBe(true);
    });
});
// 2
describe("GET /api/book/stats", () => {
    const token = jwt.sign({ id: 1, role: "ADMIN" }, config.JWT_SECRET);
    it("should return 200 and book statistics", async () => {
        const res = await request(app)
            .get("/api/book/stats")
            .set("Authorization", `Bearer ${token}`);
        // Debug response
        console.log("Stats response:", JSON.stringify(res.body, null, 2));
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
    });
});
// 3
describe("GET /api/book/:id", () => {
    const token = jwt.sign({ id: 1, role: "ADMIN" }, config.JWT_SECRET);
    it("should return 200 and book OBJECT (not array)", async () => {
        const res = await request(app)
            .get("/api/book/1")
            .set("Authorization", `Bearer ${token}`);
        console.log("GET by ID response:", res.body); // ← DEBUG
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
        // PERBAIKI INI ↓↓↓
        expect(typeof res.body.data).toBe("object"); // ← OBJECT, bukan array!
        expect(res.body.data.id).toBeDefined(); // ← Object punya id
        expect(res.body.data.judul).toBeDefined(); // ← Object punya judul
    });
});
// 4
describe("POST /api/book", () => {
    const token = jwt.sign({ id: 1, role: "ADMIN" }, config.JWT_SECRET);
    it("should return 401 if no token provided", async () => {
        const res = await request(app)
            .post("/api/book") // ← TANPA :id
            .send({
            judul: "Buku Test",
            penulis: "Penulis Test",
            penerbit: "Penerbit Test",
            status: true
        });
        console.log("Response tanpa token:", res.body);
        expect(res.statusCode).toEqual(401);
        expect(res.body.success).toBe(false);
    });
    it("Should return 201 and book that has been created", async () => {
        const res = await request(app)
            .post("/api/book") // ← TANPA :id
            .send({
            judul: "Buku Pemrograman",
            penulis: "John Doe",
            penerbit: "Gramedia",
            status: true
        })
            .set("Authorization", `Bearer ${token}`);
        console.log("Response dengan token:", res.body);
        expect(res.statusCode).toEqual(201);
        expect(res.body.success).toBe(true);
    });
});
// 5
describe("PUT /api/book/:id", () => {
    const token = jwt.sign({ id: 1, role: "ADMIN" }, config.JWT_SECRET);
    it("should update book", async () => {
        // 1. Buat book baru
        const createRes = await request(app)
            .post("/api/book")
            .send({
            judul: "Book untuk Update",
            penulis: "Author Awal",
            penerbit: "Penerbit Awal",
            status: true
        })
            .set("Authorization", `Bearer ${token}`);
        console.log("Created book:", createRes.body);
        const bookId = createRes.body.data.id;
        // 2. Update book dengan field yang BENAR
        const updateRes = await request(app)
            .put(`/api/book/${bookId}`)
            .send({
            judul: "Judul Updated!", // ← Field yang benar untuk Book
            penulis: "Penulis Updated",
            penerbit: "Penerbit Updated",
            status: false
        })
            .set("Authorization", `Bearer ${token}`);
        console.log("Update response:", updateRes.statusCode, updateRes.body);
        expect(updateRes.statusCode).toBe(200);
    });
});
// 6
describe("DELETE /api/book/:id", () => {
    const token = jwt.sign({ id: 1, role: "ADMIN" }, config.JWT_SECRET);
    it("should delete book", async () => {
        // 1. Buat book dulu
        const createRes = await request(app)
            .post("/api/book")
            .send({ judul: "aaaaa", penulis: "asdfghj", penerbit: "dafuiwaf", status: true })
            .set("Authorization", `Bearer ${token}`);
        const bookId = createRes.body.data.id;
        // 2. Hapus book
        const deleteRes = await request(app)
            .delete(`/api/book/${bookId}`)
            .set("Authorization", `Bearer ${token}`);
        expect(deleteRes.statusCode).toBe(200);
    });
});
//# sourceMappingURL=book.test.js.map
