// Componente do forms para o post de Projetos agregando funções de input com o usuário

// Importação de hooks
/*
    useState = permite criar variáveis de estados
    Se declara uma variável de estado através da sintaxe: [<nome-var>, set<nome-var>] = useState(<estado-inicial>) - usando desestruturação de arrays
    Para usar o estado, utiliza-se a variável <nome-var> e para alterar o estado usa-se set<nome-var>(<novo-estado>)
*/
/*
    useEffect = permite sincronizar componentes com sistemas externos
    Os parâmetros da função são:
    -setup: função de alta-ordem com a lógica do efeito
    -dependencies: lista de todos os valores reativos referenciados dentro de setup. Inclui props, estados, variáveis e funções declarados dentro do corpo do componente.
    Se omitido, o efeito vai rodar novamente após cada re-renderização do componente
*/
import { useState, useEffect } from 'react';  

import Input from '../form/Input';
import Select from '../form/Select';
import SubmitButton from '../form/SubmitButton';

// Importação de CSS via objeto 'styles'
import styles from './ProjectForm.module.css'

// Divisão de props em desestruturação de objeto
function ProjectForm ({ handleSubmit, btnText, projectData }) {

    // Declaração do estado de array categories
    const [categories, setCategories] = useState([]);
    // Declaração do estado de objeto project
    const [project, setProject] = useState(projectData || {});

    // Efeito que lê as categorias e as armazena em categories
    useEffect(
        () => {
            /*
                fetch() = Busca um recurso dentro da rede, retornando uma Promise que é cumprida quando a reposta está disponível
                Parametros:
                -resource = uma string de um URL do recurso a ser buscado || um objeto Request
                -options = objeto que define configurações do fetch
                    -method = qual método é a busca
                    -headers = headers da busca
                    -body = qualquer corpo utilizado na busca
            */
            fetch('http://localhost:5000/categories', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            /*
                then() = Transforma uma Promise em outra depois da conclusão da Promise original
                Parametros:
                -onFulfilled = função que é executada em caso de Promise cumprida
            */
            // json() = Transforma uma Promise em uma Promise em formato de JSON
            .then((resp) => {return resp.json()})
            /*
                then() = Transforma uma Promise em outra depois da conclusão da Promise original
                Parametros:
                -onFulfilled = função que é executada em caso de Promise cumprida
            */
            // Seta o estado categories para o array lido
            .then((data) => {setCategories(data)})
            // catch() = caso encontre uma exceção, executa uma função
            .catch((err) => {console.log(err)})
        }, []
    );

    // Função de tratamento de evento onSubmit do form
    const submit = (e) => {
        e.preventDefault();
        handleSubmit(project);
    };

    // Função de tratamento de evento onChange dos Inputs
    function handleChange(e) {
        // Seta o estado project para uma ampliação do objeto original com um novo atributo
        setProject({
            ...project,
            [e.target.name]: e.target.value,
        });
    }

    // Função de tratamento de evento onChange do Select
    function handleCategory(e) {
        // Seta o estado project para uma ampliação do objeto original com um novo atributo
        setProject({
            ...project,
            category: {
                id: e.target.value,
                name: e.target.options[e.target.selectedIndex].text,
            },
        });
    }
    
    return (
        <form onSubmit={submit} className={styles.form}>
            <Input
            type='text'
            text='Nome do projeto'
            name='name'
            placeholder='Insira o nome do projeto'
            handleOnChange={handleChange}
            value={project.name ? project.name : ''} />
            <Input
            type='number'
            text='Orçamento do projeto'
            name='budget'
            placeholder='Insira o orçamento total'
            handleOnChange={handleChange}
            value={project.budget ? project.budget : ''} />
            <Select
            name='category_id'
            text='Selecione a categoria'
            options={categories}
            handleOnChange={handleCategory}
            value={project.category ? project.category.id : ''} />
            <SubmitButton text={btnText} />
        </form>
    )
}

export default ProjectForm;