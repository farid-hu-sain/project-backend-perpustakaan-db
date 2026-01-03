import type { Prisma, Borrow} from "../../dist/generated"
import type { IBorrowRepository } from "../repository/borrow.repository"

interface FindAllParams {
  page: number
  limit: number
  search?: {
    userId?: number,
  }
  sortBy?: string
  sortOrder?: "asc" | "desc"
}

export interface BorrowListRespone{
    borrow:Borrow[], 
    total: number, 
    totalPages: number, 
    currentPage: number 
}
export interface IBorrowService {
  getAll(params: FindAllParams) : Promise <BorrowListRespone>
  getBorrowById (id: string): Promise<Borrow | null>;
  createBorrow(data: {userId: number }): Promise<Borrow> 
  updateBorrow(id: string, data: Partial<Borrow>) : Promise <Borrow>
  deleteBorrow(id: string) : Promise<Borrow>
  exec(): Promise<{ overview: any, byBorrow: any}>
}

export class BorrowService implements IBorrowService { 
    constructor (private borrowRepo: IBorrowRepository) {}

       async getAll (params: FindAllParams) : Promise<BorrowListRespone>  {
    const { page, limit, search, sortBy, sortOrder} = params

    const skip = (page - 1 ) * limit
    
    const whereClause : Prisma.BorrowWhereInput = {
      deletedAt : null
    }

    if (search?.userId){whereClause.userId =  search.userId}

    const sortCriteria :  Prisma.BorrowOrderByWithRelationInput = sortBy ? { [sortBy] : sortOrder || "desc" } : {createdAt: "desc"}

    const borrow = await this.borrowRepo.list(skip, limit, whereClause, sortCriteria)
    
    const total = await this.borrowRepo.countAll(whereClause)


    return { 
      borrow,
      total, 
      totalPages: Math.ceil( total/limit), 
      currentPage: page }
}


  async getBorrowById (id: string): Promise<Borrow | null>{  
const numId = parseInt (id)


const borrow = await this.borrowRepo.findById(numId)
    if (!borrow) {
     throw new Error ('Borrow tidak ditemukan')
    }

return borrow
}


    async createBorrow (data: {userId: number}) : Promise<Borrow>  {
      return await this.borrowRepo.create({
        user: {
          connect: {id: data.userId}
        }
      })
}


    async updateBorrow  (id: string, data : Partial<Borrow>) : Promise<Borrow>  {
  await this.getBorrowById(id)

  const numId = parseInt(id)

  return await this.borrowRepo.update(numId, data)
}

    async deleteBorrow  (id: string)  {
const numId = parseInt (id)

    return await this.borrowRepo.softDelete(numId)
}

  async exec() {
    const stats = await this.borrowRepo.getStats()
    const BorrowStats = await this.borrowRepo.getByBorrowStats()

    return {
      overview: stats,
      byBorrow: BorrowStats
    }
  }
}
