import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../app.js";
import config from "../utils/env.js";
// 1
describe("GET /api/category", () => {
    const token = jwt.sign({ id: 1, role: "ADMIN" }, config.JWT_SECRET);
    it("should return 200 and list of category", async () => {
        const res = await request(app)
            .get("/api/category")
            .set("Authorization", `Bearer ${token}`); // ← TAMBAH INI
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
        expect(Array.isArray(res.body.data)).toBe(true);
    });
});
// 2
describe("GET /api/category/stats", () => {
    const token = jwt.sign({ id: 1, role: "ADMIN" }, config.JWT_SECRET);
    it("should return 200 and category statistics", async () => {
        const res = await request(app)
            .get("/api/category/stats")
            .set("Authorization", `Bearer ${token}`);
        // Debug response
        console.log("Stats response:", JSON.stringify(res.body, null, 2));
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
    });
});
// 3
describe("GET /api/category/:id", () => {
    const token = jwt.sign({ id: 1, role: "ADMIN" }, config.JWT_SECRET);
    it("should return 200 and list of category", async () => {
        const res = await request(app)
            .get("/api/category")
            .set("Authorization", `Bearer ${token}`); // ← TAMBAH INI
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
        expect(Array.isArray(res.body.data)).toBe(true);
    });
});
// 4
describe("POST /api/category/:id", () => {
    const token = jwt.sign({ id: 1, role: "ADMIN" }, config.JWT_SECRET);
    it("should return 401 if no token provided", async () => {
        const res = await request(app)
            .post("/api/category")
            .send({
            nama: "aaaaa",
            deskripsi: "asdfghj"
        });
        console.log("Response tanpa token:", res.body); // ← DEBUG
        expect(res.statusCode).toEqual(401);
        expect(res.body.success).toBe(false);
    });
    it("Should return 201 and category that has been created", async () => {
        const res = await request(app)
            .post("/api/category")
            .send({
            nama: "Kategori Test",
            deskripsi: "Deskripsi test"
        })
            .set("Authorization", `Bearer ${token}`);
        console.log("Response dengan token:", res.body);
        expect(res.statusCode).toEqual(201);
        expect(res.body.success).toBe(true);
    });
});
// 5
describe("PUT /api/category/:id", () => {
    const token = jwt.sign({ id: 1, role: "ADMIN" }, config.JWT_SECRET);
    it("should update category", async () => {
        // Cari ID yang ada dari GET response sebelumnya
        // Atau buat category baru dulu
        const createRes = await request(app)
            .post("/api/category")
            .send({ nama: "Test Update", deskripsi: "Test" })
            .set("Authorization", `Bearer ${token}`);
        const categoryId = createRes.body.data.id;
        // Sekarang update
        const updateRes = await request(app)
            .put(`/api/category/${categoryId}`)
            .send({ nama: "Updated!", deskripsi: "Updated!" })
            .set("Authorization", `Bearer ${token}`);
        expect(updateRes.statusCode).toBe(200);
    });
});
// 6
describe("DELETE /api/category/:id", () => {
    const token = jwt.sign({ id: 1, role: "ADMIN" }, config.JWT_SECRET);
    it("should delete category", async () => {
        // 1. Buat category dulu
        const createRes = await request(app)
            .post("/api/category")
            .send({ nama: "Test Delete", deskripsi: "Test" })
            .set("Authorization", `Bearer ${token}`);
        const categoryId = createRes.body.data.id;
        // 2. Hapus category
        const deleteRes = await request(app)
            .delete(`/api/category/${categoryId}`)
            .set("Authorization", `Bearer ${token}`);
        expect(deleteRes.statusCode).toBe(200);
    });
});
//# sourceMappingURL=category.test.js.map
