import axios from '../Axios/userAxios'

export const userLoginAPI = (data) => {
    return axios.post('/login',data)
}

export const userEditAPI = (data) =>{
    return axios.post('/user_edit',data)
}

export const getUserDetailsAPI = () => {
    return axios.get('/user_details')
}

export const membershipPaymentAPI = (data) => {
    return axios.post('/member_shippayment',data) 
}

export const verifyPaymentAPI = (payment,details) => {
    return axios.post('/verify_payment',{payment,details})
}

export const verifyBidPaymentAPI = (payment,details,title) => {
    return axios.post('/verify_bid_payment',{payment,details,title})
}

export const getAuctionBookListAPI = () => {
    return axios.get('/listed_books')
}

export const getAuctionBookAPI = (bookId) => {
    return axios.post('/listed_books',bookId)
}

export const postBidPriceAPI = (data) =>{
    return axios.post('/bid_price',data)
}

export const getBookDetails = (data)=> {
    return axios.post(`/book_details`,data)
}

export const rentBook = (data,link)=> {
    return axios.post('/rent_book',data,link)
}

export const reserveBook = (data)=>{
    return axios.post('/reserve_book',data)
}

export const addFavouriteBook = (data)=> {
    return axios.post('/add_favourite',data)
}

export const getFavourite = ()=> {
    return axios.get('/favourite')
}

export const getReserved = ()=> {
    return axios.get('/reserved')
}

export const addReview = (data)=> {
    return axios.post('/add_review',data)
}

export const getBookReviewAPI = (data)=> {
    return axios.post('/book_review',data)
}


export const getAuthors = () => {
    return axios.get('/author')
}

export const getBook = () => {
    return axios.get('/book')
}

export const getSoldBook = () => {
    return axios.get('/sold')
}

export const bidPaymentAPI = (data) => {
    return axios.post('/bid_payment',data) 
}

export const userSignupAPI = (data) => {
    return axios.post('/signup',data) 
}