const { read_file, write_file } = require("../api/metods");
const bcryptjs = require("bcryptjs");
const { v4 } = require("uuid");
const jwt = require("jsonwebtoken");

const addadmin = async (req, res) => {
  try {
    const { user, email, password, role } = req.body;
    const readFileData = read_file("user.json");
    const foundedData = readFileData.find((item) => item.email === email);
    const foundedUser = readFileData.find((item) => item.user === user);
    if (!role === "superadmin") {
      return res.json({
        message: "Siz admin qosha olmaysiz",
      });
    }
    if (foundedUser) {
      return res.json({
        message: "User admin avvaldan mavjud",
      });
    }
    if (foundedData) {
      return res.json({
        message: "Email avvaldan mavjud",
      });
    }
    const hash = await bcryptjs.hash(password, 10);
    readFileData.push({ id: v4(), user, email, password: hash, role });
    write_file("user.json", readFileData);
    res.status(201).json({
      message: "Ro`yxatdan o`tildi",
    });
  } catch (error) {
    return res.send(error.message);
  }
};

// const superlogin = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const readFileData = read_file("superadmin.json");
//     const foundedData = readFileData.find((item) => item.email === email);
//     if (!foundedData) {
//       return res.json({
//         message: "Foydalanuvchi topilmadi",
//       });
//     }
//     const decode = await bcryptjs.compare(password, foundedData.password);
//     const patload = {
//       user: foundedData.user,
//       email: foundedData.email,
//       id: foundedData.id,
//       role: foundedData.role,
//     };
//     if (decode) {
//       const token = jwt.sign(patload, process.env.SECRET_KEY, {
//         expiresIn: process.env.TOKEN_EXP,
//       });
//       return res.status(200).json({
//         message: "Togri parol",
//         token,
//       });
//     } else {
//       return res.status(401).json({
//         message: "Parol xato ",
//       });
//     }
//   } catch (error) {
//     return res.send(error.message);
//   }
// };

const getprodact = async (req, res) => {
  try {
    const readFileData = read_file("prodact.json");
    res.status(201).json(readFileData);
  } catch (error) {
    return res.send(error.message);
  }
};

const getoneprodact = async (req, res) => {
  try {
    const { id } = req.body;
    const readFileData = read_file("prodact.json");
    const foundedData = readFileData.find((item) => item.id === id);
    if (!foundedData) {
      return res.status(404).send({
        message: `${id} bunday idli mahsulot topilmadi`,
      });
    }
    res.status(200).send(foundedData);
  } catch (error) {
    return res.send(error.message);
  }
};

const addprodact = async (req, res) => {
  try {
    const { title, desc, price, quantity } = req.body;
    const readFileData = read_file("prodact.json");

    readFileData.push({ id: v4(), title, desc, price, quantity });
    write_file("prodact.json", readFileData);
    res.status(201).json({
      message: "Yangi malumot qoshildi",
    });
  } catch (error) {
    return res.send(error.message);
  }
};
// console.log("salomk");
/// xatoooo
const updateprodact = async (req, res) => {
  try {
    const { id, title, desc, price, quantity } = req.body;
    const readFileData = read_file("prodact.json");
    const foundedData = readFileData.find((item) => item.id === id);

    if (!foundedData) {
      res.status(404).send({
        message: `${id} bunday mahsulot topilmadi`,
      });
    }
    readFileData.forEach((item) => {
      if (item.id === id) {
        (item.title = title ? title : item.title),
          (item.desc = desc ? desc : item.desc),
          (item.price = price ? price : item.price),
          (item.quantity = quantity ? quantity : item.quantity);
      }
    });
    write_file("prodact.json", readFileData);
    res.status(200).send({
      message: `Mahsulot ozgartrildi`,
    });
  } catch (error) {
    return res.send(error.message);
  }
};

const deleteprodact = async (req,res) => {
  try{
    const { id } = req.body;
    const readFileData = read_file("prodact.json");
    const foundedData = readFileData.find((item) => item.id === id);
    if (!foundedData) {
      return res.status(404).send({
        message: `${id} bunday idli mahsulot topilmadi`,
      });
    }
    readFileData.forEach((item,index) => {
      if (item.id === id) {
        readFileData.splice(index,1)
      }
    })
    write_file("prodact.json",readFileData)
    res.status(200).json({
      message:"Mahsulot ochirildi"
    })
  }catch(error){
    return res.send(error.message);
  }
}

module.exports = {
  addadmin,
  getprodact,
  getoneprodact,
  addprodact,
  updateprodact,
  deleteprodact
};
