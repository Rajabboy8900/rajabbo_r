const express = require("express");
const { getProducts, createProduct, updateProduct, deleteProduct } = require("../controllers/product.controller");
const { isAdmin } = require("../middleware/auth.middleware");  // Admin rolini tekshirish
const router = express.Router();

// Mahsulotlar ro'yxatini olish (GET)
router.get("/", getProducts);

// Mahsulotni qo'shish (POST)
router.post("/", isAdmin, createProduct);

// Mahsulotni yangilash (PUT)
router.put("/:id", isAdmin, updateProduct);

// Mahsulotni o'chirish (DELETE)
router.delete("/:id", isAdmin, deleteProduct);

module.exports = router;
