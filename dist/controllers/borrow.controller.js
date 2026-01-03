import { successResponse } from "../utils/response";
export class BorrowController {
    borrowService;
    constructor(borrowService) {
        this.borrowService = borrowService;
        this.getAllBorrowHandler = this.getAllBorrowHandler.bind(this);
        this.getBorrowByIdHandler = this.getBorrowByIdHandler.bind(this);
        this.createBorrowHandler = this.createBorrowHandler.bind(this);
        this.updateBorrowHandler = this.updateBorrowHandler.bind(this);
        this.deleteBorrowHandler = this.deleteBorrowHandler.bind(this);
        this.getstats = this.getstats.bind(this);
    }
    async getAllBorrowHandler(req, res) {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = req.query.search;
        const sortBy = req.query.sortBy;
        const sortOrder = req.query.sortOrder || 'desc';
        const result = await this.borrowService.getAll({
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
        successResponse(res, 'borrow berhasil ditambahkan', result.borrow, pagination);
    }
    async getBorrowByIdHandler(req, res) {
        if (!req.params.id) {
            throw new Error('tidak ada param');
        }
        const borrow = await this.borrowService.getBorrowById(req.params.id);
        successResponse(res, "borrow sudah diambil", borrow);
    }
    async createBorrowHandler(req, res) {
        const { userId } = req.body;
        const data = {
            userId: Number(userId)
        };
        const borrows = await this.borrowService.createBorrow(data);
        successResponse(res, "borrow berhasil ditambakan", borrows, null, 201);
    }
    async updateBorrowHandler(req, res) {
        const borrow = await this.borrowService.updateBorrow(req.params.id, req.body);
        successResponse(res, "borrow berhasil di update", borrow);
    }
    async deleteBorrowHandler(req, res) {
        const deleted = await this.borrowService.deleteBorrow(req.params.id);
        res.json({
            success: true,
            message: "borrow berhasil dihapus",
            data: deleted
        });
    }
    async getstats(_req, res) {
        const stats = await this.borrowService.exec();
        successResponse(res, "Statistik borrow berhasil diambil", stats, null, 200);
    }
}
//# sourceMappingURL=borrow.controller.js.map