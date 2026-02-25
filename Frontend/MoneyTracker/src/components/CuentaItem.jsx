import { Trash } from 'react-bootstrap-icons';
import api from "../api/api";
import Swal from "sweetalert2";

const CuentaItem = ({ cuentas, obtenerCuentas, obtenerMovimientos }) => {
    //const [cuentas, setCuentas] = useState([]);
    console.log(cuentas);
    const handleDelete = async (idCuenta) => {
        try {
            const response = await api.delete(`/accounts/${idCuenta}`);
            console.log(response.data);
            Swal.fire("Cuenta eliminada correctamente", "", "success");
            obtenerCuentas();
            obtenerMovimientos();
        } catch (error) {
            console.error("Error eliminando cuenta:", error);
            Swal.fire("Error al eliminar cuenta", "", "error");
        }
    }
    return (
        cuentas.map((cuenta) => (
            <li className="list-group-item d-flex justify-content-between align-items-center" key={cuenta.CUE_CUENTA}>
                <div>
                    <h6 className="my-0">{cuenta.CUE_NOMBRE}</h6>
                </div>
                <div className="d-flex gap-2">
                    <span className="badge rounded-pill fs-6 text-bg-info">
                        Q{cuenta.CUE_SALDO}
                    </span>
                    <button className="btn p-0 border-0 bg-transparent text-danger shadow-none" onClick={() => handleDelete(cuenta.CUE_CUENTA)}>
                        <Trash />
                    </button>
                </div>
            </li>
        ))
    )
}

export default CuentaItem;
