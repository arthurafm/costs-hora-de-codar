// Página de projetos

// Importação de hooks
/*
    useLocation = retorna o objeto de localização da URL atual que inclui:
    -pathname = nome da URL
    -search = a string query incluída na URL
    -hash = o resultado do fragmento hash
    -state
    -key
    Se comunica com a página anterior que foi navegada para a atual
*/
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
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react'

import Message from '../layout/Message'
import Container from '../layout/Container'
import Loading from '../layout/Loading';
import LinkButton from '../layout/LinkButton'
import ProjectCard from '../project/ProjectCard';

// Importação de CSS via objeto 'styles'
import styles from './Projects.module.css'

function Projects () {

    // Declaração do estado de array projects
    const [projects, setProjects] = useState([]);
    // Declaração do estado booleano removeLoading
    const [removeLoading, setRemoveLoading] = useState(false);
    // Declaração do estado String projectMessage
    const [projectMessage, setProjectMessage] = useState('');

    // Declaração de função de Location
    const location = useLocation();
    let message = '';

    // Se foi passado um 'state' no 'Location', message é alterado
    if (location.state) {
        message = location.state.message;
    }

    // Efeito que busca um array dentro da rede, altera estados de projects para o array encontrado e removeLoading para true
    useEffect (
        () => {
            // setTimeout = seta um timer que executa uma função após a expiração do timer
            setTimeout (
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
                        fetch('http://localhost:5000/projects', {
                            method: 'GET',
                            headers: {
                                'Content-type': 'application/json',
                            }
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
                        .then((data) => {
                            // Seta o estado projects para o array lido
                            setProjects(data);
                            // Seta o estado removeLoading para true
                            setRemoveLoading(true);
                        })
                        // catch() = caso encontre uma exceção, executa uma função
                        .catch((err) => {console.log(err)})
                    }, 300
            )
        }, []
    )

    function removeProject (id) {
        /*
            fetch() = Busca um recurso dentro da rede, retornando uma Promise que é cumprida quando a reposta está disponível
            Parametros:
            -resource = uma string de um URL do recurso a ser buscado || um objeto Request
            -options = objeto que define configurações do fetch
                -method = qual método é a busca
                -headers = headers da busca
                -body = qualquer corpo utilizado na busca
        */
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
            }
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
        .then(() => {
            // Seta o estado projects para um projects filtrado pelo id
            setProjects(
                projects.filter((project) => {
                    return project.id !== id
                })
            )
            // Seta o estado projectMessage para 'Projeto removido com sucesso!'
            setProjectMessage('Projeto removido com sucesso!')
        })
        // catch() = caso encontre uma exceção, executa uma função
        .catch((err) => {console.log(err)})
    }

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to="/newproject" text="Criar Projeto" />
            </div>
            {
                // Dentro de chaves, pode-se usar Javascript
                // Caso a message não seja vazia, plota-a como uma mensagem ao usuário
                message && <Message type="success" msg={message} />
            }
            {
                // Dentro de chaves, pode-se usar Javascript
                // Caso a projectMessage não seja vazia, plota-a como uma mensagem ao usuário
                projectMessage && <Message type="success" msg={projectMessage} />
            }
            <Container customClass="start">
                {
                    // Dentro de chaves, pode-se usar Javascript
                    // Caso tenha algum elemento no array projects, mapeia <ProjectCards />'s para cada elemento do array
                    projects.length > 0 &&
                    projects.map((project) => {
                        return (
                            <ProjectCard
                                id={project.id}
                                key={project.id}
                                name={project.name}
                                budget={project.budget}
                                category={project.category}
                                handleRemove={removeProject}
                            />
                        )
                    })
                }
                {
                    // Dentro de chaves, pode-se usar Javascript
                    // Caso removeLoading seja falso, plota o Loading
                    !removeLoading &&
                    <Loading />
                }
                {
                    // Dentro de chaves, pode-se usar Javascript
                    // Caso removeLoading seja true e o tamanho do array de projects seja 0, plota a mensagem de 'Nenhum projeto cadastrado'
                    removeLoading && projects.length === 0 && (
                        <p>Não há projetos cadastrados</p>
                    )

                }
            </Container>
        </div>
    )
}

export default Projects;