import type {  Prisma, PrismaClient, User } from "../generated";

export interface IUserRepository {
    list(
        skip: number,
        take: number,
        where: Prisma.UserWhereInput,
        orderBy: Prisma.UserOrderByWithRelationInput
    ): Promise<User[]>;
    countAll(where: Prisma.UserWhereInput): Promise<number>;
    findById(id: number): Promise<User | null>;
    create(data: Prisma.UserCreateInput): Promise<User>;
    update(id: number, data: Prisma.UserUpdateInput): Promise<User>;
    softDelete(id: number): Promise<User>
    getStats(): Promise<Prisma.GetUserAggregateType<{
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
    getByUserStats(): Promise<(Prisma.PickEnumerable<Prisma.UserGroupByOutputType, "role"[]> & {
        _count: {
            id: number;
        };
    })[]>
}

export class UserRepository implements IUserRepository {
    constructor(private prisma: PrismaClient) { }

    async list(
        skip: number,
        take: number,
        where: Prisma.UserWhereInput,
        orderBy: Prisma.UserOrderByWithRelationInput
    ): Promise<User[]> {
        return await this.prisma.user.findMany({
            skip,
            take,
            where,
            orderBy,
            include: { 
                book: true,
                borrow: true
             }
        })
    }

    async countAll(where: Prisma.UserWhereInput): Promise<number> {
        return await this.prisma.user.count({ where })
    }

    async findById(id: number): Promise<User | null> {
        return await this.prisma.user.findUnique({
            where: {
                id,
                deletedAt: null,
            },
            include: {
                book: true,
                borrow: true
            }
        })
    }

    async create(data: Prisma.UserCreateInput): Promise<User> {
        return await this.prisma.user.create({ data })
    }

    async update(id: number, data: Prisma.UserUpdateInput): Promise<User> {
        return await this.prisma.user.update({
            where: {
                id,
                deletedAt: null,
            },
            data
        })
    }

    async softDelete(id: number): Promise<User> {
        return await this.prisma.user.update({
            where: {
                id,
                deletedAt: null,
            },
            data: {
                deletedAt: new Date()
            }
        })
    }

    async findComplex(username: string) {
  return this.prisma.user.findMany({
    where: {
      OR: [
        { username: username },
      ],
    },
  });
}

    async getStats() {
        return await this.prisma.user.aggregate ({
            _count: { id: true },          
            _min: { createdAt: true },     
            _max: { createdAt: true }    
        })
    }

    async getByUserStats() {
        return await this.prisma.user.groupBy ({
            by: ['role'],
            _count: { id: true },
        })
    }
}
