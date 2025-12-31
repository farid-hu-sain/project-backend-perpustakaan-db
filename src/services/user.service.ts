import type { Prisma, User} from "../generated"
import type { IUserRepository } from "../repository/user.repository"

interface FindAllParams {
  page: number
  limit: number
  search?: {
    role?: string,
  }
  sortBy?: string
  sortOrder?: "asc" | "desc"
}

export interface UserListRespone{
    user:User[], 
    total: number, 
    totalPages: number, 
    currentPage: number 
}
export interface IUserService {
  getAll(params: FindAllParams) : Promise <UserListRespone>
  getUserById (id: string): Promise<User | null>;
  createUser(data: {username: string,email: string, password_hash: string, role: string }): Promise<User> 
  updateUser(id: string, data: Partial<User>) : Promise <User>
  deleteUser(id: string) : Promise<User>
  exec(): Promise<{ overview: any, byUser: any}>
}

export class UserService implements IUserService { 
    constructor (private userRepo: IUserRepository) {}

       async getAll (params: FindAllParams) : Promise<UserListRespone>  {
    const { page, limit, search, sortBy, sortOrder} = params

    const skip = (page - 1 ) * limit
    
    const whereClause : Prisma.UserWhereInput = {
      deletedAt : null
    }

    if (search?.role){whereClause.role = { contains: search.role, mode: "insensitive"}}

    const sortCriteria :  Prisma.UserOrderByWithRelationInput = sortBy ? { [sortBy] : sortOrder || "desc" } : {createdAt: "desc"}

    const user = await this.userRepo.list(skip, limit, whereClause, sortCriteria)
    
    const total = await this.userRepo.countAll(whereClause)


    return { 
      user,
      total, 
      totalPages: Math.ceil( total/limit), 
      currentPage: page }
}


  async getUserById (id: string): Promise<User | null>{  
const numId = parseInt (id)


const user = await this.userRepo.findById(numId)
    if (!user) {
     throw new Error ('User tidak ditemukan')
    }

return user
}


    async createUser (data: {username: string,email: string, password_hash: string, role: string }) : Promise<User>  {
      return await this.userRepo.create(data)
}


    async updateUser  (id: string, data : Partial<User>) : Promise<User>  {
  await this.getUserById(id)

  const numId = parseInt(id)

  return await this.userRepo.update(numId, data)
}

    async deleteUser  (id: string)  {
const numId = parseInt (id)

    return await this.userRepo.softDelete(numId)
}

  async exec() {
    const stats = await this.userRepo.getStats()
    const UserStats = await this.userRepo.getByUserStats()

    return {
      overview: stats,
      byUser: UserStats
    }
  }
}
