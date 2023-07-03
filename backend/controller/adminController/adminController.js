const { User } = require("../../model/user/register");
const { Genre } = require("../../model/admin/genre");
const { Auction } = require("../../model/admin/auction");
const { Admin } = require("../../model/admin/admin");
const Jwt = require("jsonwebtoken");
const { Book } = require("../../model/admin/books");
const { Books} = require('../../model/admin/addBook');

module.exports = {
  postLogin: (req, res) => {
    try {
      const { email, password } = req.body
      Admin.findOne({ email:email , password:password }).then((doc) => {
        
        if(doc == null){
          res.send({ admin:true })
        }else{
          const payload = {
            email: email,
          }
          Jwt.sign(
            payload,
            process.env.ADMIN_SECRET,
            {
              expiresIn: 3600000,
            },
            (err, token) => {
              if (err) {
                console.error("error occures");
              } else {
                res.send({
                  success: true,
                  token: `Bearer ${token}`,
                });
              }
            }
          )
        }
        
      })
    } catch (error) {
      console.log(error);
    }
  },

  getMember: (req, res) => {
    try {
      User.find()
        .select("-password")
        .then((docs) => {
          res.send({ success: true, users: docs });
        })
        .catch((e) => {
          res.send(e);
        });
    } catch (error) {}
  },

  addGenre: async (req, res) => {
    try {
      const genre = req.body.genre;
      const exist = await Genre.find({
        genre: { $regex: new RegExp(`^${genre}$`, "i") },
      });
      if (exist.length === 1) {
        res.send({ exist: true });
      } else {
        const newgenre = new Genre({
          genre: genre,
          isBlocked: false,
        });
        const data = await newgenre.save();
        if (data) {
          res.send({ success: true });
        }
      }
    } catch (error) {}
  },

  getGenre: (req, res) => {
    try {
      Genre.find()
        .then((docs) => {
          res.send({ success: true, genre: docs });
        })
        .catch((e) => {
          res.send(e);
        });
    } catch (error) {}
  },

  getGenreAuction: (req, res) => {
    try {
      Genre.find({ isBlocked: false })
        .then((docs) => {
          res.send({ success: true, genre: docs });
        })
        .catch((e) => {
          res.send(e);
        });
    } catch (error) {}
  }, 

  addAuction: (req, res) => {
    const data = req.body

    const image = req.files.map((file) => {
      return {
        url: file.path,
        filename: file.filename,
      };
    });

    try {
      Auction.create({
        title: data.title, 
        author: data.author,
        genre: data.genre,  
        starting_bid_price: data.price,  
        startdate: data.startdate,
        enddate: data.enddate,
        image: image,
      }).then(() => {
        res.send({ success: true });
      });
    } catch (err) {
      console.log(err);
    }
  },

  addBook: (req, res) => {
    const data = req.body

    const image = req.files.map((file) => {
      return {
        url: file.path,
        filename: file.filename,
      };
    });

    try { 
      Books.create({
        title: data.title,  
        author: data.author,
        genre: data.genre,  
        image: image,
      }).then(() => {
        res.send({ success: true });
      });
    } catch (err) {
      console.log(err);
    }
  },

  getAuction: (req, res) => {
    try {
      Auction.find().then((docs) => {
        res.send({ success: true, books: docs });
      });
    } catch (error) {}
  },

  postBlock: (req, res) => {
    try {
      const id = req.params.id;
      User.findOneAndUpdate({ _id: id }, { isBlocked: true }).then((member) => {
        res.send({ success: true, member: member });
      });
    } catch (error) {}
  },

  postUnBlock: (req, res) => {
    try {
      const id = req.params.id;
      User.findOneAndUpdate({ _id: id }, { isBlocked: false }).then(
        (member) => {
          res.send({ success: true, member: member });
        }
      );
    } catch (error) {}
  },

  postBlockGenre: (req, res) => {
    try {
      const id = req.params.id;
      Genre.findOneAndUpdate({ _id: id }, { isBlocked: true }).then((genre) => {
        res.send({ success: true, genre: genre });
      });
    } catch (error) {}
  },

  postUnBlockGenre: (req, res) => {
    try {
      const id = req.params.id;
      Genre.findOneAndUpdate({ _id: id }, { isBlocked: false }).then(
        (genre) => {
          res.send({ success: true, genre: genre });
        }
      );
    } catch (error) {}
  },

  getSoldBook: (req,res) => {
    try {
      Auction.find({status:'Sold'})
      .then((doc)=>{
        res.send({success:true, doc:doc})
      })
    } catch (error) {
      
    }
  },

//   postBooks: (req, res) => {
//     const data = req.body 
//     console.log(data.length);
//     try {
//       for (let i = 0; i < data.length; i++){
//         const bookData = data[i];
//         Book.create({
//         title:bookData.title,
//         authors:bookData.authors[0].name,
//         categories:bookData.subjects[0],
//         imagelinks:bookData.formats["image/jpeg"]
//       }).then((doc)=>{
// console.log(doc);
//       })
//     }
//     console.log("finished");
//     } catch (error) {
      
//     }
//   }

getBooks: (req,res) => {
  try {
    Book.find()
    .then((doc)=>{
      res.send({success:true,doc:doc})
    })
  } catch (error) {
    
  }
},

getMyBook: (req,res) => {
  try {
    User.find()
    .then((users)=>{

      Book.find()
      .then((books)=>{
        Auction.find()
        .then((auction)=>{
        
          res.send({success:true,users:users,books:books,auction:auction})
        })
      })
    })
  } catch (error) {
    
  }
},

postReturnBook: async(req,res) => {
  const title = req.body.id
  try {
    const book = await Book.findOne({title:title})
    
      if(book){
        
        const user = await User.findOne({username:book.username})
        
          if(user){
            const rentedBook = user.rentedBooks.find((item) => item.bookName === book.title);
            if (rentedBook) {
              rentedBook.returnedDate = new Date().toISOString().slice(0,10);
              await user.save()
            }
          }
        
        book.status = 'Available';
        book.username = null;
        book.save()
        .then(()=>{
          res.send({success:true})
        })
        
      }else{
        
        res.send({success:false})
      }
  
  } catch (error) {
    
  }
}
};
