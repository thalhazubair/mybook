const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const auctionSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  starting_bid_price: {
    type: Number,
    required: true,
  },
  current_bid_price: {
    type: Number,
    default: function () {
      return this.starting_bid_price;
    },
  },
  startdate: {
    type: String,
    required: true,
  },
  enddate: {
    type: String,
    required: true,
  },
  image:[ {
    url: {
      type: String,
    },
    filename: {
      type: String,
    },
  }],
  last_bidded_member: [
    {
      type: String,
      default: null,
    },
  ],
  status:{
    type:String,
    enum: ['Active', 'Inactive','Sold'],
    default: 'Inactive'
  },
  soldTo:{
    type:String,
    default:"none"
  },
  paid: {
    type:Boolean,
    default:false
  }
  
});

auctionSchema.pre("save", function (next) {
    const currentDate = Date.now();
    const auctionStartDate = new Date(this.startdate).getTime();
    const auctionEndDate = new Date(this.enddate).getTime();
  
    if (currentDate >= auctionStartDate && currentDate <= auctionEndDate) {
      this.status = "Active";
    } else if (currentDate > auctionEndDate) {
      this.status = "Sold"; 
    } else {
      this.status = "Inactive";
    }
    next();
  });   

const Auction = mongoose.model("Auction", auctionSchema);

module.exports = {
  Auction,
};
