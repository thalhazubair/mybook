const jwt = require("jsonwebtoken");
const { User } = require("../model/user/register");

module.exports = {
  verifyUserToken: (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (authHeader == undefined) {
      res.status(401).send({ error: "No Token Provided" });
    }
    const token = authHeader.split(" ").pop();
    jwt.verify(token, process.env.USER_SECRET, (err, decoded) => {
      if (err) {
        res.status(500).send({ error: "Authentication failed" });
      } else {
        User.findOne({ username: decoded.username }).then((doc) => {
          const blocked = doc.isBlocked;
          if (blocked == true) {
            return res.send({ blocked: true });
          }else{
            req.username = decoded.username;
            next();
          }
        });
      }
    });
  },

  verifyAdminToken: (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader == undefined) {
      res.status(401).send({ error: "No Token Provided" });
    }
    const token = authHeader.split(" ").pop();
    jwt.verify(token, process.env.ADMIN_SECRET, (err, decoded) => {
      if (err) {
        res.status(500).send({ error: "Authentication failed" });
      } else {
        next();
      }
    });
  },
};
