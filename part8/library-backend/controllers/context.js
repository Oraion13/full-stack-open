require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const context = async ({ req }) => {
  const auth = req ? req.headers["authorization"] : null;

  if (auth && auth.toLowerCase().startsWith("bearer ")) {
    const decodedToken = await jwt.verify(
      auth.substring(7),
      process.env.ACCESS_TOKEN_SECRET
    );
    
    const currentUser = await User.findById(decodedToken.id);
    return { currentUser };
  }
};

module.exports = context;
