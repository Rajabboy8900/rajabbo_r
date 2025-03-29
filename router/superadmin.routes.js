const {Router} = require("express")
const { addadmin, addprodact, updateprodact, getprodact, getoneprodact, deleteprodact } = require("../controller/superadmin.controller")
const { checkAdmin } = require("../middlewere/admin_cheker_middlewere")


const superadminRouter = Router()

superadminRouter.post("/add_admin",checkAdmin,addadmin)
superadminRouter.get("/get_prodact",getprodact)
superadminRouter.get("/get_one_prodact/:id",getoneprodact)
superadminRouter.post("/add_prodact",checkAdmin,addprodact)
superadminRouter.put("/update_prodact/:id",checkAdmin,updateprodact)
superadminRouter.delete("/delete_prodact/:id",checkAdmin,deleteprodact)

module.exports = {superadminRouter}