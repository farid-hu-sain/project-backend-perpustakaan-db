import type { Prisma, PrismaClient, Book } from "../../dist/generated";
export interface IBookRepository {
    list(skip: number, take: number, where: Prisma.BookWhereInput, orderBy: Prisma.BookOrderByWithRelationInput): Promise<Book[]>;
    countAll(where: Prisma.BookWhereInput): Promise<number>;
    findById(id: number): Promise<Book | null>;
    create(data: Prisma.BookCreateInput): Promise<Book>;
    update(id: number, data: Prisma.BookUpdateInput): Promise<Book>;
    softDelete(id: number): Promise<Book>;
    getStats(): Promise<Prisma.GetBookAggregateType<{
        _count: {
            id: true;
        };
        _min: {
            createdAt: true;
        };
        _max: {
            createdAt: true;
        };
    }>>;
    getByBookStats(): Promise<(Prisma.PickEnumerable<Prisma.BookGroupByOutputType, "status"[]> & {
        _count: {
            id: number;
        };
    })[]>;
}
export declare class BookRepository implements IBookRepository {
    private prisma;
    constructor(prisma: PrismaClient);
    list(skip: number, take: number, where: Prisma.BookWhereInput, orderBy: Prisma.BookOrderByWithRelationInput): Promise<Book[]>;
    countAll(where: Prisma.BookWhereInput): Promise<number>;
    findById(id: number): Promise<Book | null>;
    create(data: Prisma.BookCreateInput): Promise<Book>;
    update(id: number, data: Prisma.BookUpdateInput): Promise<Book>;
    softDelete(id: number): Promise<Book>;
    findComplex(judul: string): Promise<{
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
    }[]>;
    getStats(): Promise<Prisma.GetBookAggregateType<{
        _count: {
            id: true;
        };
        _min: {
            createdAt: true;
        };
        _max: {
            createdAt: true;
        };
    }>>;
    getByBookStats(): Promise<(Prisma.PickEnumerable<Prisma.BookGroupByOutputType, "status"[]> & {
        _count: {
            id: number;
        };
    })[]>;
}
//# sourceMappingURL=book.repository.d.ts.map