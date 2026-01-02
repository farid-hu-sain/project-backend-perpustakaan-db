import type { Request, Response } from "express";
import type { IBorrowItemService } from "../services/borrowItem.service.js";
export interface IBorrowItemController {
    getAllBorrowItemHandler(req: Request, res: Response): Promise<void>;
    getBorrowItemByIdHandler(req: Request, res: Response): Promise<void>;
    createBorrowItemHandler(req: Request, res: Response): Promise<void>;
    updateBorrowItemHandler(req: Request, res: Response): Promise<void>;
    deleteBorrowItemHandler(req: Request, res: Response): Promise<void>;
}
export declare class BorrowItemController implements IBorrowItemController {
    private borrowItemService;
    constructor(borrowItemService: IBorrowItemService);
    getAllBorrowItemHandler(req: Request, res: Response): Promise<void>;
    getBorrowItemByIdHandler(req: Request, res: Response): Promise<void>;
    createBorrowItemHandler(req: Request, res: Response): Promise<void>;
    updateBorrowItemHandler(req: Request, res: Response): Promise<void>;
    deleteBorrowItemHandler(req: Request, res: Response): Promise<void>;
    getstats(_req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=borrowItem.controller.d.ts.map
