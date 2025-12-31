import { Router } from "express"
import { UserController } from "../controllers/user.controller";
import { validate } from "../utils/validator";
import { createUserValidation, getUserByIdValidation } from "../middlewares/user.validation";
import { UserRepository } from "../repository/user.repository";
import { UserService } from "../services/user.service";
import prismaIntance from "../database";
import { authenticate } from "../middlewares/auth.middleware";

const repo = new UserRepository(prismaIntance)
const service = new UserService(repo)
const controller = new UserController(service)


const router = Router()

/**
 * @swagger
 * tags:
 *  name: User
 *  description: Manajemen user pengguna
 */

/**
 * @swagger
 * /user:
 *   get:
 *     summary: mengambil semua user
 *     tags: [User]
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
router.get('/', authenticate, controller.getAllUserHandler)


/**
 * @swagger
 * /user/stats:
 *   get:
 *     summary: menyortir bagian user
 *     tags: [User]
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
 * /user/{id}:
 *   get:
 *     summary: mencari user berdasarkan ID
 *     tags: [User]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID user yang dicari
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
router.get('/:id', authenticate, validate(getUserByIdValidation), controller.getUserByIdHandler);


/**
 * @swagger
 * /user/{id}:
 *   post:
 *     summary: membuat User baru
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password_hash
 *               - role
 * 
 *             properties:
 *               username:
 *                 type: string
 *                 format: username
 *                 example: belle
 *               email: 
 *                 type: string
 *                 format: email
 *                 example: bellebang@gmail.com
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
router.post('/', authenticate, validate(createUserValidation), controller.createUserHandler);


/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: melakukan update pada user
 *     tags: [User]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID user yang akan diupdate
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 format: username
 *                 example: shiro
 *               email:
 *                  type: string
 *                  format: email
 *                  example: shiroyama@gmail.com
 *               password_hash:
 *                  type: string
 *                  format: password
 *                  example: ayambekakakbengkak
 *               role:
 *                  type: string
 *                  format: role
 *                  example: MEMBER
 *                  
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
router.put('/:id', authenticate, controller.updateUserHandler)


/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: menghapus user
 *     tags: [User]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID user yang akan dihapus
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
router.delete('/:id', authenticate, controller.deleteUserHandler );

export default router

