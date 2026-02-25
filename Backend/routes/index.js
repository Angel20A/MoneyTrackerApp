import {
    registerUser, loginUser,
    getCategories, addCategory, updateCategory, deleteCategory,
    getAccounts, addAccount, updateAccount, deleteAccount,
    getMovements, addMovement, updateMovement, deleteMovement
} from "../controllers/index.js";
import { Router } from "express";

const router = Router();

// --- Usuarios ---
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

// --- Categorías ---
router.get("/categories", async (req, res) => {
    console.log("GET /categories");
    const result = await getCategories(req);
    if (result.status === 200) {
        res.status(200).json(result.data)
    } else {
        res.status(400).json({ message: result.error })
    }
});

router.post("/categories", async (req, res) => {
    console.log("POST /categories");
    const result = await addCategory(req);
    if (result.status === 200) {
        res.status(200).json(result.data)
    } else {
        res.status(400).json({ message: result.error })
    }
});

router.put("/categories", async (req, res) => {
    console.log("PUT /categories");
    const result = await updateCategory(req);
    if (result.status === 200) {
        res.status(200).json(result.data)
    } else {
        res.status(400).json({ message: result.error })
    }
});

router.delete("/categories", async (req, res) => {
    console.log("DELETE /categories");
    const result = await deleteCategory(req);
    if (result.status === 200) {
        res.status(200).json(result.data)
    } else {
        res.status(400).json({ message: result.error })
    }
});

// --- Cuentas ---
router.get("/accounts/:id_usuario", async (req, res) => {
    console.log(`GET /accounts/${req.params.id_usuario}`);
    const result = await getAccounts(req);
    if (result.status === 200) {
        res.status(200).json(result.data)
    } else {
        res.status(400).json({ message: result.error })
    }
});

router.post("/accounts", async (req, res) => {
    console.log("POST /accounts");
    const result = await addAccount(req);
    if (result.status === 200) {
        res.status(200).json(result.data)
    } else {
        res.status(400).json({ message: result.error })
    }
});

router.put("/accounts", async (req, res) => {
    console.log("PUT /accounts");
    const result = await updateAccount(req);
    if (result.status === 200) {
        res.status(200).json(result.data)
    } else {
        res.status(400).json({ message: result.error })
    }
});

router.delete("/accounts/:id_cuenta", async (req, res) => {
    console.log("DELETE /accounts");
    const result = await deleteAccount(req);
    if (result.status === 200) {
        res.status(200).json(result.data)
    } else {
        res.status(400).json({ message: result.error })
    }
});

// --- Movimientos ---
router.get("/movements/:id_usuario", async (req, res) => {
    console.log(`GET /movements/${req.params.id_usuario}`);
    const result = await getMovements(req);
    if (result.status === 200) {
        res.status(200).json(result.data)
    } else {
        res.status(400).json({ message: result.error })
    }
});

router.post("/movements", async (req, res) => {
    console.log("POST /movements");
    const result = await addMovement(req);
    if (result.status === 200) {
        res.status(200).json(result.data)
    } else {
        res.status(400).json({ message: result.error })
    }
});

router.put("/movements", async (req, res) => {
    console.log("PUT /movements");
    const result = await updateMovement(req);
    if (result.status === 200) {
        res.status(200).json(result.data)
    } else {
        res.status(400).json({ message: result.error })
    }
});

router.delete("/movements/:id_movimiento", async (req, res) => {
    console.log("DELETE /movements");
    const result = await deleteMovement(req);
    if (result.status === 200) {
        res.status(200).json(result.data)
    } else {
        res.status(400).json({ message: result.error })
    }
});

export default router;
