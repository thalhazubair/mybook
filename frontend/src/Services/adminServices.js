import axios from "../Axios/adminAxios";

export const adminLoginAPI = (data) => {
    return axios.post('/admin/login',data)
}

export const membersAPI = () => {
    return axios.get('/admin/members')
}

export const blockAPI = (id) => {
    return axios.patch(`/admin/block/${id}`)
} 

export const unBlockAPI = (id) => {
    return axios.patch(`/admin/unblock/${id}`)
}

export const auctionAPI = () => {
    return axios.get('/admin/auction')
}

export const genreAPI = () => {
    return axios.get("/admin/genre")
}

export const addGenreAPI = (data) => {
    return axios.post('/admin/add_genre',data)
}

export const blockGenreAPI = (id) => {
    return axios.patch(`/admin/block_genre/${id}`)
}

export const unBlockGenreAPI = (id) => {
    return axios.patch(`/admin/unblock_genre/${id}`)
}

export const genreAuctionAPI = () => {
    return axios.get('/admin/genre_auction')
}

export const addAuctionAPI = (data,headers) => {
    return axios.post('/admin/add_auction',data,headers)
}

export const getSoldBookAPI = () => {
    return axios.get('/admin/get_sold_book')
}

// export const postBooks = (book) => {
//     return axios.post('/admin/post_books',book)
// }

export const getBooks = () => {
    return axios.get('/admin/books')
}

export const myBookAPI = () => {
    return axios.get('/admin/my_book')
}

export const bookReturnAPI = (id) => {
    return axios.post('/admin/return_book',id)
}

export const addBookAPI = (data,headers) => {
    return axios.post('/admin/add_book',data,headers)
}