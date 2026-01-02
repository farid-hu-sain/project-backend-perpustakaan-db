import { Router } from "express";
import { BorrowController } from "../controllers/borrow.controller.js";
import { validate } from "../utils/validator.js";
import { createBorrowValidation, getBorrowByIdValidation } from "../middlewares/borrow.validation.js";
import { BorrowRepository } from "../repository/borrow.repository.js";
import { BorrowService } from "../services/borrow.service.js";
import prismaIntance from "../database.js";
const repo = new BorrowRepository(prismaIntance);
const service = new BorrowService(repo);
const controller = new BorrowController(service);
const router = Router();
/**
 * @swagger
 * tags:
 *  name: Borrow
 *  description: Manajemen borrow pengguna
 */
/**
 * @swagger
 * /borrow:
 *   get:
 *     summary: mengambil semua borrow
 *     tags: [Borrow]
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
router.get("/", controller.getAllBorrowHandler);
/**
 * @swagger
 * /borrow/stats:
 *   get:
 *     summary: menyortir bagian borrow
 *     tags: [Borrow]
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
router.get("/stats", controller.getstats);
/**
 * @swagger
 * /borrow/{id}:
 *   get:
 *     summary: mencari borrow berdasarkan ID
 *     tags: [Borrow]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID borrow yang dicari
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
router.get("/:id", validate(getBorrowByIdValidation), controller.getBorrowByIdHandler);
/**
 * @swagger
 * /borrow/id:
 *   post:
 *     summary: membuat Borrow baru
 *     tags: [Borrow]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tanggal_Pengembalian
 *
 *             properties:
 *               tanggal_Pengembalian :
 *                 type: number
 *                 format: tanggal_Pengembalian
 *                 example: 28-12-2025
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
router.post("/", validate(createBorrowValidation), controller.createBorrowHandler);
/**
 * @swagger
 * /borrow/{id}:
 *   put:
 *     summary: melakukan update pada borrow
 *     tags: [Borrow]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID borrow yang akan diupdate
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
router.put("/:id", controller.updateBorrowHandler);
/**
 * @swagger
 * /borrow/{id}:
 *   delete:
 *     summary: menghapus borrow
 *     tags: [Borrow]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID borrow yang akan dihapus
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
router.delete("/:id", controller.deleteBorrowHandler);
export default router;
//# sourceMappingURL=borrow.route.js.map
