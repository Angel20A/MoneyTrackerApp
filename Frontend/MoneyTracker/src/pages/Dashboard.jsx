import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Form } from 'react-bootstrap';
import MovItem from "../components/MovItem";
import CuentaItem from "../components/CuentaItem";
import api from "../api/api";

const Dashboard = () => {
    const navigate = useNavigate();
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    //console.log(usuario);
    const [name, setName] = useState(usuario.user.nombre);
    const [gestion, setGestion] = useState("Gastos");
    const [movimientos, setMovimientos] = useState([]);
    const [cuentas, setCuentas] = useState([]);
    const [showModalMovement, setShowModalMovement] = useState(false);

    useEffect(() => {
        const obtenerMovimientos = async () => {
            try {
                const idUsuario = usuario?.user?.id_usuario;

                if (idUsuario) {
                    const response = await api.get(`/movements/${idUsuario}`);
                    console.log(response.data);
                    setMovimientos(response.data);
                }
            } catch (error) {
                console.error("Error obteniendo movimientos:", error);
            }
        };

        obtenerMovimientos();

        const obtenerCuentas = async () => {
            try {
                const idUsuario = usuario?.user?.id_usuario;

                if (idUsuario) {
                    const response = await api.get(`/accounts/${idUsuario}`);
                    console.log(response.data);
                    setCuentas(response.data);
                }
            } catch (error) {
                console.error("Error obteniendo cuentas:", error);
            }
        };

        obtenerCuentas();
    }, []);

    const movimientosFiltrados = movimientos.filter((mov) => {
        if (gestion === "Gastos") return mov.CAT_TIPO_CATEGORIA == 0;
        if (gestion === "Ingresos") return mov.CAT_TIPO_CATEGORIA == 1;
        return true;
    });

    const handleLogout = () => {
        localStorage.removeItem("usuario");
        navigate("/");
    }

    const handleModalMovement = () => {
        setShowModalMovement(!showModalMovement);
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <form className="d-flex justify-content-between w-100" role="search">
                            <h4 className="text-dark me-2">¡Bienvenido {name}!</h4>
                            <button className="btn btn-outline-success" type="submit" onClick={handleLogout}>Cerrar Sesión</button>
                        </form>
                    </div>
                </div>
            </nav>
            <div className="container">
                <h1 className="text-center mt-5">Gestor de gastos.</h1>
            </div>
            <div className="row justify-content-center">
                <div className="col-6">
                    <div className="container">
                        <h3 className="text-center mt-5">Movimientos</h3>
                        <div className="d-flex justify-content-end">
                            <button className="btn btn-outline-info" onClick={handleModalMovement}>Agregar Movimiento</button>
                        </div>
                        <div className="d-flex justify-content-center mb-3">
                            <div className="btn-group btn-group-md w-50" role="group" aria-label="Basic example">
                                <button type="button" className="btn btn-outline-danger" onClick={() => setGestion("Gastos")}>Gastos</button>
                                <button type="button" className="btn btn-outline-success" onClick={() => setGestion("Ingresos")}>Ingresos</button>
                            </div>
                        </div>

                        <ul className="list-group shadow-sm">
                            {movimientosFiltrados.length === 0 ? (
                                <li className="list-group-item text-center text-muted py-4">
                                    No hay {gestion.toLowerCase()} registrados.
                                </li>
                            ) : (
                                movimientosFiltrados.map((mov) => (
                                    <MovItem key={mov.MOV_MOVIMIENTO} mov={mov} gestion={gestion} />
                                ))
                            )}
                        </ul>
                    </div>
                </div>
                <div className="col-4">
                    <div className="container">
                        <h3 className="text-center mt-5">Cuentas</h3>
                        <div className="d-flex justify-content-end">
                            <button className="btn btn-outline-info" onClick={() => navigate("/add-account")}>Agregar Cuenta</button>
                        </div>
                        <ul className="list-group shadow-sm">
                            {cuentas.length === 0 ? (
                                <li className="list-group-item text-center text-muted py-4">
                                    No hay cuentas registradas.
                                </li>
                            ) : (
                                cuentas.map((cuenta) => (
                                    <CuentaItem key={cuenta.CTA_CUENTA} cuenta={cuenta} />
                                ))
                            )}
                        </ul>
                    </div>
                </div>
            </div>
            <Modal show={showModalMovement} onHide={handleModalMovement}>
                <Modal.Header closeButton><Modal.Title>Agregar Movimiento</Modal.Title></Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicDescription">
                            <Form.Label>MOV_FECHA</Form.Label>
                            <Form.Control type="date" placeholder="Fecha" />
                        </Form.Group>
                        <Form.Group controlId="formBasicAmount">
                            <Form.Label>MMOV_HORA</Form.Label>
                            <Form.Control type="number" placeholder="Monto" />
                        </Form.Group>
                        <Form.Group controlId="formBasicAmount">
                            <Form.Label>MMOV_HORA</Form.Label>
                            <Form.Control type="number" placeholder="Monto" />
                        </Form.Group>
                        <Form.Group controlId="formBasicAmount">
                            <Form.Label>CUE_CUENTA</Form.Label>
                            <Form.Control type="number" placeholder="Monto" />
                        </Form.Group>
                        <Form.Group controlId="formBasicAmount">
                            <Form.Label>CAT_CATEGORIA</Form.Label>
                            <Form.Control type="number" placeholder="Monto" />
                        </Form.Group>
                        <Form.Group controlId="formBasicAmount">
                            <Form.Label>MOV_MONTO</Form.Label>
                            <Form.Control type="number" placeholder="Monto" />
                        </Form.Group>
                        <Form.Group controlId="formBasicAmount">
                            <Form.Label>MOV_DESCRIPCION</Form.Label>
                            <Form.Control type="text" placeholder="Descripción" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalMovement}>Cerrar</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Dashboard;