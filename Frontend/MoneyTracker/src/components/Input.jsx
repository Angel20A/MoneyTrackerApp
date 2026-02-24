const Input = ({ type, value, onChange, placeholder, name }) => {
    return (
        <div className="form-floating mb-3">
            <input type={type} className="form-control" id={name} placeholder={placeholder} value={value} onChange={onChange} />
            <label htmlFor={name}>{placeholder}</label>
        </div>
    )
}

export default Input;