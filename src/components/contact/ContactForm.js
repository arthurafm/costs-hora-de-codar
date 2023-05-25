// Formulário de contato

import Input from '../form/Input';
import SubmitButton from '../form/SubmitButton';
import Textarea from '../form/Textarea';

// Importação de CSS via objeto 'styles'
import styles from '../project/ProjectForm.module.css'

function ContactForm ({ btnText }) {
    return (
        <form className={styles.form}>
            <Input
                type="text"
                text="Seu nome completo"
                name="name"
                placeholder="Digite seu nome"
            />
            <Input
                type="text"
                text="Seu email"
                name="email"
                placeholder="Eg.: exemplo@email.com"
            />
            <Input
                type="text"
                text="Seu número de telefone"
                name="number"
                placeholder="Eg.: 12 123456789"
            />
            <Textarea
                id="review-text"
                text="Mensagem"
                name="message"
                placeholder="Envie seus comentários"
            />
            <SubmitButton text={btnText} />
        </form>
    )
}

export default ContactForm;