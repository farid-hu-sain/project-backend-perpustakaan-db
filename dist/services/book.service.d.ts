import type { Prisma, Book } from "../generated";
import type { IBookRepository } from "../repository/book.repository";
interface FindAllParams {
    page: number;
    limit: number;
    search?: {
        judul?: string;
        penulis?: string;
        penerbit?: string;
    };
    sortBy?: string;
    sortOrder?: "asc" | "desc";
}
export interface BookListRespone {
    book: Book[];
    total: number;
    totalPages: number;
    currentPage: number;
}
export interface IBookService {
    getAll(params: FindAllParams): Promise<BookListRespone>;
    getBookById(id: string): Promise<Book | null>;
    createBook(data: {
        judul: string;
        penulis: string;
        penerbit: string;
        status: boolean;
    }): Promise<Book>;
    updateBook(id: string, data: Partial<Book>): Promise<Book>;
    deleteBook(id: string): Promise<Book>;
    exec(): Promise<{
        overview: any;
        byBook: any;
    }>;
}
export declare class BookService implements IBookService {
    private bookRepo;
    constructor(bookRepo: IBookRepository);
    getAll(params: FindAllParams): Promise<BookListRespone>;
    getBookById(id: string): Promise<Book | null>;
    createBook(data: {
        judul: string;
        penulis: string;
        penerbit: string;
        status: boolean;
    }): Promise<Book>;
    updateBook(id: string, data: Partial<Book>): Promise<Book>;
    deleteBook(id: string): Promise<{
        id: number;
        judul: string;
        penulis: string;
        penerbit: string;
        status: boolean;
        categoryId: number | null;
        userId: number | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
    exec(): Promise<{
        overview: Prisma.GetBookAggregateType<{
            _count: {
                id: true;
            };
            _min: {
                createdAt: true;
            };
            _max: {
                createdAt: true;
            };
        }>;
        byBook: (Prisma.PickEnumerable<Prisma.BookGroupByOutputType, "status"[]> & {
            _count: {
                id: number;
            };
        })[];
    }>;
}
export {};
//# sourceMappingURL=book.service.d.ts.map