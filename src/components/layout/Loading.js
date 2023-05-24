// Componente de carregamento de página

import loading from '../../img/loading.svg'

// Importação de CSS via objeto 'styles'
import styles from './Loading.module.css'

function Loading () {
    return (
        <div className={styles.loader_container}>
            <img className={styles.loader} src={loading} alt="Loading" />
        </div>
    )
}

export default Loading;