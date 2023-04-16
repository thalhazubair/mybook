const errorHandler = (err, req, res, next) => {
  console.log("dasds");
    console.error(err);
    if (err.name === "ValidationError") {
      res.status(400).send(err.message);
    } else if (err.name === "MongoError" && err.code === 11000) {
      res.status(409).send("Duplicate key error");
    } else {
      console.log(err.name)
      res.status(500).send("Something went wrong");
    }
  };
  
  module.exports = errorHandler;