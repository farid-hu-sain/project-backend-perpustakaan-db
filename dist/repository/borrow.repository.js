export class BorrowRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list(skip, take, where, orderBy) {
        return await this.prisma.borrow.findMany({
            skip,
            take,
            where,
            orderBy,
            include: {
                user: true
            }
        });
    }
    async countAll(where) {
        return await this.prisma.borrow.count({ where });
    }
    async findById(id) {
        return await this.prisma.borrow.findUnique({
            where: {
                id,
                deletedAt: null,
            },
            include: {
                user: true
            }
        });
    }
    async create(data) {
        return await this.prisma.borrow.create({ data });
    }
    async update(id, data) {
        return await this.prisma.borrow.update({
            where: {
                id,
                deletedAt: null,
            },
            data
        });
    }
    async softDelete(id) {
        return await this.prisma.borrow.update({
            where: {
                id,
                deletedAt: null,
            },
            data: {
                deletedAt: new Date()
            }
        });
    }
    async findComplex(userId) {
        return this.prisma.borrow.findMany({
            where: {
                OR: [
                    { userId: userId },
                ],
            },
        });
    }
    async getStats() {
        return await this.prisma.borrow.aggregate({
            _count: { id: true },
            _min: { createdAt: true },
            _max: { createdAt: true }
        });
    }
    async getByBorrowStats() {
        return await this.prisma.borrow.groupBy({
            by: ['userId'],
            _count: { id: true },
        });
    }
}
//# sourceMappingURL=borrow.repository.js.map