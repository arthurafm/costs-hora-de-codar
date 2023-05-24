// Componente para botões de redirecionamento de página

import { Link } from 'react-router-dom'

// Importação de CSS via objeto 'styles'
import styles from './LinkButton.module.css'

// Divisão de props em desestruturação de objeto
function LinkButton ({ to, text}) {
    return (
        <Link className={styles.btn} to={to}>{text}</Link>
    )
}

export default LinkButton;