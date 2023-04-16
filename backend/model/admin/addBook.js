const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const booksSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    author: {
        type:String,
        required:true,
    },
    genre:{
        type:String,
        required:true
    },
    image:[ {
        url: {
          type: String,
        },
        filename: {
          type: String,
        },
      }],
    status:{
        type:String,
        default:"Available"
    },
    username:{
        type:String
    },
    reserve:{
        type:Boolean,
        default:false
    },
    rentedDate: {
        type: String,
      },
    rentedusers: [
        {
          username: {
            type: String,

          },
          rentedDate:{
            type: String
          }
        }
    ],
    favouritedusers:[{
        type:String
      }],
    reviews: [
        {
          username:{
            type: String,
          },
          review:{
            type: String
          }
        },
      ],
    
});


const Books = mongoose.model("addedBooks", booksSchema);

module.exports = {
    Books
}