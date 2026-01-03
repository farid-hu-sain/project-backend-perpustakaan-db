import type { Prisma, PrismaClient, Borrow } from "../../dist/generated";
export interface IBorrowRepository {
    list(skip: number, take: number, where: Prisma.BorrowWhereInput, orderBy: Prisma.BorrowOrderByWithRelationInput): Promise<Borrow[]>;
    countAll(where: Prisma.BorrowWhereInput): Promise<number>;
    findById(id: number): Promise<Borrow | null>;
    create(data: Prisma.BorrowCreateInput): Promise<Borrow>;
    update(id: number, data: Prisma.BorrowUpdateInput): Promise<Borrow>;
    softDelete(id: number): Promise<Borrow>;
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
    }>>;
    getByBorrowStats(): Promise<(Prisma.PickEnumerable<Prisma.BorrowGroupByOutputType, "userId"[]> & {
        _count: {
            id: number;
        };
    })[]>;
}
export declare class BorrowRepository implements IBorrowRepository {
    private prisma;
    constructor(prisma: PrismaClient);
    list(skip: number, take: number, where: Prisma.BorrowWhereInput, orderBy: Prisma.BorrowOrderByWithRelationInput): Promise<Borrow[]>;
    countAll(where: Prisma.BorrowWhereInput): Promise<number>;
    findById(id: number): Promise<Borrow | null>;
    create(data: Prisma.BorrowCreateInput): Promise<Borrow>;
    update(id: number, data: Prisma.BorrowUpdateInput): Promise<Borrow>;
    softDelete(id: number): Promise<Borrow>;
    findComplex(userId: number): Promise<{
        id: number;
        userId: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        tanggal_Pinjam: Date;
        tanggal_Pengembalian: Date | null;
    }[]>;
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
    }>>;
    getByBorrowStats(): Promise<(Prisma.PickEnumerable<Prisma.BorrowGroupByOutputType, "userId"[]> & {
        _count: {
            id: number;
        };
    })[]>;
}
//# sourceMappingURL=borrow.repository.d.ts.map