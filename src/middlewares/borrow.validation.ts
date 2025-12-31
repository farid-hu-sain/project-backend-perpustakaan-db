
import { body, param} from "express-validator";


export const createBorrowValidation = [
  body('userId')
    .isNumeric().withMessage('User ID harus angka')
    .custom(value => value > 0).withMessage('User ID harus lebih dari 0')
    .toInt(),
  
  body('tanggal_pengembalian')
    .notEmpty().withMessage('tanggal harus angka')
    .custom(value => value > 0).withMessage('tanggal harus lebih dari 0')
    .toInt(),
];

export const getBorrowByIdValidation = [
  param('id')
    .isNumeric().withMessage('ID harus angka')
];