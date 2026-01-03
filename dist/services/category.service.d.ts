import type { Prisma, Category } from "../generated";
import type { ICategoryRepository } from "../repository/category.repository";
interface FindAllParams {
    page: number;
    limit: number;
    search?: {
        nama?: string;
    };
    sortBy?: string;
    sortOrder?: "asc" | "desc";
}
export interface CategoryListRespone {
    category: Category[];
    total: number;
    totalPages: number;
    currentPage: number;
}
export interface ICategoryService {
    getAll(params: FindAllParams): Promise<CategoryListRespone>;
    getCategoryById(id: string): Promise<Category | null>;
    createCategory(data: {
        nama: string;
    }): Promise<Category>;
    updateCategory(id: string, data: Partial<Category>): Promise<Category>;
    deleteCategory(id: string): Promise<Category>;
    exec(): Promise<{
        overview: any;
        byCategory: any;
    }>;
}
export declare class CategoryService implements ICategoryService {
    private categoryRepo;
    constructor(categoryRepo: ICategoryRepository);
    getAll(params: FindAllParams): Promise<CategoryListRespone>;
    getCategoryById(id: string): Promise<Category | null>;
    createCategory(data: {
        nama: string;
        deskripsi: string;
    }): Promise<Category>;
    updateCategory(id: string, data: Partial<Category>): Promise<Category>;
    deleteCategory(id: string): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        nama: string;
        deskripsi: string;
    }>;
    exec(): Promise<{
        overview: Prisma.GetCategoryAggregateType<{
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
        byCategory: (Prisma.PickEnumerable<Prisma.CategoryGroupByOutputType, "nama"[]> & {
            _count: {
                id: number;
            };
        })[];
    }>;
}
export {};
//# sourceMappingURL=category.service.d.ts.map