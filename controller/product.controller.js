const { readFile, writeFile } = require("../methods"); // methods.js yordamida fayllarni o'qish va yozish
const filePath = "./data/products.json"; // Mahsulotlar saqlanadigan fayl yo'li

// Mahsulotlarni olish (GET)
exports.getProducts = (req, res) => {
  if (req.method === "GET" && req.url === "/api/products") {
    const products = readFile(filePath);
    res.json(products);
  } else {
    res.status(404).json({ message: "Not Found" });
  }
};

// Yangi mahsulot qo'shish (POST)
exports.createProduct = (req, res) => {
  if (req.method === "POST" && req.url === "/api/products") {
    const { name, price, description } = req.body;
    const products = readFile(filePath);

    const newProduct = {
      id: Date.now(),
      name,
      price,
      description
    };

    products.push(newProduct);
    writeFile(filePath, products);
    res.status(201).json({
      message: "Product added successfully",
      product: newProduct
    });
  } else {
    res.status(404).json({ message: "Not Found" });
  }
};

// Mahsulotni yangilash (PUT)
exports.updateProduct = (req, res) => {
  const { id } = req.params;
  
  if (req.method === "PUT" && req.url === `/api/products/${id}`) {
    const { name, price, description } = req.body;

    const products = readFile(filePath);
    const productIndex = products.findIndex(p => p.id === parseInt(id));

    if (productIndex !== -1) {
      products[productIndex] = {
        id: parseInt(id),
        name,
        price,
        description
      };
      writeFile(filePath, products);
      res.status(200).json({
        message: "Product updated successfully",
        product: products[productIndex]
      });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } else {
    res.status(404).json({ message: "Not Found" });
  }
};

// Mahsulotni o'chirish (DELETE)
exports.deleteProduct = (req, res) => {
  const { id } = req.params;
  
  if (req.method === "DELETE" && req.url === `/api/products/${id}`) {
    const products = readFile(filePath);
    const productIndex = products.findIndex(p => p.id === parseInt(id));

    if (productIndex !== -1) {
      const deletedProduct = products.splice(productIndex, 1);
      writeFile(filePath, products);
      res.status(200).json({
        message: "Product deleted successfully",
        product: deletedProduct
      });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } else {
    res.status(404).json({ message: "Not Found" });
  }
};
