// Página de contatos

import ContactForm from "../contact/ContactForm";

import styles from './NewProject.module.css'

function Contact () {
    return (
        <div className={styles.newproject_container}>
            <h1>Nos contate</h1>
            <ContactForm btnText="Enviar" />
        </div>
    )
}

export default Contact;