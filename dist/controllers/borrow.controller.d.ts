import type { Request, Response } from "express";
import type { IBorrowService } from "../services/borrow.service";
export interface IBorrowController {
    getAllBorrowHandler(req: Request, res: Response): Promise<void>;
    getBorrowByIdHandler(req: Request, res: Response): Promise<void>;
    createBorrowHandler(req: Request, res: Response): Promise<void>;
    updateBorrowHandler(req: Request, res: Response): Promise<void>;
    deleteBorrowHandler(req: Request, res: Response): Promise<void>;
}
export declare class BorrowController implements IBorrowController {
    private borrowService;
    constructor(borrowService: IBorrowService);
    getAllBorrowHandler(req: Request, res: Response): Promise<void>;
    getBorrowByIdHandler(req: Request, res: Response): Promise<void>;
    createBorrowHandler(req: Request, res: Response): Promise<void>;
    updateBorrowHandler(req: Request, res: Response): Promise<void>;
    deleteBorrowHandler(req: Request, res: Response): Promise<void>;
    getstats(_req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=borrow.controller.d.ts.map