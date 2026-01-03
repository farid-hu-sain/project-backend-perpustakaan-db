import type { Prisma, PrismaClient, BorrowItem } from "../../dist/generated";
export interface IBorrowItemRepository {
    list(skip: number, take: number, where: Prisma.BorrowItemWhereInput, orderBy: Prisma.BorrowItemOrderByWithRelationInput): Promise<BorrowItem[]>;
    countAll(where: Prisma.BorrowItemWhereInput): Promise<number>;
    findById(id: number): Promise<BorrowItem | null>;
    create(data: Prisma.BorrowItemCreateInput): Promise<BorrowItem>;
    update(id: number, data: Prisma.BorrowItemUpdateInput): Promise<BorrowItem>;
    softDelete(id: number): Promise<BorrowItem>;
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
    }>>;
    getByBorrowItemStats(): Promise<(Prisma.PickEnumerable<Prisma.BorrowItemGroupByOutputType, "borrowId"[]> & {
        _count: {
            id: number;
        };
    })[]>;
}
export declare class BorrowItemRepository implements IBorrowItemRepository {
    private prisma;
    constructor(prisma: PrismaClient);
    list(skip: number, take: number, where: Prisma.BorrowItemWhereInput, orderBy: Prisma.BorrowItemOrderByWithRelationInput): Promise<BorrowItem[]>;
    countAll(where: Prisma.BorrowItemWhereInput): Promise<number>;
    findById(id: number): Promise<BorrowItem | null>;
    create(data: Prisma.BorrowItemCreateInput): Promise<BorrowItem>;
    update(id: number, data: Prisma.BorrowItemUpdateInput): Promise<BorrowItem>;
    softDelete(id: number): Promise<BorrowItem>;
    findComplex(borrowId: number, bookId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        quantity: number;
        returned: number;
        borrowId: number;
        bookId: number;
    }[]>;
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
    }>>;
    getByBorrowItemStats(): Promise<(Prisma.PickEnumerable<Prisma.BorrowItemGroupByOutputType, "borrowId"[]> & {
        _count: {
            id: number;
        };
    })[]>;
}
//# sourceMappingURL=borrowItem.repository.d.ts.map