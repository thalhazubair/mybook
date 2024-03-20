const mongoose = require("mongoose");

const dbConnect = () => {
  mongoose
    .connect(
      `mongodb+srv://${process.env.CLUSTER_USER}:${process.env.CLUSTER_PASS}@cluster0.sowpqam.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    )
    .then((result) => {
      console.log("Database connected");
    })
    .catch((err) => {
      console.log("database error \n" + err);
    });
};

module.exports = dbConnect;
