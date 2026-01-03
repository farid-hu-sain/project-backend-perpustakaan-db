import type {  Prisma, PrismaClient, Category } from "../../dist/generated";

export interface ICategoryRepository {
    list(
        skip: number,
        take: number,
        where: Prisma.CategoryWhereInput,
        orderBy: Prisma.CategoryOrderByWithRelationInput
    ): Promise<Category[]>;
    countAll(where: Prisma.CategoryWhereInput): Promise<number>;
    findById(id: number): Promise<Category | null>;
    create(data: Prisma.CategoryCreateInput): Promise<Category>;
    update(id: number, data: Prisma.CategoryUpdateInput): Promise<Category>;
    softDelete(id: number): Promise<Category>
    getStats(): Promise<Prisma.GetCategoryAggregateType<{
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
    getByCategoryStats(): Promise<(Prisma.PickEnumerable<Prisma.CategoryGroupByOutputType, "nama"[]> & {
        _count: {
            id: number;
        };
    })[]>
}

export class CategoryRepository implements ICategoryRepository {
    constructor(private prisma: PrismaClient) { }

    async list(
        skip: number,
        take: number,
        where: Prisma.CategoryWhereInput,
        orderBy: Prisma.CategoryOrderByWithRelationInput
    ): Promise<Category[]> {
        return await this.prisma.category.findMany({
            skip,
            take,
            where,
            orderBy,
            include: { 
                book: true
             }
        })
    }

    async countAll(where: Prisma.CategoryWhereInput): Promise<number> {
        return await this.prisma.category.count({ where })
    }

    async findById(id: number): Promise<Category | null> {
        return await this.prisma.category.findUnique({
            where: {
                id,
                deletedAt: null,
            },
            include: {
                book: true
            }
        })
    }

    async create(data: Prisma.CategoryCreateInput): Promise<Category> {
        return await this.prisma.category.create({ data })
    }

    async update(id: number, data: Prisma.CategoryUpdateInput): Promise<Category> {
        return await this.prisma.category.update({
            where: {
                id,
                deletedAt: null,
            },
            data
        })
    }

    async softDelete(id: number): Promise<Category> {
        return await this.prisma.category.update({
            where: {
                id,
                deletedAt: null,
            },
            data: {
                deletedAt: new Date()
            }
        })
    }

    async findComplex(nama: string) {
  return this.prisma.category.findMany({
    where: {
      OR: [
        { nama: nama },
      ],
    },
  });
}

    async getStats() {
        return await this.prisma.category.aggregate ({
            _count: { id: true },          
            _min: { createdAt: true },     
            _max: { createdAt: true }    
        })
    }

    async getByCategoryStats() {
        return await this.prisma.category.groupBy ({
            by: ['nama'],
            _count: { id: true },
        })
    }
}
