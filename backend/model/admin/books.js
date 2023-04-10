const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    authors: [{
        type:String,
        required:true,
    }],
    categories:[{
        type:String,
        required:true
    }],
    imagelinks:{
        type:String,
    },
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
        required: true,
      },
    rentedusers: [
        {
          username: {
            type: String,
            required: true,
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


const Book = mongoose.model("Book", bookSchema);

module.exports = {
    Book
}