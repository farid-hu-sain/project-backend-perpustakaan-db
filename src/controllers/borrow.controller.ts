import type { Request, Response } from "express"
import { successResponse } from "../utils/response"
import type { IBorrowService } from "../services/borrow.service"


export interface IBorrowController {
  getAllBorrowHandler(req: Request, res: Response) : Promise<void>
  getBorrowByIdHandler(req: Request, res: Response) : Promise<void>
  createBorrowHandler(req: Request, res: Response) : Promise<void>
  updateBorrowHandler(req: Request, res: Response) : Promise<void>
  deleteBorrowHandler (req: Request, res: Response) : Promise<void>

}

export class BorrowController implements IBorrowController {
  constructor (private borrowService : IBorrowService) {
    this.getAllBorrowHandler = this.getAllBorrowHandler.bind(this)
    this.getBorrowByIdHandler = this.getBorrowByIdHandler.bind(this)
    this.createBorrowHandler = this.createBorrowHandler.bind(this)
    this.updateBorrowHandler = this.updateBorrowHandler.bind(this)
    this.deleteBorrowHandler = this.deleteBorrowHandler.bind(this)
    this.getstats = this.getstats.bind(this)
  }


async getAllBorrowHandler  (req: Request, res: Response)  {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const search = req.query.search as any
    const sortBy = req.query.sortBy as string
    const sortOrder = (req.query.sortOrder as 'asc' | 'desc' ) || 'desc'

    const result = await this.borrowService.getAll({
      page,
      limit,
      search,
      sortBy,
      sortOrder
    })

    const pagination = {
      page: result.currentPage,
      limit,
      total: result.total,
      totalPages: result.totalPages
    }

    successResponse(
        res,
        'borrow berhasil ditambahkan',
        result.borrow,
        pagination
    )
    
}
async  getBorrowByIdHandler (req: Request, res: Response)  {
    if (!req.params.id) {
       throw new Error('tidak ada param')
    }

    const borrow = await this.borrowService.getBorrowById(req.params.id)
    

    successResponse(
      res,
      "borrow sudah diambil",
      borrow
   )
}

async createBorrowHandler (req: Request, res: Response )  {

    const { userId} = req.body
    const data = {
      userId: Number(userId) 
    }

    const borrows = await this.borrowService.createBorrow(data)

  successResponse(
    res,
    "borrow berhasil ditambakan",
    borrows,
    null,
    201
  )

}

async updateBorrowHandler (req: Request, res: Response)  {
  const borrow = await this.borrowService.updateBorrow(req.params.id!, req.body)

  successResponse(
    res,
    "borrow berhasil di update",
    borrow
  );
}

async deleteBorrowHandler  (req: Request, res: Response) {
  const deleted = await this.borrowService.deleteBorrow(req.params.id!)

  res.json({
    success: true,
    message: "borrow berhasil dihapus",
    data: deleted
  });
}

  async getstats(_req: Request, res: Response ){
  const stats =  await this.borrowService.exec()

    successResponse(
      res,
      "Statistik borrow berhasil diambil",
      stats,
      null,
      200
    )
}
}