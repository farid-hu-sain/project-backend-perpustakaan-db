export class BorrowItemRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list(skip, take, where, orderBy) {
        return await this.prisma.borrowItem.findMany({
            skip,
            take,
            where,
            orderBy,
            include: {
                book: true
            }
        });
    }
    async countAll(where) {
        return await this.prisma.borrowItem.count({ where });
    }
    async findById(id) {
        return await this.prisma.borrowItem.findUnique({
            where: {
                id,
                deletedAt: null,
            },
            include: {
                book: true
            }
        });
    }
    async create(data) {
        return await this.prisma.borrowItem.create({ data });
    }
    async update(id, data) {
        return await this.prisma.borrowItem.update({
            where: {
                id,
                deletedAt: null,
            },
            data
        });
    }
    async softDelete(id) {
        return await this.prisma.borrowItem.update({
            where: {
                id,
                deletedAt: null,
            },
            data: {
                deletedAt: new Date()
            }
        });
    }
    async findComplex(borrowId, bookId) {
        return this.prisma.borrowItem.findMany({
            where: {
                OR: [
                    { borrowId: borrowId,
                        bookId: bookId
                    },
                ],
            },
        });
    }
    async getStats() {
        return await this.prisma.borrowItem.aggregate({
            _count: { id: true },
            _min: { createdAt: true },
            _max: { createdAt: true }
        });
    }
    async getByBorrowItemStats() {
        return await this.prisma.borrowItem.groupBy({
            by: ['borrowId'],
            _count: { id: true },
        });
    }
}
//# sourceMappingURL=borrowItem.repository.js.map