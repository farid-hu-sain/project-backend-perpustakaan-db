export interface books {
    id: number
    judul: string
    penulis: string
    penerbit: string
    status?: boolean
}

export let books: books[] = [
    { id: 1, judul: "19 dosa besar Jokowi", penulis: "Ucup Gerung", penerbit: "Mulyono club", status: true  },
    { id: 2, judul: "takda biji, presiden pun jadi", penulis: "Ucup Gerung", penerbit: "Mulyono club", status: false  },
    { id: 3, judul: "Kingdom of Nepotism and oligarchy", penulis: "lil RKBMG", penerbit: "Green Star", status: true  },
    { id: 4, judul: "Cara membuat perkebunan kelapa sawit", penulis: "Zul Ulil Tol", penerbit: "Gus cihuy", status: true  },
]