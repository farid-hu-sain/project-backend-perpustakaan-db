
import { body, param} from "express-validator";

export const createCategoryValidation = [
  body('nama')
    .notEmpty().withMessage('Nama kategori wajib diisi')
    .isString().withMessage('Nama kategori harus string')
    .isLength({ min: 3 }).withMessage('Nama kategori minimal 3 karakter'),
  
  body('deskripsi')
    .optional()
    .isString().withMessage('Deskripsi harus string'),
];

export const getCategoryByIdValidation = [
  param('id')
    .isNumeric().withMessage('ID harus angka')
];