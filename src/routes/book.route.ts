import { Router } from "express"
import { BookController } from "../controllers/book.controller";
import { validate } from "../utils/validator";
import { createBookValidation, getBookByIdValidation } from "../middlewares/book.validation";
import { BookRepository } from "../repository/book.repository";
import { BookService } from "../services/book.service";
import prismaIntance from "../database";
import { authenticate } from "../middlewares/auth.middleware";

const repo = new BookRepository(prismaIntance)
const service = new BookService(repo)
const controller = new BookController(service)


const router = Router()

/**
 * @swagger
 * tags:
 *  name: Book
 *  description: Manajemen book pengguna
 */

/**
 * @swagger
 * /book:
 *   get:
 *     summary: mengambil semua book
 *     tags: [Book]
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
router.get('/', authenticate, controller.getAllBookHandler)


/**
 * @swagger
 * /book/stats:
 *   get:
 *     summary: menyortir bagian book
 *     tags: [Book]
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
router.get('/stats', authenticate, controller.getstats)



/**
 * @swagger
 * /book/{id}:
 *   get:
 *     summary: mencari book berdasarkan ID
 *     tags: [Book]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID book yang dicari
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
router.get('/:id', authenticate, validate(getBookByIdValidation), controller.getBookByIdHandler);


/**
 * @swagger
 * /book/{id}:
 *   post:
 *     summary: membuat Book baru
 *     tags: [Book]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - judul
 *               - penulis
 *               - penerbit
 *               - status
 * 
 *             properties:
 *               judul:
 *                 type: string
 *                 format: judul
 *                 example: 19 dosa besar Jokowi
 *               penulis: 
 *                 type: string
 *                 format: penulis
 *                 example: lil keling
 *               penerbit: 
 *                 type: string
 *                 format: penerbit
 *                 example: sawit studio
 *               status:
 *                 type: boolean
 *                 example: true
 *                 description: Status ketersediaan buku (true = tersedia, false = dipinjam)
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
router.post('/', authenticate, validate(createBookValidation), controller.createBookHandler);


/**
 * @swagger
 * /book/{id}:
 *   put:
 *     summary: melakukan update pada book
 *     tags: [Book]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID book yang akan diupdate
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               judul:
 *                 type: string
 *                 format: nama
 *                 example: bisnis
 *               penulis:
 *                  type: string
 *                  format: penulis
 *                  example: swait-chan
 *               penerbit: 
 *                  type: string
 *                  format: penerbit
 *                  example: ethan null
 *               status:
 *                 type: boolean
 *                 example: true
 *                 description: Status ketersediaan buku (true = tersedia, false = dipinjam)
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
router.put('/:id', authenticate, controller.updateBookHandler)


/**
 * @swagger
 * /book/{id}:
 *   delete:
 *     summary: menghapus book
 *     tags: [Book]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID book yang akan dihapus
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
router.delete('/:id', authenticate, controller.deleteBookHandler );

export default router