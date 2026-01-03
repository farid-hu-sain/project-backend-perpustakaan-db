import { successResponse } from "../utils/response";
export class BorrowItemController {
    borrowItemService;
    constructor(borrowItemService) {
        this.borrowItemService = borrowItemService;
        this.getAllBorrowItemHandler = this.getAllBorrowItemHandler.bind(this);
        this.getBorrowItemByIdHandler = this.getBorrowItemByIdHandler.bind(this);
        this.createBorrowItemHandler = this.createBorrowItemHandler.bind(this);
        this.updateBorrowItemHandler = this.updateBorrowItemHandler.bind(this);
        this.deleteBorrowItemHandler = this.deleteBorrowItemHandler.bind(this);
        this.getstats = this.getstats.bind(this);
    }
    async getAllBorrowItemHandler(req, res) {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = req.query.search;
        const sortBy = req.query.sortBy;
        const sortOrder = req.query.sortOrder || 'desc';
        const result = await this.borrowItemService.getAll({
            page,
            limit,
            search,
            sortBy,
            sortOrder
        });
        const pagination = {
            page: result.currentPage,
            limit,
            total: result.total,
            totalPages: result.totalPages
        };
        successResponse(res, 'borrowItem berhasil ditambahkan', result.borrowItem, pagination);
    }
    async getBorrowItemByIdHandler(req, res) {
        if (!req.params.id) {
            throw new Error('tidak ada param');
        }
        const borrowItem = await this.borrowItemService.getBorrowItemById(req.params.id);
        successResponse(res, "borrowItem sudah diambil", borrowItem);
    }
    async createBorrowItemHandler(req, res) {
        const { quantity, returned, borrowId, bookId } = req.body;
        const data = {
            quantity: Number(quantity),
            returned: Number(returned),
            borrowId: Number(borrowId),
            bookId: Number(bookId)
        };
        const borrowItems = await this.borrowItemService.createBorrowItem(data);
        successResponse(res, "borrowItem berhasil ditambakan", borrowItems, null, 201);
    }
    async updateBorrowItemHandler(req, res) {
        const borrowItem = await this.borrowItemService.updateBorrowItem(req.params.id, req.body);
        successResponse(res, "borrowItem berhasil di update", borrowItem);
    }
    async deleteBorrowItemHandler(req, res) {
        const deleted = await this.borrowItemService.deleteBorrowItem(req.params.id);
        res.json({
            success: true,
            message: "borrowItem berhasil dihapus",
            data: deleted
        });
    }
    async getstats(_req, res) {
        const stats = await this.borrowItemService.exec();
        successResponse(res, "Statistik borrowItem berhasil diambil", stats, null, 200);
    }
}
//# sourceMappingURL=borrowItem.controller.js.map