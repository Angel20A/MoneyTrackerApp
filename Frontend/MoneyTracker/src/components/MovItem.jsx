import api from "../api/api";
import { Trash } from 'react-bootstrap-icons';
import Swal from "sweetalert2";

const MovItem = ({ mov, gestion, obtenerMovimientos, obtenerCuentas }) => {
    const deleteMovement = async (id) => {
        try {
            await api.delete(`/movements/${id}`);
            Swal.fire("Movimiento eliminado correctamente", "", "success");
            obtenerMovimientos();
            obtenerCuentas();
        } catch (error) {
            console.error("Error eliminando movimiento:", error);
            Swal.fire("Error al eliminar movimiento", "", "error");
        }
    }
    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            <div>
                <h6 className="my-0">{mov.MOV_DESCRIPCION}</h6>
                <small className="text-muted">{mov.MOV_FECHA.split("T")[0]} {mov.MOV_HORA.split("T")[1].split(".")[0]}</small>
            </div>
            <div className="d-flex gap-2">
                <span className={`badge rounded-pill fs-6 ${gestion === 'Gastos' ? 'text-bg-danger' : 'text-bg-success'}`}>
                    Q{mov.MOV_MONTO}
                </span>
                <a className="btn p-0 border-0 bg-transparent text-danger shadow-none" onClick={() => deleteMovement(mov.MOV_MOVIMIENTO)}><Trash /></a>
            </div>

        </li>
    )
}

export default MovItem;