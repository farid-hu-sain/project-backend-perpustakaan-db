import type { Prisma, Borrow } from "../generated";
import type { IBorrowRepository } from "../repository/borrow.repository.js";
interface FindAllParams {
    page: number;
    limit: number;
    search?: {
        userId?: number;
    };
    sortBy?: string;
    sortOrder?: "asc" | "desc";
}
export interface BorrowListRespone {
    borrow: Borrow[];
    total: number;
    totalPages: number;
    currentPage: number;
}
export interface IBorrowService {
    getAll(params: FindAllParams): Promise<BorrowListRespone>;
    getBorrowById(id: string): Promise<Borrow | null>;
    createBorrow(data: {
        userId: number;
    }): Promise<Borrow>;
    updateBorrow(id: string, data: Partial<Borrow>): Promise<Borrow>;
    deleteBorrow(id: string): Promise<Borrow>;
    exec(): Promise<{
        overview: any;
        byBorrow: any;
    }>;
}
export declare class BorrowService implements IBorrowService {
    private borrowRepo;
    constructor(borrowRepo: IBorrowRepository);
    getAll(params: FindAllParams): Promise<BorrowListRespone>;
    getBorrowById(id: string): Promise<Borrow | null>;
    createBorrow(data: {
        userId: number;
    }): Promise<Borrow>;
    updateBorrow(id: string, data: Partial<Borrow>): Promise<Borrow>;
    deleteBorrow(id: string): Promise<{
        id: number;
        userId: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        tanggal_Pinjam: Date;
        tanggal_Pengembalian: Date | null;
    }>;
    exec(): Promise<{
        overview: Prisma.GetBorrowAggregateType<{
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
        byBorrow: (Prisma.PickEnumerable<Prisma.BorrowGroupByOutputType, "userId"[]> & {
            _count: {
                id: number;
            };
        })[];
    }>;
}
export {};
//# sourceMappingURL=borrow.service.d.ts.map
