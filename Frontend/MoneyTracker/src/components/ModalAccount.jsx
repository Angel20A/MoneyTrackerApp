import { Modal, Form, Button } from "react-bootstrap";
import { useState } from "react";
import api from "../api/api";
import Swal from "sweetalert2";

const ModalAccount = ({ showModalAccount, handleModalAccount, userId, obtenerCuentas, setCuentas }) => {
    const [nombre, setNombre] = useState("");
    const [saldoInicial, setSaldoInicial] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!nombre || !saldoInicial) {
                Swal.fire("Todos los campos son obligatorios", "", "error");
                return;
            }

            const response = await api.post(`/accounts`, {
                nombre: nombre,
                saldo: parseFloat(saldoInicial),
                id_usuario: userId
            });
            console.log(response.data);
            if (response.status === 200) {
                Swal.fire("Cuenta agregada exitosamente", "", "success");
                handleModalAccount();
                obtenerCuentas();
            }
        } catch (error) {
            console.error("Error al agregar cuenta:", error.message);
            Swal.fire("Error al agregar cuenta", "", "error");
        }
    };
    return (
        <Modal show={showModalAccount} onHide={handleModalAccount}>
            <Modal.Header closeButton><Modal.Title>Agregar Cuenta</Modal.Title></Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="date">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" placeholder="Nombre" onChange={(e) => setNombre(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="hour">
                        <Form.Label>Saldo Inicial (Q)</Form.Label>
                        <Form.Control type="number" placeholder="Saldo Inicial" onChange={(e) => setSaldoInicial(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="text-center">
                        <Button variant="primary" type="submit" className="mt-3">Agregar Cuenta</Button>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleModalAccount}>Cerrar</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalAccount;