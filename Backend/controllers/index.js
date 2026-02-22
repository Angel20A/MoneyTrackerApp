import { dbPool } from "../utils/index.js";
import bcrypt from "bcryptjs";
import mssql from "mssql";


//usuarios
export const registerUser = async (req) => {
    try {
        const { nombre, apellido, email, password } = req.body;
        const pool = await dbPool.connect();
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.request()
            .input("nombre", mssql.NVarChar, nombre)
            .input("apellido", mssql.NVarChar, apellido)
            .input("email", mssql.NVarChar, email)
            .input("password", mssql.NVarChar, hashedPassword)
            .query("INSERT INTO MTK_USUARIO (USU_NOMBRE, USU_APELLIDO, USU_EMAIL, USU_PASS) VALUES (@nombre, @apellido, @email, @password)");

        return { status: 200, data: { message: "Usuario registrado con éxito", result: result.recordset } };
    } catch (error) {
        return { status: 400, error: error.message || "Error al registrar el usuario" };
    }
}

export const loginUser = async (req) => {
    try {
        const { email, password } = req.body;
        const pool = await dbPool.connect();
        const result = await pool.request()
            .input("email", mssql.NVarChar, email)
            .query("SELECT * FROM MTK_USUARIO WHERE USU_EMAIL = @email");

        if (result.recordset.length === 0) {
            return { status: 400, error: "Usuario no encontrado" };
        }
        const user = result.recordset[0];

        const isPasswordValid = await bcrypt.compare(password, user.USU_PASS);
        if (!isPasswordValid) {
            return { status: 400, error: "Contraseña incorrecta" };
        }

        return { status: 200, data: { message: "Inicio de sesión exitoso", user } };
    } catch (error) {
        return { status: 400, error: error.message || "Error al iniciar sesión" };
    }
}

//categorias
export const getCategories = async () => {
    try {
        const pool = await dbPool.connect();
        const result = await pool.request().query("SELECT * FROM MTK_CATEGORIA");

        return { status: 200, data: result.recordset };
    } catch (error) {
        return { status: 400, error: error.message || "Error al obtener las categorías" };
    }
};

export const addCategory = async (req) => {
    try {
        const { nombre, descripcion, id_usuario, tipo_categoria } = req.body;
        const pool = await dbPool.connect();
        const result = await pool.request()
            .input("nombre", mssql.NVarChar, nombre)
            .input("descripcion", mssql.NVarChar, descripcion)
            .input("id_usuario", mssql.Int, id_usuario)
            .input("tipo_categoria", mssql.NVarChar, tipo_categoria)
            .query("INSERT INTO MTK_CATEGORIA (CAT_NOMBRE, USU_USUARIO, CAT_TIPO_CATEGORIA) VALUES (@nombre, @id_usuario, @tipo_categoria)");

        return { status: 200, data: { message: "Categoría agregada con éxito", result: result.recordset } };
    } catch (error) {
        return { status: 400, error: error.message || "Error al agregar la categoría" };
    }
};


export const updateCategory = async (req) => {
    try {
        const { id, nombre, descripcion, id_usuario, tipo_categoria } = req.body;
        const pool = await dbPool.connect();
        const result = await pool.request()
            .input("id", mssql.Int, id)
            .input("nombre", mssql.NVarChar, nombre)
            .input("descripcion", mssql.NVarChar, descripcion)
            .input("id_usuario", mssql.Int, id_usuario)
            .input("tipo_categoria", mssql.NVarChar, tipo_categoria)
            .query(`UPDATE MTK_CATEGORIA SET CAT_NOMBRE = @nombre, 
                    CAT_DESCRIPCION = @descripcion, USU_USUARIO = @id_usuario, 
                    CAT_TIPO_CATEGORIA = @tipo_categoria WHERE CAT_ID = @id`);

        return { status: 200, data: { message: "Categoría actualizada con éxito", result: result.recordset } };
    } catch (error) {
        return { status: 400, error: error.message || "Error al actualizar la categoría" };
    }
};

export const deleteCategory = async (req) => {
    try {
        const { id_categoria } = req.body;
        const pool = await dbPool.connect();
        const result = await pool.request()
            .input("id_categoria", mssql.Int, id_categoria)
            .query(`DELETE FROM MTK_CATEGORIA WHERE CAT_ID = @id_categoria`);

        return { status: 200, data: { message: "Categoría eliminada con éxito", result: result.recordset } };
    } catch (error) {
        return { status: 400, error: error.message || "Error al eliminar la categoría" };
    }
};

//cuenta
export const getAccounts = async (req) => {
    try {
        const { id_usuario } = req.body;
        const pool = await dbPool.connect();
        const result = await pool.request()
            .input("id_usuario", mssql.Int, id_usuario)
            .query(`SELECT * FROM MTK_CUENTA WHERE USU_USUARIO = @id_usuario`);

        return { status: 200, data: result.recordset };
    } catch (error) {
        return { status: 400, error: error.message || "Error al obtener las cuentas" };
    }
};

export const addAccount = async (req) => {
    try {
        const { nombre, saldo, id_usuario } = req.body;
        const pool = await dbPool.connect();
        const result = await pool.request()
            .input("nombre", mssql.NVarChar, nombre)
            .input("saldo", mssql.Decimal, saldo)
            .input("id_usuario", mssql.Int, id_usuario)
            .query(`INSERT INTO MTK_CUENTA (USU_USUARIO, CUE_NOMBRE, CUE_SALDO) VALUES (@id_usuario, @nombre, @saldo)`);

        return { status: 200, data: { message: "Cuenta agregada con éxito", result: result.recordset } };
    } catch (error) {
        return { status: 400, error: error.message || "Error al agregar la cuenta" };
    }
};

export const updateAccount = async (req) => {
    try {
        const { id, nombre, saldo, id_usuario } = req.body;
        const pool = await dbPool.connect();
        const result = await pool.request()
            .input("id", mssql.Int, id)
            .input("nombre", mssql.NVarChar, nombre)
            .input("saldo", mssql.Decimal, saldo)
            .input("id_usuario", mssql.Int, id_usuario)
            .query(`UPDATE MTK_CUENTA SET CUE_NOMBRE = @nombre, 
                    CUE_SALDO = @saldo, USU_USUARIO = @id_usuario 
                    WHERE CUE_ID = @id`);

        return { status: 200, data: { message: "Cuenta actualizada con éxito", result: result.recordset } };
    } catch (error) {
        return { status: 400, error: error.message || "Error al actualizar la cuenta" };
    }
};

export const deleteAccount = async (req) => {
    try {
        const { id } = req.body;
        const pool = await dbPool.connect();
        const result = await pool.request()
            .input("id", mssql.Int, id)
            .query(`DELETE FROM MTK_CUENTA WHERE CUE_ID = @id`);

        return { status: 200, data: { message: "Cuenta eliminada con éxito", result: result.recordset } };
    } catch (error) {
        return { status: 400, error: error.message || "Error al eliminar la cuenta" };
    }
};

//movimientos
export const getMovements = async (req) => {
    try {
        const { id_usuario } = req.body;
        const pool = await dbPool.connect();
        const result = await pool.request()
            .input("id_usuario", mssql.Int, id_usuario)
            .query(`SELECT m.MOV_MOVIMIENTO, m.MOV_FECHA, m.MOV_HORA, m.MOV_MONTO, m.MOV_DESCRIPCION,
                        c.CAT_NOMBRE, c.CAT_TIPO_CATEGORIA
                    FROM MTK_MOVIMIENTO m
                        INNER JOIN MTK_CATEGORIA c 
                            ON m.CAT_CATEGORIA = c.CAT_CATEGORIA
                            WHERE m.CUE_CUENTA = @id_usuario
                            ORDER BY m.MOV_FECHA DESC, m.MOV_HORA DESC;`);

        return { status: 200, data: result.recordset };
    } catch (error) {
        return { status: 400, error: error.message || "Error al obtener los movimientos" };
    }
};

export const addMovement = async (req) => {
    try {
        const { fecha, hora, cuenta, categoria, monto, descripcion } = req.body;
        const pool = await dbPool.connect();
        const result = await pool.request()
            .input("fecha", mssql.Date, fecha)
            .input("hora", mssql.Time, hora)
            .input("cuenta", mssql.Int, cuenta)
            .input("categoria", mssql.Int, categoria)
            .input("monto", mssql.Decimal, monto)
            .input("descripcion", mssql.NVarChar, descripcion)
            .query(`INSERT INTO MTK_MOVIMIENTO (MOV_FECHA, MOV_HORA, CUE_CUENTA, CAT_CATEGORIA, MOV_MONTO, MOV_DESCRIPCION)
                    VALUES (@fecha, @hora, @cuenta, @categoria, @monto, @descripcion)`);

        return { status: 200, data: { message: "Movimiento agregado con éxito", result: result.recordset } };
    } catch (error) {
        return { status: 400, error: error.message || "Error al agregar el movimiento" };
    }
};

export const updateMovement = async (req) => {
    try {
        const { id_movimiento, fecha, hora, cuenta, categoria, monto, descripcion } = req.body;
        const pool = await dbPool.connect();
        const result = await pool.request()
            .input("id_movimiento", mssql.Int, id_movimiento)
            .input("fecha", mssql.Date, fecha)
            .input("hora", mssql.Time, hora)
            .input("cuenta", mssql.Int, cuenta)
            .input("categoria", mssql.Int, categoria)
            .input("monto", mssql.Decimal, monto)
            .input("descripcion", mssql.NVarChar, descripcion)
            .query(`UPDATE MTK_MOVIMIENTO SET MOV_FECHA = @fecha, 
                    MOV_HORA = @hora, CUE_CUENTA = @cuenta, CAT_CATEGORIA = @categoria, MOV_MONTO = @monto, 
                    MOV_DESCRIPCION = @descripcion 
                    WHERE MOV_ID = @id_movimiento`);

        return { status: 200, data: { message: "Movimiento actualizado con éxito", result: result.recordset } };
    } catch (error) {
        return { status: 400, error: error.message || "Error al actualizar el movimiento" };
    }
};

export const deleteMovement = async (req) => {
    try {
        const { id_movimiento } = req.body;
        const pool = await dbPool.connect();
        const result = await pool.request()
            .input("id_movimiento", mssql.Int, id_movimiento)
            .query(`DELETE FROM MTK_MOVIMIENTO WHERE MOV_ID = @id_movimiento`);

        return { status: 200, data: { message: "Movimiento eliminado con éxito", result: result.recordset } };
    } catch (error) {
        return { status: 400, error: error.message || "Error al eliminar el movimiento" };
    }
};
