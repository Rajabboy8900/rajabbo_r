const jwt = require("jsonwebtoken")

async function checkAdmin(req, res, next) {
  try {
    const authorization = req.headers.authorization
    if (!authorization) {
      return res.status(401).json({
        message: "authorization emas",
      });
    }
    const bearer = authorization.split(" ")[0];
    const token = authorization.split(" ")[1];

    
    if (bearer !== "Bearer" || !token) {
      return res.status(401).json({
        message: "bearer yoki token topilmadi",
      });
    }
const decode = jwt.verify(token,process.env.SECRET_KEY)
req.user = decode

if (req.user.role !== "admin") {
  return res.status(403).json({
    message:"Siz admin emassiz!"
  })
}


    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
module.exports = { checkAdmin };
