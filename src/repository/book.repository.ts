import type {  Prisma, PrismaClient, Book } from "../../dist/generated";

export interface IBookRepository {
    list(
        skip: number,
        take: number,
        where: Prisma.BookWhereInput,
        orderBy: Prisma.BookOrderByWithRelationInput
    ): Promise<Book[]>;
    countAll(where: Prisma.BookWhereInput): Promise<number>;
    findById(id: number): Promise<Book | null>;
    create(data: Prisma.BookCreateInput): Promise<Book>;
    update(id: number, data: Prisma.BookUpdateInput): Promise<Book>;
    softDelete(id: number): Promise<Book>
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
    }>>
    getByBookStats(): Promise<(Prisma.PickEnumerable<Prisma.BookGroupByOutputType, "status"[]> & {
        _count: {
            id: number;
        };
    })[]>
}

export class BookRepository implements IBookRepository {
    constructor(private prisma: PrismaClient) { }

    async list(
        skip: number,
        take: number,
        where: Prisma.BookWhereInput,
        orderBy: Prisma.BookOrderByWithRelationInput
    ): Promise<Book[]> {
        return await this.prisma.book.findMany({
            skip,
            take,
            where,
            orderBy,
            include: { 
                category: true,
                user: true
             }
        })
    }

    async countAll(where: Prisma.BookWhereInput): Promise<number> {
        return await this.prisma.book.count({ where })
    }

    async findById(id: number): Promise<Book | null> {
        return await this.prisma.book.findUnique({
            where: {
                id: id,
                deletedAt: null,
            },
            include: {
                category: true,
                user: true
            }
        })
    }

    async create(data: Prisma.BookCreateInput): Promise<Book> {
        return await this.prisma.book.create({ data })
    }

    async update(id: number, data: Prisma.BookUpdateInput): Promise<Book> {
        return await this.prisma.book.update({
            where: {
                id,
                deletedAt: null,
            },
            data
        })
    }

    async softDelete(id: number): Promise<Book> {
        return await this.prisma.book.update({
            where: {
                id,
                deletedAt: null,
            },
            data: {
                deletedAt: new Date()
            }
        })
    }

    async findComplex(judul: string) {
  return this.prisma.book.findMany({
    where: {
      OR: [
        { judul: judul },
      ],
    },
  });
}

    async getStats() {
        return await this.prisma.book.aggregate ({
            _count: { id: true },          
            _min: { createdAt: true },     
            _max: { createdAt: true }    
        })
    }

    async getByBookStats() {
        return await this.prisma.book.groupBy ({
            by: ['status'],
            _count: { id: true },
        })
    }
}
