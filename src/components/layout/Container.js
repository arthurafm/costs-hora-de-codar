// Componente para caixas containeres

// Importação de CSS via objeto 'styles'
import styles from './Container.module.css'

function Container (props) {
    return (
        <div className={`${styles.container} ${styles[props.customClass]}`}>
            {
                // Passa os elementos filhos definidos dentro do componente <Container>
                props.children
            }
        </div>
    )
}

export default Container;