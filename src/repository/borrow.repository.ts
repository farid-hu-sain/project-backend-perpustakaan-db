import type {  Prisma, PrismaClient, Borrow } from "../../dist/generated";

export interface IBorrowRepository {
    list(
        skip: number,
        take: number,
        where: Prisma.BorrowWhereInput,
        orderBy: Prisma.BorrowOrderByWithRelationInput
    ): Promise<Borrow[]>;
    countAll(where: Prisma.BorrowWhereInput): Promise<number>;
    findById(id: number): Promise<Borrow | null>;
    create(data: Prisma.BorrowCreateInput): Promise<Borrow>;
    update(id: number, data: Prisma.BorrowUpdateInput): Promise<Borrow>;
    softDelete(id: number): Promise<Borrow>
    getStats(): Promise<Prisma.GetBorrowAggregateType<{
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
    getByBorrowStats(): Promise<(Prisma.PickEnumerable<Prisma.BorrowGroupByOutputType, "userId"[]> & {
        _count: {
            id: number;
        };
    })[]>
}

export class BorrowRepository implements IBorrowRepository {
    constructor(private prisma: PrismaClient) { }

    async list(
        skip: number,
        take: number,
        where: Prisma.BorrowWhereInput,
        orderBy: Prisma.BorrowOrderByWithRelationInput
    ): Promise<Borrow[]> {
        return await this.prisma.borrow.findMany({
            skip,
            take,
            where,
            orderBy,
            include: { 
                user: true
             }
        })
    }

    async countAll(where: Prisma.BorrowWhereInput): Promise<number> {
        return await this.prisma.borrow.count({ where })
    }

    async findById(id: number): Promise<Borrow | null> {
        return await this.prisma.borrow.findUnique({
            where: {
                id,
                deletedAt: null,
            },
            include: {
                user: true
            }
        })
    }

    async create(data: Prisma.BorrowCreateInput): Promise<Borrow> {
        return await this.prisma.borrow.create({ data })
    }

    async update(id: number, data: Prisma.BorrowUpdateInput): Promise<Borrow> {
        return await this.prisma.borrow.update({
            where: {
                id,
                deletedAt: null,
            },
            data
        })
    }

    async softDelete(id: number): Promise<Borrow> {
        return await this.prisma.borrow.update({
            where: {
                id,
                deletedAt: null,
            },
            data: {
                deletedAt: new Date()
            }
        })
    }

    async findComplex(userId: number) {
  return this.prisma.borrow.findMany({
    where: {
      OR: [
        { userId: userId },
      ],
    },
  });
}

    async getStats() {
        return await this.prisma.borrow.aggregate ({
            _count: { id: true },          
            _min: { createdAt: true },     
            _max: { createdAt: true }    
        })
    }

    async getByBorrowStats() {
        return await this.prisma.borrow.groupBy ({
            by: ['userId'],
            _count: { id: true },
        })
    }
}
