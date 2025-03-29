const { read_file, write_file } = require("../api/metods");
const bcryptjs = require("bcryptjs");
const { v4 } = require("uuid");
const jwt = require("jsonwebtoken")
const register = async (req, res) => {
  try {
    const { user, email, password, role } = req.body;
    const readFileData = read_file("user.json");
    const foundedData = readFileData.find((item) => item.email === email);
    if (role === "superadmin" || role === "admin") {
      return res.status(400).json({
        message:"Siz superadmin va admin qo`sha olmaysiz buni faqat DASTURCHI qila oladi!"
      })
    }
    if (foundedData) {
      return res.json({
        message: "Foydalanuvchi avvaldan mavjud",
      });
    }
    const hash = await bcryptjs.hash(password, 10);
    readFileData.push({ id: v4(), user, email, password: hash, role });
    write_file("user.json", readFileData);
    res.status(201).json({
      message: "Ro`yxatdan o`tildi",
    });
    if (role !== "admin" || role !== "user") {
      return res.status(400).json({
        message: "Bunday role mavjud emas",
      });
    }
  } catch (error) {
    return res.send(error.message);
  }
};

const login = async (req, res) => {
  try {
    const {email,password} = req.body
    const readFileData = read_file("user.json");
    const foundedData = readFileData.find((item) => item.email === email);
    if (!foundedData) {
        return res.json({
            message:"Foydalanuvchi topilmadi"
        })
    }
    const decode = await bcryptjs.compare(password,foundedData.password)
    const patload = {
        user:foundedData.user,email:foundedData.email,id:foundedData.id,role:foundedData.role
    }
    if (decode) {
        const token = jwt.sign(patload,process.env.SECRET_KEY,{expiresIn:process.env.TOKEN_EXP})
        return res.status(200).json({
            message :"Togri parol",
            token
        })
    }else{
        return res.status(401).json({
            message:"Parol xato "
        })
    }



  } catch (error) {
    return res.send(error.message);
  }
};

module.exports = {
  register,
  login,
};
