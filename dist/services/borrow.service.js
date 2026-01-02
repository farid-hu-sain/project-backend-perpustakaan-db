export class BorrowService {
    borrowRepo;
    constructor(borrowRepo) {
        this.borrowRepo = borrowRepo;
    }
    async getAll(params) {
        const { page, limit, search, sortBy, sortOrder } = params;
        const skip = (page - 1) * limit;
        const whereClause = {
            deletedAt: null
        };
        if (search?.userId) {
            whereClause.userId = search.userId;
        }
        const sortCriteria = sortBy ? { [sortBy]: sortOrder || "desc" } : { createdAt: "desc" };
        const borrow = await this.borrowRepo.list(skip, limit, whereClause, sortCriteria);
        const total = await this.borrowRepo.countAll(whereClause);
        return {
            borrow,
            total,
            totalPages: Math.ceil(total / limit),
            currentPage: page
        };
    }
    async getBorrowById(id) {
        const numId = parseInt(id);
        const borrow = await this.borrowRepo.findById(numId);
        if (!borrow) {
            throw new Error('Borrow tidak ditemukan');
        }
        return borrow;
    }
    async createBorrow(data) {
        return await this.borrowRepo.create({
            user: {
                connect: { id: data.userId }
            }
        });
    }
    async updateBorrow(id, data) {
        await this.getBorrowById(id);
        const numId = parseInt(id);
        return await this.borrowRepo.update(numId, data);
    }
    async deleteBorrow(id) {
        const numId = parseInt(id);
        return await this.borrowRepo.softDelete(numId);
    }
    async exec() {
        const stats = await this.borrowRepo.getStats();
        const BorrowStats = await this.borrowRepo.getByBorrowStats();
        return {
            overview: stats,
            byBorrow: BorrowStats
        };
    }
}
//# sourceMappingURL=borrow.service.js.map