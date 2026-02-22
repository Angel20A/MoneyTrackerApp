import { getCategories, registerUser, loginUser } from "../controllers/index.js";
import { Router } from "express";

const router = Router();

router.get("/categories", async (req, res) => {
    console.log("GET /categories");
    const result = await getCategories();
    if (result.status === 200) {
        res.status(200).json(result.data)
    } else {
        res.status(400).json({ message: result.error })
    }
});

router.post("/register", async (req, res) => {
    console.log("POST /register");
    const result = await registerUser(req);
    if (result.status === 200) {
        res.status(200).json(result.data)
    } else {
        res.status(400).json({ message: result.error })
    }
});

router.post("/login", async (req, res) => {
    console.log("POST /login");
    const result = await loginUser(req);
    if (result.status === 200) {
        res.status(200).json(result.data)
    } else {
        res.status(400).json({ message: result.error })
    }
});

export default router;
