export class BookService {
    bookRepo;
    constructor(bookRepo) {
        this.bookRepo = bookRepo;
    }
    async getAll(params) {
        const { page, limit, search, sortBy, sortOrder } = params;
        const skip = (page - 1) * limit;
        const whereClause = {
            deletedAt: null
        };
        if (search?.judul) {
            whereClause.judul = { contains: search.judul, mode: "insensitive" };
        }
        if (search?.penulis) {
            whereClause.penulis = { contains: search.penulis, mode: "insensitive" };
        }
        if (search?.penerbit) {
            whereClause.penerbit = { contains: search.penerbit, mode: "insensitive" };
        }
        const sortCriteria = sortBy ? { [sortBy]: sortOrder || "desc" } : { createdAt: "desc" };
        const book = await this.bookRepo.list(skip, limit, whereClause, sortCriteria);
        const total = await this.bookRepo.countAll(whereClause);
        return {
            book,
            total,
            totalPages: Math.ceil(total / limit),
            currentPage: page
        };
    }
    async getBookById(id) {
        const numId = parseInt(id);
        const book = await this.bookRepo.findById(numId);
        if (!book) {
            throw new Error('Book tidak ditemukan');
        }
        return book;
    }
    async createBook(data) {
        return await this.bookRepo.create(data);
    }
    async updateBook(id, data) {
        await this.getBookById(id);
        const numId = parseInt(id);
        return await this.bookRepo.update(numId, data);
    }
    async deleteBook(id) {
        const numId = parseInt(id);
        return await this.bookRepo.softDelete(numId);
    }
    async exec() {
        const stats = await this.bookRepo.getStats();
        const BookStats = await this.bookRepo.getByBookStats();
        return {
            overview: stats,
            byBook: BookStats
        };
    }
}
//# sourceMappingURL=book.service.js.map