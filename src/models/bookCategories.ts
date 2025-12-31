export interface BookCategory {
    book_id: number
    category_id: number
}

export let bookCategories: BookCategory[] = [
    { book_id: 1, category_id: 1 },
    { book_id: 2, category_id: 1 },
    { book_id: 3, category_id: 3 },
    { book_id: 3, category_id: 1 }, 
    { book_id: 4, category_id: 4 }
]