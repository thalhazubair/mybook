const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const genreSchema = new Schema({
    genre:{
        type:String,
        required:true
    },
    status: {
        type:String,
        default:"active",
    },
    isBlocked: {
        type: Boolean
      }
    
});


const Genre = mongoose.model("Genre", genreSchema);

module.exports = {
    Genre
}