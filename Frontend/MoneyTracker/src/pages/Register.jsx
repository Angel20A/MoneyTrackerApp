import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";
import bgImage from "../assets/background.jpg";
import Swal from "sweetalert2";
import CardUser from "../components/CardUser";
import Input from "../components/Input";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const route = "/login";

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        console.log("Register submitted:", { email, password });
        try {
            if (!email || !password || !name || !lastName) {
                Swal.fire({
                    icon: 'error',
                    title: '¡Oops!',
                    text: 'Todos los campos son obligatorios'
                });
                return;
            }
            const response = await api.post("/register", { nombre: name, apellido: lastName, email, password });
            console.log("Register response:", response.data);
            navigate(route);
        } catch (error) {
            console.error("Register error:", error);
            const mensaje = error.response?.data?.message || "Error de conexión";
            Swal.fire({
                icon: 'error',
                title: '¡Oops!',
                text: mensaje
            });
        }
    };

    return (
        <div style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center", height: "100vh", backgroundRepeat: "no-repeat" }}>
            <div className="container d-flex justify-content-center align-items-center min-vh-100">
                <CardUser handle={handleRegister} route={route} email={email} setEmail={setEmail} password={password} setPassword={setPassword} title="Registrarse">
                    <Input type="text" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} required />
                    <Input type="text" placeholder="Apellido" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                </CardUser>
            </div>
        </div>
    );
}

export default Register;