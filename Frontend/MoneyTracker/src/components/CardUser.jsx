import { Link } from "react-router-dom";
import Input from "./Input";

const CardUser = ({ children, handle, route, email, setEmail, password, setPassword, title }) => {
    return (
        <div className="card p-5" style={{ width: "100%", maxWidth: "600px" }}>
            <h3 className="text-center mb-4">{title}</h3>
            <form onSubmit={handle}>
                {children}
                <Input
                    type="email"
                    className="form-control"
                    id="floatingInput"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="btn btn-primary w-100 p-3">
                    Ingresar
                </button>
                <p className="text-center mt-3 ">
                    {title === "Iniciar Sesión" ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"} <Link to={route}>{title === "Iniciar Sesión" ? "Registrarse" : "Iniciar Sesión"}</Link>
                </p>
            </form>
        </div>
    )
}

export default CardUser;