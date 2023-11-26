import express from "express"
import { createItem, deleteItem, getItem, getItems } from "../controllers/item.controller.js"
import { verifyToken } from "../middleware/jwt.js"

const router = express.Router()

// router.post("/", verifyToken, createItem)
router.delete("/:id", verifyToken, deleteItem)
router.get("/single/:id", verifyToken, getItem)
router.get("/", getItems)

export default router