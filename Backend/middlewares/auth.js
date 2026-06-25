import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Acceso denegado, no hay token." });
    }

    try {
        const decodificado = jwt.verify(token, process.env.JWT_SECRET);
        req.userAuth = decodificado; //inyecta el payload del token en la request
        next(); //continua con la siguiente funcion (el controlador)
    } catch (error) {
        return res.status(403).json({ message: "Acceso denegado, token invalido." });
    }
}