import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";
import bgImage from "../assets/background.jpg";
import Swal from "sweetalert2";
import CardUser from "../components/CardUser";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const route = "/login";

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        console.log("Login submitted:", { email, password });
        try {
            const response = await api.post("/register", { email, password });
            console.log("Login response:", response.data);
            navigate(route);
        } catch (error) {
            console.error("Login error:", error);
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
                <CardUser handle={handleRegister} route={route} email={email} setEmail={setEmail} password={password} setPassword={setPassword} title="Registrarse" />
            </div>
        </div>
    );
}

export default Register;