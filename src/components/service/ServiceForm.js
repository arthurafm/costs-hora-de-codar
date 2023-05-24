// Componente para o formulário de serviços

// Importação de hooks
/*
    useState = permite criar variáveis de estados
    Se declara uma variável de estado através da sintaxe: [<nome-var>, set<nome-var>] = useState(<estado-inicial>) - usando desestruturação de arrays
    Para usar o estado, utiliza-se a variável <nome-var> e para alterar o estado usa-se set<nome-var>(<novo-estado>)
*/
import { useState } from 'react'

import Input from '../form/Input';
import SubmitButton from '../form/SubmitButton';

// Importação de CSS via objeto 'styles'
import styles from '../project/ProjectForm.module.css'

function ServiceForm ({ handleSubmit, btnText, projectData }) {
    
    // Declaração de estado de objeto service
    const [service, setService] = useState();

    // Função de tratamento de evento onSubmit do form
    function submit (e) {
        e.preventDefault();
        projectData.services.push(service);
        handleSubmit(projectData);
    }

    // Função de tratamento de evento onChange dos Inputs
    function handleChange (e) {
        setService({
            ...service,
            [e.target.name]: e.target.value,
        })
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input
                type="text"
                text="Nome do serviço"
                name="name"
                placeholder="Insira o nome do serviço"
                handleOnChange={handleChange}
            />
            <Input
                type="number"
                text="Custo do serviço"
                name="cost"
                placeholder="Insira o valor total"
                handleOnChange={handleChange}
            />
            <Input
                type="text"
                text="Descrição do serviço"
                name="description"
                placeholder="Descreva o serviço"
                handleOnChange={handleChange}
            />
            <SubmitButton text={btnText} />
        </form>
    )
}

export default ServiceForm;