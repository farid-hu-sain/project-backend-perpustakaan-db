export class UserService {
    userRepo;
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async getAll(params) {
        const { page, limit, search, sortBy, sortOrder } = params;
        const skip = (page - 1) * limit;
        const whereClause = {
            deletedAt: null
        };
        if (search?.role) {
            whereClause.role = { contains: search.role, mode: "insensitive" };
        }
        const sortCriteria = sortBy ? { [sortBy]: sortOrder || "desc" } : { createdAt: "desc" };
        const user = await this.userRepo.list(skip, limit, whereClause, sortCriteria);
        const total = await this.userRepo.countAll(whereClause);
        return {
            user,
            total,
            totalPages: Math.ceil(total / limit),
            currentPage: page
        };
    }
    async getUserById(id) {
        const numId = parseInt(id);
        const user = await this.userRepo.findById(numId);
        if (!user) {
            throw new Error('User tidak ditemukan');
        }
        return user;
    }
    async createUser(data) {
        return await this.userRepo.create(data);
    }
    async updateUser(id, data) {
        await this.getUserById(id);
        const numId = parseInt(id);
        return await this.userRepo.update(numId, data);
    }
    async deleteUser(id) {
        const numId = parseInt(id);
        return await this.userRepo.softDelete(numId);
    }
    async exec() {
        const stats = await this.userRepo.getStats();
        const UserStats = await this.userRepo.getByUserStats();
        return {
            overview: stats,
            byUser: UserStats
        };
    }
}
//# sourceMappingURL=user.service.js.map