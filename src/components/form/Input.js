// Componente de input de usuário via caixa de texto

// Importação de CSS via objeto 'styles'
import styles from './Input.module.css'

// Divisão de props em desestruturação de objeto
function Input ({ type, text, name, placeholder, handleOnChange, value }) {
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <input type={type} name={name} id={name} placeholder={placeholder} onChange={handleOnChange} value={value} min='0' />
        </div>
    )
}

export default Input;