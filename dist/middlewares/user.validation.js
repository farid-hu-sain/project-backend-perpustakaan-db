import { body, param } from "express-validator";
export const createUserValidation = [
    body('username')
        .trim()
        .notEmpty().withMessage('Nama user wajib diisi')
        .isLength({ min: 8 }).withMessage('Nama user minimal 8 karakter'),
    body('email')
        .trim()
        .notEmpty().withMessage('email wajib diisi')
        .isLength({ min: 8 }).withMessage('email minimal 8 karakter'),
    body('password_hash')
        .trim()
        .notEmpty().withMessage('password wajib diisi')
        .isLength({ min: 8 }).withMessage('password minimal 8 karakter'),
];
export const getUserByIdValidation = [
    param('id')
        .isNumeric().withMessage('ID harus angka')
];
//# sourceMappingURL=user.validation.js.map