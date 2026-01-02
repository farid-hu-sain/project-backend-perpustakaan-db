export class BorrowItemService {
    borrowItemRepo;
    constructor(borrowItemRepo) {
        this.borrowItemRepo = borrowItemRepo;
    }
    async getAll(params) {
        const { page, limit, search, sortBy, sortOrder } = params;
        const skip = (page - 1) * limit;
        const whereClause = {
            deletedAt: null
        };
        if (search?.borrowId) {
            whereClause.borrowId = search.borrowId;
        }
        if (search?.bookId) {
            whereClause.bookId = search.bookId;
        }
        const sortCriteria = sortBy ? { [sortBy]: sortOrder || "desc" } : { createdAt: "desc" };
        const borrowItem = await this.borrowItemRepo.list(skip, limit, whereClause, sortCriteria);
        const total = await this.borrowItemRepo.countAll(whereClause);
        return {
            borrowItem,
            total,
            totalPages: Math.ceil(total / limit),
            currentPage: page
        };
    }
    async getBorrowItemById(id) {
        const numId = parseInt(id);
        const borrowItem = await this.borrowItemRepo.findById(numId);
        if (!borrowItem) {
            throw new Error('BorrowItem tidak ditemukan');
        }
        return borrowItem;
    }
    async createBorrowItem(data) {
        return await this.borrowItemRepo.create(data);
    }
    async updateBorrowItem(id, data) {
        await this.getBorrowItemById(id);
        const numId = parseInt(id);
        return await this.borrowItemRepo.update(numId, data);
    }
    async deleteBorrowItem(id) {
        const numId = parseInt(id);
        return await this.borrowItemRepo.softDelete(numId);
    }
    async exec() {
        const stats = await this.borrowItemRepo.getStats();
        const BorrowItemStats = await this.borrowItemRepo.getByBorrowItemStats();
        return {
            overview: stats,
            byBorrowItem: BorrowItemStats
        };
    }
}
//# sourceMappingURL=borrowItem.service.js.map