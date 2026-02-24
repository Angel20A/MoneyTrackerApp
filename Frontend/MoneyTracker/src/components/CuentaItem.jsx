import { Trash } from 'react-bootstrap-icons';

const CuentaItem = ({ cuenta }) => {
    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            <div>
                <h6 className="my-0">{cuenta.CUE_NOMBRE}</h6>
            </div>
            <div className="d-flex gap-2">
                <span className="badge rounded-pill fs-6 text-bg-info">
                    Q{cuenta.CUE_SALDO}
                </span>
                <button className="btn btn-outline-danger" onClick={() => handleDelete(cuenta.CUE_CUENTA)}>
                    <Trash />
                </button>
            </div>
        </li>
    )
}

export default CuentaItem;
