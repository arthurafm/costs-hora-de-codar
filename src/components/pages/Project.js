// Componente para páginas individuais de projetos

// Importação de hooks
/*
    useParams = retorna uma função que retorna um objeto de valores dados por parâmetros dinâmicos da URL atual que batem com o <Route> path.
    Routes filhas tem de herança os parâmetros das Routes pais.

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

import { v4 as uuidv4 } from 'uuid'

import { useParams } from 'react-router-dom'
import { useState, useEffect} from 'react'

import Container from '../layout/Container';
import Loading from '../layout/Loading';
import ProjectForm from '../project/ProjectForm';
import Message from '../layout/Message';
import ServiceForm from '../service/ServiceForm';
import ServiceCard from '../service/ServiceCard';

// Importação de CSS via objeto 'styles'
import styles from './Project.module.css'

function Project () {

    // Catch do id na URL
    const { id } = useParams();
    // Declaração do estado de array project
    const [project, setProject] = useState([]);
    // Declaração do estado de array services
    const [services, setServices] = useState([]);
    // Declaração de estado booleano showProjectForm
    const [showProjectForm, setShowProjectForm] = useState(false);
    // Declaração do estado de string message
    const [message, setMessage] = useState('');
    // Declaração do estado de string type
    const [type, setType] = useState();
    // Declaração do estado booleano showServiceForm
    const [showServiceForm, setShowServiceForm] = useState(false);

    // Efeito que busca um array dentro da rede, altera estados de projects para o array encontrado e removeLoading para true
    useEffect(() => {
        // setTimeout = seta um timer que executa uma função após a expiração do timer
        setTimeout(() => {
            /*
                fetch() = Busca um recurso dentro da rede, retornando uma Promise que é cumprida quando a reposta está disponível
                Parametros:
                    -resource = uma string de um URL do recurso a ser buscado || um objeto Request
                    -options = objeto que define configurações do fetch
                        -method = qual método é a busca
                        -headers = headers da busca
            */
            fetch(`http://localhost:5000/projects/${id}`, {
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
            .then((data) => {
                // Seta o estado project para o array lido
                setProject(data);
                setServices(data.services);
            })
            // catch() = caso encontre uma exceção, executa uma função
            .catch((err) => {console.log(err)})
        }, 300)
    }, [id]);

    // Função para a edição do post
    function editPost (project) {
        setMessage('');
        if (project.budget < project.cost) {
            setMessage('O orçamento não pode ser menor que o custo do projeto!');
            setType('error');
            return false;
        }
        /*
            fetch() = Busca um recurso dentro da rede, retornando uma Promise que é cumprida quando a reposta está disponível
            Parametros:
                -resource = uma string de um URL do recurso a ser buscado || um objeto Request
                -options = objeto que define configurações do fetch
                    -method = qual método é a busca
                    -headers = headers da busca
        */
        fetch(`http://localhost:5000/projects/${project.id}`,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            // JSON.stringify = transforma um objeto JavaScript para uma string JSON
            body: JSON.stringify(project),
        })
        /*
            then() = Transforma uma Promise em outra depois da conclusão da Promise original
            Parametros:
            -onFulfilled = função que é executada em caso de Promise cumprida
        */
        // json() = Transforma uma Promise em uma Promise em formato de JSON
        .then(resp => resp.json())
        /*
            then() = Transforma uma Promise em outra depois da conclusão da Promise original
            Parametros:
            -onFulfilled = função que é executada em caso de Promise cumprida
        */
        .then((data) => {
            // Seta o estado project para o array lido
            setProject(data);
            // Seta o estado showProjectForm para falso
            setShowProjectForm(false);
            setMessage('Projeto atualizado!');
            setType('success');
        })
        // catch() = caso encontre uma exceção, executa uma função
        .catch(err => console.log(err));
    }

    // Função que cria serviço
    function createService (project) {
        setMessage('');

        const lastService = project.services[project.services.length -1];

        lastService.id = uuidv4();
        const lastServiceCost = lastService.cost;
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost);

        // Se o novo custo for maior que o orçamento
        if (newCost > parseFloat(project.budget)) {
            console.log("Teste");
            setMessage('Orçamento ultrapassado. Verifique o valor do serviço.');
            setType('error');
            project.services.pop();
            return false;
        }

        project.cost = newCost;

        /*
            fetch() = Busca um recurso dentro da rede, retornando uma Promise que é cumprida quando a reposta está disponível
            Parametros:
                -resource = uma string de um URL do recurso a ser buscado || um objeto Request
                -options = objeto que define configurações do fetch
                    -method = qual método é a busca
                    -headers = headers da busca
        */
        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',

            },
            // JSON.stringify = transforma um objeto JavaScript para uma string JSON
            body: JSON.stringify(project),
        }
        )
        /*
            then() = Transforma uma Promise em outra depois da conclusão da Promise original
            Parametros:
            -onFulfilled = função que é executada em caso de Promise cumprida
        */
        // json() = Transforma uma Promise em uma Promise em formato de JSON
        .then(resp => resp.json())
        /*
            then() = Transforma uma Promise em outra depois da conclusão da Promise original
            Parametros:
            -onFulfilled = função que é executada em caso de Promise cumprida
        */
        .then((data) => {
            setShowServiceForm(false);
            setMessage('Serviço criado com sucesso!');
            setType('success');
        })
        // catch() = caso encontre uma exceção, executa uma função
        .catch(err => console.log(err));
    }

    // Função que remove serviços
    function removeService (id, cost) {
        setMessage('');

        // Filtra os serviços pelo id dado como argumento
        const servicesUpdated = project.services.filter(
            (service) => {
                return (service.id !== id);
            }
        )

        // Atualiza projeto
        const projectUpdated = project;
        projectUpdated.services = servicesUpdated;
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost);

        /*
            fetch() = Busca um recurso dentro da rede, retornando uma Promise que é cumprida quando a reposta está disponível
            Parametros:
                -resource = uma string de um URL do recurso a ser buscado || um objeto Request
                -options = objeto que define configurações do fetch
                    -method = qual método é a busca
                    -headers = headers da busca
        */
        fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            // JSON.stringify = transforma um objeto JavaScript para uma string JSON
            body: JSON.stringify(projectUpdated),
        }
        )
        /*
            then() = Transforma uma Promise em outra depois da conclusão da Promise original
            Parametros:
            -onFulfilled = função que é executada em caso de Promise cumprida
        */
        // json() = Transforma uma Promise em uma Promise em formato de JSON
        .then((resp) => resp.json())
        /*
            then() = Transforma uma Promise em outra depois da conclusão da Promise original
            Parametros:
            -onFulfilled = função que é executada em caso de Promise cumprida
        */
        .then((data) => {
            setProject(projectUpdated);
            setServices(servicesUpdated);
            setMessage('Serviço removido com sucesso!');
            setType('success');
        })
        // catch() = caso encontre uma exceção, executa uma função
        .catch(err => console.log(err))

    }

    // Função que inverte o valor de showProjectForm
    function toggleProjectForm () {
        // Seta o estado showProjectForm para o inverso do que era
        setShowProjectForm(!showProjectForm);
    }

    // Função que inverte o valor de showServiceForm
    function toggleServiceForm () {
        // Seta o estado showServiceForm para o inverso do que era
        setShowServiceForm(!showServiceForm);
    }

    return (
        <>
            {
                project.name ?
                (<div className={styles.project_details}>
                    <Container customClass="column">
                        {message !== '' && <Message type={type} msg={message} />}
                        <div className={styles.details_container}>
                            <h1>Projeto: {project.name}</h1>
                            <button className={styles.btn} onClick={toggleProjectForm} >
                                {!showProjectForm ? 'Editar projeto' : 'Fechar'}
                            </button>
                            {
                                !showProjectForm ?
                                (
                                    <div className={styles.project_info}>
                                        <p>
                                            <span>Categoria: </span> {project.category.name}
                                        </p>
                                        <p>
                                            <span>Orçamento Restante: </span> R${project.budget - project.cost}
                                        </p>
                                        <p>
                                            <span>Total Utilizado:</span> R${project.cost}
                                        </p>
                                    </div>
                                )
                                : (
                                    <div className={styles.project_info}>
                                        <ProjectForm handleSubmit={editPost} btnText="Concluir edição" projectData={project} />
                                    </div>
                                )
                            }
                        </div>
                        <div className={styles.service_form_container}>
                            <h2>Adicione um serviço:</h2>
                            <button className={styles.btn} onClick={toggleServiceForm} >
                                {!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
                            </button>
                            <div className={styles.project_info}>
                                {
                                    showServiceForm && (
                                        <ServiceForm
                                            handleSubmit={createService}
                                            btnText='Adicionar serviço'
                                            projectData={project}
                                        />
                                    )
                                }
                            </div>
                        </div>
                        <h2>Serviços</h2>
                        <Container customClass='start'>
                            {
                                services.length > 0 &&
                                    services.map((service) => {
                                        return (
                                            <ServiceCard
                                                id={service.id}
                                                name={service.name}
                                                cost={service.cost}
                                                description={service.description}
                                                key={service.id}
                                                handleRemove={removeService}
                                            />
                                        )
                                    })
                            }
                            {
                                services.length === 0 && (
                                    <p>Não há serviços cadastrados.</p>
                                )
                            }
                        </Container>
                    </Container>
                </div>)
                : (<Loading />)
            }
        </>
    )
}

export default Project;