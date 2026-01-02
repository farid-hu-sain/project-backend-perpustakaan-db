import { Router } from "express";
import { CategoryController } from "../controllers/category.controller.js";
import { validate } from "../utils/validator.js";
import { getCategoryByIdValidation } from "../middlewares/category.validation.js";
import { CategoryRepository } from "../repository/category.repository.js";
import { CategoryService } from "../services/category.service.js";
import prismaIntance from "../database.js";
import { authenticate } from "../middlewares/auth.middleware.js";
const repo = new CategoryRepository(prismaIntance);
const service = new CategoryService(repo);
const controller = new CategoryController(service);
const router = Router();
/**
 * @swagger
 * tags:
 *  name: Category
 *  description: Manajemen category pengguna
 */
/**
 * @swagger
 * /category:
 *   get:
 *     summary: mengambil semua category
 *     tags: [Category]
 *     parameters:
 *       - name: page
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: limit
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           example: 10
 *
 *     responses:
 *       200:
 *         description:  koneksi terhubung
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                 pagination:
 *                   type: object
 *                 errors:
 *                   type: object
 *
 *       401:
 *         description: koneksi tidak terhubung
 */
router.get("/", authenticate, controller.getAllCategoryHandler);
/**
 * @swagger
 * /category/stats:
 *   get:
 *     summary: menyortir bagian category
 *     tags: [Category]
 *
 *     responses:
 *       200:
 *         description:  koneksi terhubung
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                 pagination:
 *                   type: object
 *                 errors:
 *                   type: object
 *
 *       401:
 *         description: koneksi tidak terhubung
 */
router.get("/stats", authenticate, controller.getstats);
/**
 * @swagger
 * /category/{id}:
 *   get:
 *     summary: mencari category berdasarkan ID
 *     tags: [Category]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID category yang dicari
 *         schema:
 *           type: integer
 *
 *     responses:
 *       200:
 *         description:  koneksi terhubung
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                 pagination:
 *                   type: object
 *                 errors:
 *                   type: object
 *
 *       401:
 *         description: koneksi tidak terhubung
 */
router.get("/:id", authenticate, validate(getCategoryByIdValidation), controller.getCategoryByIdHandler);
/**
 * @swagger
 * /category/{id}:
 *   post:
 *     summary: membuat Category baru
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nama
 *               - deskripsi
 *
 *             properties:
 *               nama:
 *                 type: string
 *                 format: nama
 *                 example: sejarah
 *               deskripsi:
 *                 type: string
 *                 format: deskripsi
 *                 example: menceritakan tentang kejadian yang telah ada di masa lampau
 *
 *     responses:
 *       200:
 *         description: data berhasil masuk
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                 pagination:
 *                   type: object
 *                 errors:
 *                   type: object
 *
 *       401:
 *         description: koneksi tidak terhubung
 */
router.post("/", authenticate, controller.createCategoryHandler);
/**
 * @swagger
 * /category/{id}:
 *   put:
 *     summary: melakukan update pada category
 *     tags: [Category]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID category yang akan diupdate
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nama:
 *                 type: string
 *                 format: nama
 *                 example: bisnis
 *               deskripsi:
 *                  type: string
 *                  format: deskripsi
 *                  example: membahas dan memahami dunia usaha
 *
 *     responses:
 *       200:
 *         description:  koneksi terhubung
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                 pagination:
 *                   type: object
 *                 errors:
 *                   type: object
 *
 *       401:
 *         description: koneksi tidak terhubung
 */
router.put("/:id", authenticate, controller.updateCategoryHandler);
/**
 * @swagger
 * /category/{id}:
 *   delete:
 *     summary: menghapus category
 *     tags: [Category]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID category yang akan dihapus
 *         schema:
 *           type: integer
 *
 *     responses:
 *       200:
 *         description:  koneksi terhubung
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                 pagination:
 *                   type: object
 *                 errors:
 *                   type: object
 *
 *       401:
 *         description: koneksi tidak terhubung
 */
router.delete("/:id", authenticate, controller.deleteCategoryHandler);
export default router;
//# sourceMappingURL=category.route.js.map
