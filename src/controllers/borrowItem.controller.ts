import type { Request, Response } from "express"
import { successResponse } from "../utils/response"
import type { IBorrowItemService } from "../services/borrowItem.service"


export interface IBorrowItemController {
  getAllBorrowItemHandler(req: Request, res: Response) : Promise<void>
  getBorrowItemByIdHandler(req: Request, res: Response) : Promise<void>
  createBorrowItemHandler(req: Request, res: Response) : Promise<void>
  updateBorrowItemHandler(req: Request, res: Response) : Promise<void>
  deleteBorrowItemHandler (req: Request, res: Response) : Promise<void>

}

export class BorrowItemController implements IBorrowItemController {
  constructor (private borrowItemService : IBorrowItemService) {
    this.getAllBorrowItemHandler = this.getAllBorrowItemHandler.bind(this)
    this.getBorrowItemByIdHandler = this.getBorrowItemByIdHandler.bind(this)
    this.createBorrowItemHandler = this.createBorrowItemHandler.bind(this)
    this.updateBorrowItemHandler = this.updateBorrowItemHandler.bind(this)
    this.deleteBorrowItemHandler = this.deleteBorrowItemHandler.bind(this)
    this.getstats = this.getstats.bind(this)
  }


async getAllBorrowItemHandler  (req: Request, res: Response)  {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const search = req.query.search as any
    const sortBy = req.query.sortBy as string
    const sortOrder = (req.query.sortOrder as 'asc' | 'desc' ) || 'desc'

    const result = await this.borrowItemService.getAll({
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
        'borrowItem berhasil ditambahkan',
        result.borrowItem,
        pagination
    )
    
}
async  getBorrowItemByIdHandler (req: Request, res: Response)  {
    if (!req.params.id) {
       throw new Error('tidak ada param')
    }

    const borrowItem = await this.borrowItemService.getBorrowItemById(req.params.id)
    

    successResponse(
      res,
      "borrowItem sudah diambil",
      borrowItem
   )
}

async createBorrowItemHandler (req: Request, res: Response )  {

    const { quantity, returned, borrowId, bookId} = req.body
    const data = {
      quantity: Number(quantity),
      returned: Number(returned),
      borrowId: Number(borrowId),
      bookId: Number(bookId)
    }

    const borrowItems = await this.borrowItemService.createBorrowItem(data)

  successResponse(
    res,
    "borrowItem berhasil ditambakan",
    borrowItems,
    null,
    201
  )

}

async updateBorrowItemHandler (req: Request, res: Response)  {
  const borrowItem = await this.borrowItemService.updateBorrowItem(req.params.id!, req.body)

  successResponse(
    res,
    "borrowItem berhasil di update",
    borrowItem
  );
}

async deleteBorrowItemHandler  (req: Request, res: Response) {
  const deleted = await this.borrowItemService.deleteBorrowItem(req.params.id!)

  res.json({
    success: true,
    message: "borrowItem berhasil dihapus",
    data: deleted
  });
}

  async getstats(_req: Request, res: Response ){
  const stats =  await this.borrowItemService.exec()

    successResponse(
      res,
      "Statistik borrowItem berhasil diambil",
      stats,
      null,
      200
    )
}
}

