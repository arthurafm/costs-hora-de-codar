// Componente de input de caixa de texto de tamanho variável

// Importação de CSS via objeto 'styles'
import styles from './Textarea.module.css'

function Textarea ({ id, text, name, placeholder, handleOnChange, value }) {
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <textarea
                id={id}
                onChange={handleOnChange}
                placeholder={placeholder}
                rows={1}
                value={value}
            />
        </div>
    )
}

export default Textarea;