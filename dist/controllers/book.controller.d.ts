import type { Request, Response } from "express";
import type { IBookService } from "../services/book.service";
export interface IBookController {
    getAllBookHandler(req: Request, res: Response): Promise<void>;
    getBookByIdHandler(req: Request, res: Response): Promise<void>;
    createBookHandler(req: Request, res: Response): Promise<void>;
    updateBookHandler(req: Request, res: Response): Promise<void>;
    deleteBookHandler(req: Request, res: Response): Promise<void>;
}
export declare class BookController implements IBookController {
    private bookService;
    constructor(bookService: IBookService);
    getAllBookHandler(req: Request, res: Response): Promise<void>;
    getBookByIdHandler(req: Request, res: Response): Promise<void>;
    createBookHandler(req: Request, res: Response): Promise<void>;
    updateBookHandler(req: Request, res: Response): Promise<void>;
    deleteBookHandler(req: Request, res: Response): Promise<void>;
    getstats(_req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=book.controller.d.ts.map