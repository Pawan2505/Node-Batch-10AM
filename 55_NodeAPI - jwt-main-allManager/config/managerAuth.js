const jwt = require("jsonwebtoken");

const managerAuth = (req, res, next) => {
  const token = req.headers["authorization"];
  console.log("Authorization Token:", token);
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try{

    let decoded = jwt.verify(token.slice(7,token.length), "RNWManager");
    req.user = decoded;
    next();

  }catch(error){
    return res.status(401).json({ error: "Invalid Token" });
  }
};

module.exports = managerAuth;
