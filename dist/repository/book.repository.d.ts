import type { Prisma, PrismaClient, Book } from "../generated";
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
    findComplex(judul: string): Promise<any>;
    getStats(): Promise<any>;
    getByBookStats(): Promise<any>;
}
//# sourceMappingURL=book.repository.d.ts.map