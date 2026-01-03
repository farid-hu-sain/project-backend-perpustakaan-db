import type { Prisma, BorrowItem } from "../../dist/generated";
import type { IBorrowItemRepository } from "../repository/borrowItem.repository";
interface FindAllParams {
    page: number;
    limit: number;
    search?: {
        borrowId?: number;
        bookId?: number;
    };
    sortBy?: string;
    sortOrder?: "asc" | "desc";
}
export interface BorrowItemListRespone {
    borrowItem: BorrowItem[];
    total: number;
    totalPages: number;
    currentPage: number;
}
export interface IBorrowItemService {
    getAll(params: FindAllParams): Promise<BorrowItemListRespone>;
    getBorrowItemById(id: string): Promise<BorrowItem | null>;
    createBorrowItem(data: {
        quantity: number;
        returned: number;
        borrowId: number;
        bookId: number;
    }): Promise<BorrowItem>;
    updateBorrowItem(id: string, data: Partial<BorrowItem>): Promise<BorrowItem>;
    deleteBorrowItem(id: string): Promise<BorrowItem>;
    exec(): Promise<{
        overview: any;
        byBorrowItem: any;
    }>;
}
export declare class BorrowItemService implements IBorrowItemService {
    private borrowItemRepo;
    constructor(borrowItemRepo: IBorrowItemRepository);
    getAll(params: FindAllParams): Promise<BorrowItemListRespone>;
    getBorrowItemById(id: string): Promise<BorrowItem | null>;
    createBorrowItem(data: {
        quantity: number;
        returned: number;
        borrowId: number;
        bookId: number;
    }): Promise<BorrowItem>;
    updateBorrowItem(id: string, data: Partial<BorrowItem>): Promise<BorrowItem>;
    deleteBorrowItem(id: string): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        quantity: number;
        returned: number;
        borrowId: number;
        bookId: number;
    }>;
    exec(): Promise<{
        overview: Prisma.GetBorrowItemAggregateType<{
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
        byBorrowItem: (Prisma.PickEnumerable<Prisma.BorrowItemGroupByOutputType, "borrowId"[]> & {
            _count: {
                id: number;
            };
        })[];
    }>;
}
export {};
//# sourceMappingURL=borrowItem.service.d.ts.map