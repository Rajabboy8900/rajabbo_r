const { read_file, write_file } = require("../api/metods");
const bcryptjs = require("bcryptjs");
const { v4 } = require("uuid");
const jwt = require("jsonwebtoken")

const getProdact = async (req, res) => {
    try {
    
      const readFileData = read_file("prodact.json");
     
      res.status(201).json(readFileData);
    } catch (error) {
      return res.send(error.message);
    }
  };

const addProdact = async (req, res) => {
  try {
    const { title, desc, price, quantity } = req.body;
    const readFileData = read_file("prodact.json");
   
    readFileData.push({id:v4(),title, desc, price, quantity });
    write_file("prodact.json", readFileData);
    res.status(201).json({
        message: "Yangi malumot qoshildi",
    });
  } catch (error) {
    return res.send(error.message);
  }
};
module.exports = {
  addProdact,
  getProdact
};
