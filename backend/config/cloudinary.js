const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: "dwaoiadaf",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "MyBook",
    allowedFormats: ["jpeg", "png", "jpg"],
  },
});



const multer = require("multer");
const fileFilter = (req, file, cb) => {
  if (!["image/png", "image/jpg", "image/jpeg"].includes(file.mimetype)) {
    return cb(new Error("File is not an image"));
  } 
  return cb(null, true);
};

const upload = multer({ storage, fileFilter}) 

module.exports = (req, res, next) => {
  upload.array("file",10)(req, res, (err) => {
    
    if (err) {
      if (err.message === "File is not an image")
      return res.json({imageError:'Selected file is not an image'})
    }
    const files = req.files;
    const fileNames = files.map((file) => file.filename);
    
    const fileMimeTypes = files.map((file) => file.mimetype);
    
    return next();   
  });
}; 