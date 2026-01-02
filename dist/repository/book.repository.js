export class BookRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list(skip, take, where, orderBy) {
        return await this.prisma.book.findMany({
            skip,
            take,
            where,
            orderBy,
            include: {
                category: true,
                user: true
            }
        });
    }
    async countAll(where) {
        return await this.prisma.book.count({ where });
    }
    async findById(id) {
        return await this.prisma.book.findUnique({
            where: {
                id: id,
                deletedAt: null,
            },
            include: {
                category: true,
                user: true
            }
        });
    }
    async create(data) {
        return await this.prisma.book.create({ data });
    }
    async update(id, data) {
        return await this.prisma.book.update({
            where: {
                id,
                deletedAt: null,
            },
            data
        });
    }
    async softDelete(id) {
        return await this.prisma.book.update({
            where: {
                id,
                deletedAt: null,
            },
            data: {
                deletedAt: new Date()
            }
        });
    }
    async findComplex(judul) {
        return this.prisma.book.findMany({
            where: {
                OR: [
                    { judul: judul },
                ],
            },
        });
    }
    async getStats() {
        return await this.prisma.book.aggregate({
            _count: { id: true },
            _min: { createdAt: true },
            _max: { createdAt: true }
        });
    }
    async getByBookStats() {
        return await this.prisma.book.groupBy({
            by: ['status'],
            _count: { id: true },
        });
    }
}
//# sourceMappingURL=book.repository.js.map