import React from 'react'
import SideBar from '../../Components/User/SideBar/SideBar'
import BookReview from '../../Components/User/BookReview/BookReview'

function BookReviews() {
  return (
    <div className='bookreview' style={{display:'flex', flexDirection:'column'}}>
        <SideBar/>
        <BookReview/>
    </div>
    )
}

export default BookReviews