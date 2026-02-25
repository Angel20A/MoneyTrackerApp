import { Modal, Form, Button } from "react-bootstrap";
import api from "../api/api";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const modalMovements = ({ showModalMovement, handleModalMovement, userId, obtenerMovimientos, obtenerCuentas }) => {
    const [cuentas, setCuentas] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [tipoMovimiento, setTipoMovimiento] = useState("");

    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState("");
    const [monto, setMonto] = useState("");
    const [cuenta, setCuenta] = useState("");
    const [categoria, setCategoria] = useState("");
    const [descripcion, setDescripcion] = useState("");

    useEffect(() => {
        const fetchCuentas = async () => {
            try {
                const response = await api.get(`/accounts/${userId}`);
                console.log(response.data);
                setCuentas(response.data);
            } catch (error) {
                console.error("Error al obtener las cuentas:", error);
            }
        };
        fetchCuentas();
    }, [userId]);

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await api.get(`/categories`);
                console.log(response.data);
                setCategorias(response.data);
            } catch (error) {
                console.error("Error al obtener las categorías:", error);
            }
        };
        fetchCategorias();
    }, [userId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!fecha || !hora || !monto || !cuenta || !categoria || !descripcion) {
                Swal.fire("Todos los campos son obligatorios", "", "error");
                return;
            }

            const horaFormateada = hora.length === 5 ? `${hora}:00` : hora;
            console.log(fecha + " " + horaFormateada + " " + monto + " " + cuenta + " " + categoria + " " + descripcion);
            const response = await api.post(`/movements`, {
                fecha: fecha,
                hora: horaFormateada,
                monto: parseFloat(monto),
                cuenta: parseInt(cuenta),
                categoria: parseInt(categoria),
                descripcion: descripcion,
            });
            console.log(response.data);
            if (response.status === 200) {
                Swal.fire("Movimiento agregado exitosamente", "", "success");
                handleModalMovement();
                obtenerMovimientos();
                obtenerCuentas();
            }
        } catch (error) {
            console.error("Error al agregar movimiento:", error.message);
            Swal.fire("Error al agregar movimiento", "", "error");
        }
    };

    const categoriasFiltradas = tipoMovimiento === "" ? [] : categorias.filter((categoria) => categoria.CAT_TIPO_CATEGORIA == tipoMovimiento);
    return (
        <div>
            <Modal show={showModalMovement} onHide={handleModalMovement}>
                <Modal.Header closeButton><Modal.Title>Agregar Movimiento</Modal.Title></Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="date">
                            <Form.Label>Fecha</Form.Label>
                            <Form.Control type="date" placeholder="Fecha" onChange={(e) => setFecha(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="hour">
                            <Form.Label>Hora</Form.Label>
                            <Form.Control type="time" placeholder="Hora" onChange={(e) => setHora(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="amount">
                            <Form.Label>Monto (Q)</Form.Label>
                            <Form.Control type="number" placeholder="Monto" onChange={(e) => setMonto(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="account">
                            <Form.Label>Cuenta</Form.Label>
                            <Form.Select type="number" placeholder="Cuenta" onChange={(e) => setCuenta(e.target.value)}>
                                <option value="" key={0}>Seleccione una cuenta</option>
                                {cuentas.map((cuenta) => (
                                    <option key={cuenta.CUE_CUENTA} value={cuenta.CUE_CUENTA}>
                                        {cuenta.CUE_NOMBRE}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group controlId="movementType">
                            <Form.Label>Tipo de Movimiento</Form.Label>
                            <Form.Select type="number" placeholder="Tipo de Movimiento"
                                onChange={(e) => setTipoMovimiento(e.target.value)}>
                                <option value="">Seleccione un tipo de movimiento</option>
                                <option value="1">Ingreso</option>
                                <option value="0">Egreso</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group controlId="category">
                            <Form.Label>Categoría</Form.Label>
                            <Form.Select type="number" placeholder="Categoría"
                                onChange={(e) => setCategoria(e.target.value)}>
                                <option value="" key={0}>Seleccione una categoría</option>
                                {categoriasFiltradas.map((categoria) => (
                                    <option key={categoria.CAT_CATEGORIA} value={categoria.CAT_CATEGORIA}>
                                        {categoria.CAT_NOMBRE}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group controlId="description">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control type="text" placeholder="Descripción" onChange={(e) => setDescripcion(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="text-center">
                            <Button variant="primary" type="submit" className="mt-3">Agregar Movimiento</Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalMovement}>Cerrar</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default modalMovements;