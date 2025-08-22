const jwt = require('jsonwebtoken');

const authUser = (req, res, next) => {

let token = req.header("authorization");
const newToken = token.slice(7,token.length);

console.log(newToken);

if(!newToken) {
    return res.status(401).json({ message: "Unauthorized- Token required" });
}

try{

    let decoded= jwt.verify(newToken, 'RNW');
    req.user = decoded;
    next();

}catch(error){
    return res.status(401).json({ message: "Unauthorized- Invalid Token" });
}

}


module.exports = authUser;
