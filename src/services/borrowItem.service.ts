import type { Prisma, BorrowItem} from "../../dist/generated"
import type { IBorrowItemRepository } from "../repository/borrowItem.repository"

interface FindAllParams {
  page: number
  limit: number
  search?: {
    borrowId?: number,
    bookId?: number
  }
  sortBy?: string
  sortOrder?: "asc" | "desc"
}

export interface BorrowItemListRespone{
    borrowItem:BorrowItem[], 
    total: number, 
    totalPages: number, 
    currentPage: number 
}
export interface IBorrowItemService {
  getAll(params: FindAllParams) : Promise <BorrowItemListRespone>
  getBorrowItemById (id: string): Promise<BorrowItem | null>;
  createBorrowItem(data: {quantity: number, returned: number, borrowId: number, bookId: number}): Promise<BorrowItem> 
  updateBorrowItem(id: string, data: Partial<BorrowItem>) : Promise <BorrowItem>
  deleteBorrowItem(id: string) : Promise<BorrowItem>
  exec(): Promise<{ overview: any, byBorrowItem: any}>
}

export class BorrowItemService implements IBorrowItemService { 
    constructor (private borrowItemRepo: IBorrowItemRepository) {}

       async getAll (params: FindAllParams) : Promise<BorrowItemListRespone>  {
    const { page, limit, search, sortBy, sortOrder} = params

    const skip = (page - 1 ) * limit
    
    const whereClause : Prisma.BorrowItemWhereInput = {
      deletedAt : null
    }

    if (search?.borrowId){whereClause.borrowId =  search.borrowId}
    if (search?.bookId){whereClause.bookId =  search.bookId}

    const sortCriteria :  Prisma.BorrowItemOrderByWithRelationInput = sortBy ? { [sortBy] : sortOrder || "desc" } : {createdAt: "desc"}

    const borrowItem = await this.borrowItemRepo.list(skip, limit, whereClause, sortCriteria)
    
    const total = await this.borrowItemRepo.countAll(whereClause)


    return { 
      borrowItem,
      total, 
      totalPages: Math.ceil( total/limit), 
      currentPage: page }
}


  async getBorrowItemById (id: string): Promise<BorrowItem | null>{  
const numId = parseInt (id)


const borrowItem = await this.borrowItemRepo.findById(numId)
    if (!borrowItem) {
     throw new Error ('BorrowItem tidak ditemukan')
    }

return borrowItem
}


    async createBorrowItem (data: {quantity: number, returned: number, borrowId: number, bookId: number}) : Promise<BorrowItem>  {
      return await this.borrowItemRepo.create(data)
}


    async updateBorrowItem  (id: string, data : Partial<BorrowItem>) : Promise<BorrowItem>  {
  await this.getBorrowItemById(id)

  const numId = parseInt(id)

  return await this.borrowItemRepo.update(numId, data)
}

    async deleteBorrowItem  (id: string)  {
const numId = parseInt (id)

    return await this.borrowItemRepo.softDelete(numId)
}

  async exec() {
    const stats = await this.borrowItemRepo.getStats()
    const BorrowItemStats = await this.borrowItemRepo.getByBorrowItemStats()

    return {
      overview: stats,
      byBorrowItem: BorrowItemStats
    }
  }
}