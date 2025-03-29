const {Router} = require("express")
const { addProdact, getProdact } = require("../controller/prodect.controller")
const { checkAdmin } = require("../middlewere/admin_cheker_middlewere")

const prodactRouter = Router()

prodactRouter.post("/add_prodact",checkAdmin ,addProdact)
prodactRouter.get("/get_prodact", getProdact)


module.exports = {prodactRouter}
