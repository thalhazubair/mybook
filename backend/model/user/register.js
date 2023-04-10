const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullname: String,
  username: String,
  email: String,
  phone: Number,
  password: String,
  plan: {
    type: String,
    default: "None",
  },
  isBlocked: {
    type: Boolean,
  },
  favourites:[{
    type:String
  }],
  rentedBooks: [
    {
      bookName: {
        type: String,
        required: true,
      },
      bookimage:{
        type:String
      },

      rentedDate: {
        type: String,
        required: true,
      },
      returnDate: {
        type: String,
        default: function () {
          const rentedDate = new Date(this.rentedDate); // convert rentedDate string to Date object
          const minDays = 7;
          const maxDays = 14;
          const randomDays =
            Math.floor(Math.random() * (maxDays - minDays + 1)) + minDays;
          const returnDate = new Date(
            rentedDate.getTime() + randomDays * 24 * 60 * 60 * 1000
          );
          const returnYear = returnDate.getFullYear();
          const returnMonth = returnDate.getMonth() + 1; // JavaScript months are zero-based
          const returnDay = returnDate.getDate();
          const returnDateString = `${returnYear}-${returnMonth
            .toString()
            .padStart(2, "0")}-${returnDay.toString().padStart(2, "0")}`;
          return returnDateString;
        },
      },
      returnedDate:{
        type:String,
      },
    },
  ],
  reservedBooks: [
    {
      type: String,
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
