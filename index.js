const express = require("express")
const cors = require("cors")
const { log } = require("node:console")
const { authRouter } = require("./router/auth.routes")
const { prodactRouter } = require("./router/prodact.routes")
const { superadminRouter } = require("./router/superadmin.routes")

require("dotenv").config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(superadminRouter)
app.use(authRouter)
app.use(prodactRouter)

const PORT = process.env.PORT || 4000


app.listen(PORT, () => {
    console.log(`Server ishladi https://localhost:${PORT}`);
})