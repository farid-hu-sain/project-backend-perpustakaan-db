import { body, param } from "express-validator";
export const createBorrowItemValidation = [
    body('quantity')
        .isNumeric().withMessage('quantity harus angka')
        .custom(value => value > 1).withMessage('quantity harus lebih dari 1')
        .toInt(),
    body('returned')
        .isNumeric().withMessage('returned harus angka')
        .custom(value => value > 0).withMessage('returned harus lebih dari 0')
        .toInt(),
    body('borrowId')
        .isNumeric().withMessage('Borrow ID harus angka')
        .custom(value => value > 0).withMessage('Borrow ID harus lebih dari 0')
        .toInt(),
    body('bookId')
        .isNumeric().withMessage('Book ID harus angka')
        .custom(value => value > 0).withMessage('Book ID harus lebih dari 0')
        .toInt(),
];
export const getBorrowItemByIdValidation = [
    param('id')
        .isNumeric().withMessage('ID harus angka')
];
//# sourceMappingURL=borrowItem.validation.js.map