// Página de adicionar um novo projeto

// Importação de hooks
/*
    useNavigate = retorna uma função que permite navegar programaticamente
*/
import { Navigate, useNavigate } from 'react-router-dom';

import ProjectForm from '../project/ProjectForm';

// Importação de CSS via objeto 'styles'
import styles from './NewProject.module.css'

function NewProject () {

    // Declaração de uma função de navegação
    const navigate = useNavigate();

    function createPost(project) {
        project.cost = 0;
        project.services = [];

        /*
            fetch() = Busca um recurso dentro da rede, retornando uma Promise que é cumprida quando a reposta está disponível
            Parametros:
            -resource = uma string de um URL do recurso a ser buscado || um objeto Request
            -options = objeto que define configurações do fetch
                -method = qual método é a busca
                -headers = headers da busca
                -body = qualquer corpo utilizado na busca
        */
        fetch("http://localhost:5000/projects", {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(project),
        })
        /*
            then() = Transforma uma Promise em outra depois da conclusão da Promise original
            Parametros:
            -onFulfilled = função que é executada em caso de Promise cumprida
        */ 
        .then(
            (resp) => {
                // json() = Transforma uma Promise em uma Promise em formato de JSON
                return (resp.json());
            }
        )
        /*
            then() = Transforma uma Promise em outra depois da conclusão da Promise original
            Parametros:
            -onFulfilled = função que é executada em caso de Promise cumprida
        */ 
        .then(
            (data) => {
                // Navega para o URL dado e passa parâmetros pra próxima rota
                navigate('/projects', {state: {message: 'Projeto criado com sucesso!'}})
            }
        )
        // catch() = caso encontre uma exceção, executa uma função
        .catch(
            (err) => {
                console.log(err);
            }
        )
    }

    return (
        <div className={styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjectForm handleSubmit={createPost} btnText='Criar Projeto' />
        </div>
    )
}

export default NewProject;