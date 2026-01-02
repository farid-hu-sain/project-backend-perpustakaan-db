import { successResponse } from "../utils/response";
export class BookController {
    bookService;
    constructor(bookService) {
        this.bookService = bookService;
        this.getAllBookHandler = this.getAllBookHandler.bind(this);
        this.getBookByIdHandler = this.getBookByIdHandler.bind(this);
        this.createBookHandler = this.createBookHandler.bind(this);
        this.updateBookHandler = this.updateBookHandler.bind(this);
        this.deleteBookHandler = this.deleteBookHandler.bind(this);
        this.getstats = this.getstats.bind(this);
    }
    async getAllBookHandler(req, res) {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = req.query.search;
        const sortBy = req.query.sortBy;
        const sortOrder = req.query.sortOrder || 'desc';
        const result = await this.bookService.getAll({
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
        successResponse(res, 'buku berhasil ditambahkan', result.book, pagination);
    }
    async getBookByIdHandler(req, res) {
        if (!req.params.id) {
            throw new Error('tidak ada param');
        }
        const book = await this.bookService.getBookById(req.params.id);
        successResponse(res, "buku sudah diambil", book);
    }
    async createBookHandler(req, res) {
        const { judul, penulis, penerbit, status } = req.body;
        const data = {
            judul: judul.toString(),
            penulis: penulis.toString(),
            penerbit: penerbit.toString(),
            status: Boolean(status)
        };
        const books = await this.bookService.createBook(data);
        successResponse(res, "buku berhasil ditambakan", books, null, 201);
    }
    async updateBookHandler(req, res) {
        const book = await this.bookService.updateBook(req.params.id, req.body);
        successResponse(res, "buku berhasil di update", book);
    }
    async deleteBookHandler(req, res) {
        const deleted = await this.bookService.deleteBook(req.params.id);
        res.json({
            success: true,
            message: "kategoti berhasil dihapus",
            data: deleted
        });
    }
    async getstats(_req, res) {
        const stats = await this.bookService.exec();
        successResponse(res, "Statistik buku berhasil diambil", stats, null, 200);
    }
}
//# sourceMappingURL=book.controller.js.map