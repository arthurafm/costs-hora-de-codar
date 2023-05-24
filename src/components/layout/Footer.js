// Componente para o rodapé da página

import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'

// Importação de CSS via objeto 'styles'
import styles from './Footer.module.css'

function Footer () {
    return (
        <footer className={styles.footer}>
            <ul className={styles.social_list}>
                <li><FaFacebook /></li>
                <li><FaInstagram /></li>
                <li><FaLinkedin /></li>
            </ul>
            <p className={styles.copyright}><span>Costs</span> &copy; 2023</p>
        </footer>
    )
}

export default Footer;