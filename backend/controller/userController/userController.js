const { User } = require("../../model/user/register");
const { Auction } = require("../../model/admin/auction");
const { Book } = require("../../model/admin/books")
const mailer = require("../../middleware/otp");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const instance = require("../../middleware/razorpay");
const crypto = require("crypto");
const mongoose = require("mongoose");
const cron = require('node-cron');


module.exports = {
  getLogin: (req, res) => res.send("Hello World!"),

  postLogin: (req, res) => {
    try {
      const { username, password } = req.body
      User.findOne({ username: username }).then((doc) => {
        if(doc == null){
          res.send({ username: true });
        }
        else{
        const blocked = doc.isBlocked; 
        if (blocked === false) {
          bcrypt.compare(req.body.password, doc.password).then((value) => {
            console.log(value)
            if(value === false){
              res.send({ password:true })
            }else{
              const payload = {
                username: username,
              };
              Jwt.sign(
                payload,
                process.env.USER_SECRET,
                {
                  expiresIn: 360000,
                },
                (err, token) => {
                  if (err) {
                    console.error("some error occured");
                  } else {
                    res.json({
                      success: true,
                      doc: doc,
                      token: `Bearer ${token}`,
                    });
                  }
                }
              )
            }
           
          })
        } else {
          res.send({ blocked: true });
        }
      }
      })
      .catch()
    } catch (error) {}
  },

  postSignup: async (req, res) => {
    const { fullname, username, email, phone, password, confirmpassword } =
      req.body;
    let mailDetails = {
      from: "thalhaz999@gmail.com",
      to: email,
      subject: "MyBook ACCOUNT REGISTRATION",
      html: `<p>YOUR OTP FOR REGISTERING IN MyBook IS ${mailer.OTP}</p>`,
    };
    console.log(mailer.OTP);
    const user = new User({
      fullname,
      username,
      email,
      phone,
      password,
      confirmpassword,
    });
    if (password === confirmpassword) {
      User.find({ email: email }).then((result) => {
        if (result.length) {
          res.send({ email: true });
        } else {
          User.find({ phone: phone }).then((result) => {
            if (result.length) {
              res.send({ phone: true });
            } else {
              User.find({ username: username }).then((result) => {
                if (result.length) {
                  res.send({ username: true });
                } else {
                  mailer.mailTransporter.sendMail(mailDetails, (err) => {
                    if (err) {
                      console.log("error occurs");
                    } else {
                      res.send({ success: true });
                    }
                  });
                }
              });
            }
          });
        }
      });
    } else {
      res.send({ password: true });
    }
  },

  verifyOtp: async (req, res) => {
    const data = req.body;
    if (mailer.OTP == data.otp)
      await bcrypt.hash(data.password, 10).then((password) => {
        const user = new User({
          fullname: data.fullname,
          username: data.username,
          email: data.email,
          phone: data.phone,
          password: password,
          plan: data.plan,
          isBlocked: false,
        });
        user.save().then(() => {
          res.send({ success: true });
        });
      });
  },

  resendOtp: (req, res) => {
    const email = req.body.email;
    let mailDetails = {
      from: "thalhaz999@gmail.com",
      to: email,
      subject: "MyBook ACCOUNT REGISTRATION",
      html: `<p>YOUR OTP FOR REGISTERING IN MyBook IS ${mailer.OTP}</p>`,
    };
    console.log(mailer.OTP);

    mailer.mailTransporter.sendMail(mailDetails, (err) => {
      if (err) {
        console.log("error occurs");
      } else {
        res.send({ success: true });
      }
    });
  },

  editUser: (req, res) => {
    try {
      const data = req.body;

      User.updateOne(
        {
          username: data.username,
        },
        {
          $set: {
            fullname: data.fullname,
            username: data.username,
            email: data.email,
            phone: data.phone,
            plan: data.plan,
          },
        }
      ).then((data) => {
        res.send({ success: true, doc: data });
      });
    } catch (error) {}
  },

  getUserDetails: (req, res) => {
    const username = req.username;
    User.findOne({ username: username }).then((doc) => {
      res.send({
        success: true,
        doc: doc,
      });
    });
  },

  postPayment: (req, res) => {
    const username = req.username;
    const price = req.body.price;
    const options = {
      amount: price,
      currency: "INR",
      // eslint-disable-next-line prefer-template
      receipt: "" + username,
    };
    instance.orders.create(options, (err, order) => {
      if (err) {
        console.log(err);
        res.status(400).json({
          success: false,
          err,
        });
      } else {
        res.status(200).json({ order: order });
      }
    });
  },

  bidPayment: (req, res) => {
    const username = req.username;
    const price = req.body.price;
    const options = {
      amount: price,
      currency: "INR",
      // eslint-disable-next-line prefer-template
      receipt: "" + username,
    };
    instance.orders.create(options, (err, order) => {
      if (err) {
        console.log(err);
        res.status(400).json({
          success: false,
          err,
        });
      } else {
        res.status(200).json({ order: order });
      }
    });
  },

  verifyPayment: (req, res) => {
    const username = req.username;
    const amount = req.body.details.order.amount;
    let plan = "";
    if (amount == 350) {
      plan = "Standard Plan";
    }
    if (amount == 450) {
      plan = "Premium Plan";
    }
    if (amount == 100) {
      plan = "Premium Plan";
    }
    let hmac = crypto.createHmac("sha256", process.env.KEYSECRET);
    hmac.update(
      `${req.body.payment.razorpay_order_id}|${req.body.payment.razorpay_payment_id}`
    );
    hmac = hmac.digest("hex");
    User.updateOne(
      {
        username: username,
      },
      { 
        $set: {
          plan: plan,
        },
      }
    ).then(() => {
      res.send({
        plan: plan,
        success: true,
        message: "payment completed successfully",
      });
    });
  },

  verifyBidPayment: (req, res) => {
    const username = req.username;
    const amount = req.body.details.order.amount;
    const title = req.body.title
    
 
    let hmac = crypto.createHmac("sha256", process.env.KEYSECRET);
    hmac.update(
      `${req.body.payment.razorpay_order_id}|${req.body.payment.razorpay_payment_id}`
    ); 
    hmac = hmac.digest("hex");
    Auction.updateOne(
      {
        title: title,
      },
      {
        $set: {
          paid: true,
        },
      }
    ).then(() => {
      res.send({
        success: true,
        message: "payment completed successfully",
      });
    });
  },

  getListedBooks: (req, res,next) => {
    try {
      Auction.find({ status: "Active" }).then((doc) => {
        Auction.find({ status: "Inactive" }).then((inactiveBooks) => {
          res.send({ success: true, doc: doc, inactiveBooks: inactiveBooks });
        });
      });
    } catch (error) {
      next(error)
    }
  },

  postListedBooks: (req, res) => {
    const data = req.body;
    try {
      Auction.find({ _id: new mongoose.Types.ObjectId(data.bookId) }).then(
        (doc) => {
          res.send({ success: true, doc: doc[0] });
        }
      );
    } catch (error) {}
  },

  postBidPrice: (req, res) => {
    try {
      const data = req.body;
      const username = req.username;
      const price = data.price;
      const objId = new mongoose.Types.ObjectId(data.id);
      Auction.findOne({ _id: objId }).then((auction) => {
        const lastBidder =
          auction.last_bidded_member[auction.last_bidded_member.length - 1];
        if (lastBidder === username) {
          return res.send({ exist: true });
        }
        Auction.findOneAndUpdate(
          { _id: objId },
          {
            $inc: { current_bid_price: price },
            $push: { last_bidded_member: username },
          },
          {
            returnOriginal: false,
          }
        ).then((doc) => {
          res.send({ success: true, doc: doc });
        });
      });
    } catch (error) {}
  },

  gettBookDetails: (req, res) => {
    const data = req.body.id;
    try {
      Book.findOne({ imagelinks: data }).then((doc) => {
        res.send({ success: true, doc: doc });
      });
    } catch (error) {}
  },

  rentBook: (req, res) => {
    const username = req.username;
    const title = req.body.data;
    const link = req.body.link
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; 
    const day = currentDate.getDate();
    const current = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    try {
      User.updateOne({ username: username }, 
        { $push: { rentedBooks:{
          bookName: title,
          bookimage: link,
          rentedDate:`${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
        }}})
        .then(() => {
          return Book.updateOne(
            { title: title },
            { $set: { status: "rented out",username:username, rentedDate:`${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}` },
             $push: {
              rentedusers:{
              username:username,
              rentedDate:`${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
            }}}
            
          )
        })
        .then((doc) => {
          res.send({ success: true });
        })
    } catch (error) {}
  },

  reserveBook: async (req, res) => {
    const username = req.username;
    const title = req.body.data
    try {
      const book = await User.findOne({
        username: username,
        'rentedBooks.bookName': title,
      })
      if (book) {
        res.send({ rented: true });
        return
      }
      const existingBook = await Book.findOne({
        title: title,
        reserve: { $eq: true },
      })
      if (existingBook) {
        res.send({ exist: true });
        return
      }
      await User.updateOne(
        { username: username },
        { $push: { reservedBooks: title } }
      )
      await Book.updateOne({ title: title }, { $set: { reserve: true }});

      res.send({ success: true });
    } catch (error) {}
  },

  addToFavourite: (req,res) =>{
    const username = req.username;
    const title = req.body.data;

    try {
      User.findOne(
        { username:username,
         favourites: { $in: [title]} }
        ).then((doc)=>{
          if(doc){
            res.send({exist:true})
          }else{
            User.updateOne(
              { username:username },
              { $push: { favourites:title } }
            ).then((result)=>{
              Book.updateOne(
                {title:title},
                { $push: {favouritedusers:username}}
              ).then(()=>{
                User.findOne({
                  username:username
                }).then((doc)=>{
                  res.send({success:true,doc:doc})
                })
              })
            })
          }
        })
    } catch (error) {
      
    }
  },

  getFavourite: (req,res) => {
    const username = req.username
    try {
      User.findOne({ username:username })
      .then((doc)=>{
        Book.find({title:doc.favourites})
        .then((results)=>{
          res.send({success:true,results:results})
        }) 
      })
    } catch (error) {
      
    }
  },

  getReserved: (req,res) => {
    const username = req.username
    try {
      User.findOne({ username:username })
      .then((doc)=>{
        Book.find({title:doc.reservedBooks})
        .then((results)=>{
          res.send({success:true,results:results})
        }) 
      })
    } catch (error) {
      
    }
  },

  postReview: (req,res) => {
    const review = req.body.review
    const username = req.username
    const title = req.body.bookTitle
    try {
      Book.updateOne(
        {title:title},
        {$push: {reviews: {
          username:username,
          review:review
        }}}
      ).then((data)=>{
        res.send({success:true})
      })
    } catch (error) {
      
    }
  },

  getBookReview: (req,res) =>{
    const title = req.body.title
    try {
      Book.findOne({ imagelinks: title })
      .then((doc)=>{
        res.send({success:true,doc:doc})
      })
    } catch (error) {
      
    }
  },


  getAuthor: (req,res) => {
    Book.distinct("authors.0")
    .then((data)=>{
      res.send({success:true,authors:data})
    })
  },

  getBook: (req,res) => {
    try {
      Book.find()
      .then((doc)=>{
        res.send({success:true,doc:doc})
      })
    } catch (error) {
      
    }
  },

  getSoldBook: (req,res) => {
    try {
      const username = req.username
      Auction.find({soldTo : username})
      .then((doc)=>{
        res.send({success:true,doc:doc})
      })
    } catch (error) {
      
    }
  }
}
  