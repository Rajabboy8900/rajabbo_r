const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./api/router/auth.routes");
const productRoutes = require("./api/router/product.routes");
const { verifyToken } = require("./api/middleware/auth.middleware");  // Tokenni tekshirish middleware

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Foydalanuvchi tokenni tekshirish
app.use(verifyToken);

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at: http://localhost:${PORT}`));
