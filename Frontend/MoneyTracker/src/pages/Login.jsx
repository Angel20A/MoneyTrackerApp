import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";
import bgImage from "../assets/background.jpg";
import Swal from "sweetalert2";
import CardUser from "../components/CardUser";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const route = "/register";

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        //console.log("Login submitted:", { email, password });
        try {
            if (!email || !password) {
                Swal.fire({
                    icon: 'error',
                    title: '¡Oops!',
                    text: 'Todos los campos son obligatorios'
                });
                return;
            }
            const response = await api.post("/login", { email, password });
            console.log("Login response:", response.data);
            localStorage.setItem('usuario', JSON.stringify(response.data));
            navigate("/dashboard");
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
                <CardUser handle={handleLogin} route={route} email={email} setEmail={setEmail} password={password} setPassword={setPassword} title="Iniciar Sesión" />
            </div>
        </div>
    );
};

export default Login;