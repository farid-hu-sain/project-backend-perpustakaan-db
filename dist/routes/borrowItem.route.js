import { Router } from "express";
import { BorrowItemController } from "../controllers/borrowItem.controller.js";
import { validate } from "../utils/validator.js";
import { createBorrowItemValidation, getBorrowItemByIdValidation } from "../middlewares/borrowItem.validation.js";
import { BorrowItemRepository } from "../repository/borrowItem.repository.js";
import { BorrowItemService } from "../services/borrowItem.service.js";
import prismaIntance from "../database.js";
const repo = new BorrowItemRepository(prismaIntance);
const service = new BorrowItemService(repo);
const controller = new BorrowItemController(service);
const router = Router();
/**
 * @swagger
 * tags:
 *  name: BorrowItem
 *  description: Manajemen borrowItem pengguna
 */
/**
 * @swagger
 * /borrowItem:
 *   get:
 *     summary: mengambil semua borrowItem
 *     tags: [BorrowItem]
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
router.get("/", controller.getAllBorrowItemHandler);
/**
 * @swagger
 * /borrowItem/stats:
 *   get:
 *     summary: menyortir bagian borrowItem
 *     tags: [BorrowItem]
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
 * /borrowItem/{id}:
 *   get:
 *     summary: mencari borrowItem berdasarkan ID
 *     tags: [BorrowItem]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID borrowItem yang dicari
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
router.get("/:id", validate(getBorrowItemByIdValidation), controller.getBorrowItemByIdHandler);
/**
 * @swagger
 * /borrowItem/{id}:
 *   post:
 *     summary: membuat BorrowItem baru
 *     tags: [BorrowItem]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantity
 *               - returned
 *
 *             properties:
 *               quantity:
 *                 type: integer
 *                 format: quantity
 *                 example: 1
 *               returned:
 *                 type: integer
 *                 format: returned
 *                 example: 1
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
router.post("/", validate(createBorrowItemValidation), controller.createBorrowItemHandler);
/**
 * @swagger
 * /borrowItem/{id}:
 *   put:
 *     summary: melakukan update pada borrowItem
 *     tags: [BorrowItem]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID borrowItem yang akan diupdate
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               properties:
 *               quantity:
 *                 type: integer
 *                 format: quantity
 *                 example: 2
 *               returned:
 *                 type: integer
 *                 format: returned
 *                 example: 3
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
router.put("/:id", controller.updateBorrowItemHandler);
/**
 * @swagger
 * /borrowItem/{id}:
 *   delete:
 *     summary: menghapus borrowItem
 *     tags: [BorrowItem]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID borrowItem yang akan dihapus
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
router.delete("/:id", controller.deleteBorrowItemHandler);
export default router;
//# sourceMappingURL=borrowItem.route.js.map
