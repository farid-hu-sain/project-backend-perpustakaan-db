import type { Prisma, Book} from "../generated"
import type { IBookRepository } from "../repository/book.repository"

interface FindAllParams {
  page: number
  limit: number
  search?: {
    judul?: string,
    penulis?:string,
    penerbit?:string
  }
  sortBy?: string
  sortOrder?: "asc" | "desc"
}

export interface BookListRespone{
    book:Book[], 
    total: number, 
    totalPages: number, 
    currentPage: number 
}
export interface IBookService {
  getAll(params: FindAllParams) : Promise <BookListRespone>
  getBookById (id: string): Promise<Book | null>;
  createBook(data: {judul: string, penulis: string, penerbit: string, status: boolean} ): Promise<Book> 
  updateBook(id: string, data: Partial<Book>) : Promise <Book>
  deleteBook(id: string) : Promise<Book>
  exec(): Promise<{ overview: any, byBook: any}>
}

export class BookService implements IBookService { 
    constructor (private bookRepo: IBookRepository) {}

       async getAll (params: FindAllParams) : Promise<BookListRespone>  {
    const { page, limit, search, sortBy, sortOrder} = params

    const skip = (page - 1 ) * limit
    
    const whereClause : Prisma.BookWhereInput = {
      deletedAt : null
    }

    if (search?.judul){whereClause.judul = { contains: search.judul, mode: "insensitive"}}
    if (search?.penulis){whereClause.penulis = { contains: search.penulis, mode: "insensitive"}}
    if (search?.penerbit){whereClause.penerbit = { contains: search.penerbit, mode: "insensitive"}}

    const sortCriteria :  Prisma.BookOrderByWithRelationInput = sortBy ? { [sortBy] : sortOrder || "desc" } : {createdAt: "desc"}

    const book = await this.bookRepo.list(skip, limit, whereClause, sortCriteria)
    
    const total = await this.bookRepo.countAll(whereClause)


    return { 
      book,
      total, 
      totalPages: Math.ceil( total/limit), 
      currentPage: page }
}


  async getBookById (id: string): Promise<Book | null>{  
const numId = parseInt (id)


const book = await this.bookRepo.findById(numId)
    if (!book) {
     throw new Error ('Book tidak ditemukan')
    }

return book
}


    async createBook (data: {judul: string, penulis: string, penerbit: string, status: boolean}) : Promise<Book>  {
      return await this.bookRepo.create(data)
}


    async updateBook  (id: string, data : Partial<Book>) : Promise<Book>  {
  await this.getBookById(id)

  const numId = parseInt(id)

  return await this.bookRepo.update(numId, data)
}

    async deleteBook  (id: string)  {
const numId = parseInt (id)

    return await this.bookRepo.softDelete(numId)
}

  async exec() {
    const stats = await this.bookRepo.getStats()
    const BookStats = await this.bookRepo.getByBookStats()

    return {
      overview: stats,
      byBook: BookStats
    }
  }
}
