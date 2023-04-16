const express = require("express")
const router = express.Router()
const user = require('../controller/userController/userController')
const { verifyUserToken } = require("../middleware/jwtVerification")
// const admin = require('../controller/adminController/adminController')

const userAuthentication = require('../middleware/jwtVerification')


router.get("/login",user.getLogin)
router.post("/login",user.postLogin)
router.post("/signup",user.postSignup)
router.post('/verifyotp',user.verifyOtp)
router.post('/resendotp',user.resendOtp)
router.patch('/user_edit',user.editUser)
router.get('/user_details',userAuthentication.verifyUserToken,user.getUserDetails)
router.post('/member_shippayment',userAuthentication.verifyUserToken,user.postPayment)
router.post('/bid_payment',userAuthentication.verifyUserToken,user.bidPayment)
router.post('/verify_payment',userAuthentication.verifyUserToken,user.verifyPayment)
router.post('/verify_bid_payment',userAuthentication.verifyUserToken,user.verifyBidPayment)

router.get('/listed_books',userAuthentication.verifyUserToken,user.getListedBooks)
router.post('/listed_books',userAuthentication.verifyUserToken,user.postListedBooks)
router.post('/bid_price',userAuthentication.verifyUserToken,user.postBidPrice)
router.post('/book_details',userAuthentication.verifyUserToken,user.gettBookDetails)
router.post('/rent_book',userAuthentication.verifyUserToken,user.rentBook)
router.post('/reserve_book',userAuthentication.verifyUserToken,user.reserveBook)
router.post('/add_favourite',userAuthentication.verifyUserToken,user.addToFavourite)
router.get('/favourite',userAuthentication.verifyUserToken,user.getFavourite)
router.get('/reserved',userAuthentication.verifyUserToken,user.getReserved)
router.post('/add_review',userAuthentication.verifyUserToken,user.postReview)
router.post('/book_review',userAuthentication.verifyUserToken,user.getBookReview)
router.get('/author',userAuthentication.verifyUserToken,user.getAuthor)
router.get('/book',userAuthentication.verifyUserToken,user.getBook)
router.get('/books',userAuthentication.verifyUserToken,user.getAddedBook)
router.get('/sold',userAuthentication.verifyUserToken,user.getSoldBook)


module.exports = router