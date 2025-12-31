export interface Category {
    id: number
    nama: string
    deskripsi: string
}

export let categories: Category[] = [
    { id: 1, nama: "Politik", deskripsi: "Buku tentang politik dan pemerintahan" },
    { id: 2, nama: "Fiksi", deskripsi: "Novel dan cerita fiksi" },
    { id: 3, nama: "Bisnis", deskripsi: "Buku tentang bisnis dan ekonomi" },
    { id: 4, nama: "Pertanian", deskripsi: "Buku tentang pertanian dan perkebunan" }
]