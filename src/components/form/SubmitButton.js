// Componente para botão de envio de input de usuário

// Importação de CSS via objeto 'styles'
import styles from './SubmitButton.module.css'

// Divisão de props em desestruturação de objeto
function SubmitButton ({ text }) {
    return (
        <div>
            <button className={styles.btn}>{text}</button>
        </div>
    )
}

export default SubmitButton;