import type {  Prisma, PrismaClient, BorrowItem } from "../generated";

export interface IBorrowItemRepository {
    list(
        skip: number,
        take: number,
        where: Prisma.BorrowItemWhereInput,
        orderBy: Prisma.BorrowItemOrderByWithRelationInput
    ): Promise<BorrowItem[]>;
    countAll(where: Prisma.BorrowItemWhereInput): Promise<number>;
    findById(id: number): Promise<BorrowItem | null>;
    create(data: Prisma.BorrowItemCreateInput): Promise<BorrowItem>;
    update(id: number, data: Prisma.BorrowItemUpdateInput): Promise<BorrowItem>;
    softDelete(id: number): Promise<BorrowItem>
    getStats(): Promise<Prisma.GetBorrowItemAggregateType<{
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
    getByBorrowItemStats(): Promise<(Prisma.PickEnumerable<Prisma.BorrowItemGroupByOutputType, "borrowId"[]> & {
        _count: {
            id: number;
        };
    })[]>
}

export class BorrowItemRepository implements IBorrowItemRepository {
    constructor(private prisma: PrismaClient) { }

    async list(
        skip: number,
        take: number,
        where: Prisma.BorrowItemWhereInput,
        orderBy: Prisma.BorrowItemOrderByWithRelationInput
    ): Promise<BorrowItem[]> {
        return await this.prisma.borrowItem.findMany({
            skip,
            take,
            where,
            orderBy,
            include: { 
                book: true
             }
        })
    }

    async countAll(where: Prisma.BorrowItemWhereInput): Promise<number> {
        return await this.prisma.borrowItem.count({ where })
    }

    async findById(id: number): Promise<BorrowItem | null> {
        return await this.prisma.borrowItem.findUnique({
            where: {
                id,
                deletedAt: null,
            },
            include: {
                book: true
            }
        })
    }

    async create(data: Prisma.BorrowItemCreateInput): Promise<BorrowItem> {
        return await this.prisma.borrowItem.create({ data })
    }

    async update(id: number, data: Prisma.BorrowItemUpdateInput): Promise<BorrowItem> {
        return await this.prisma.borrowItem.update({
            where: {
                id,
                deletedAt: null,
            },
            data
        })
    }

    async softDelete(id: number): Promise<BorrowItem> {
        return await this.prisma.borrowItem.update({
            where: {
                id,
                deletedAt: null,
            },
            data: {
                deletedAt: new Date()
            }
        })
    }

    async findComplex(borrowId: number, bookId: number) {
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
        return await this.prisma.borrowItem.aggregate ({
            _count: { id: true },          
            _min: { createdAt: true },     
            _max: { createdAt: true }    
        })
    }

    async getByBorrowItemStats() {
        return await this.prisma.borrowItem.groupBy ({
            by: ['borrowId'],
            _count: { id: true },
        })
    }
}
