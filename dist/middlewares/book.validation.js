import { body, param } from "express-validator";
export const createBookValidation = [
    body('judul')
        .notEmpty().withMessage('Judul wajib diisi')
        .isString().withMessage('Judul harus string'),
    body('penulis')
        .notEmpty().withMessage('Penulis wajib diisi')
        .isString().withMessage('Penulis harus string'),
    body('penerbit')
        .notEmpty().withMessage('Penerbit wajib diisi')
        .isString().withMessage('Penerbit harus string'),
    body('status')
        .isBoolean().withMessage('Status harus boolean') // ← INI YANG BENAR!
];
export const getBookByIdValidation = [
    param('id')
        .isNumeric().withMessage('ID harus angka')
];
//# sourceMappingURL=book.validation.js.map