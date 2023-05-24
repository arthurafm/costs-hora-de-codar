// Componente para exibição de mensagens ao usuário

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
import { useState, useEffect } from 'react'

// Importação de CSS via objeto 'styles'
import styles from './Message.module.css'

// Divisão de props em desestruturação de objeto
function Message ({ type, msg }) {

    // Declaração do estado booleano visible
    const [visible, setVisible] = useState(false);

    // Efeito que caso exista mensagem, visible = True por 3 segundos
    useEffect(() => {
        if(!msg) {
            // Seta o estado visible para false
            setVisible(false);
            return;
        }
        // Seta o estado visible para true
        setVisible(true);
        // setTimeout = seta um timer que executa uma função após a expiração do timer
        const timer = setTimeout(() => {
            // Seta o estado visible para false
            setVisible(false)
        }, 3000);

        // clearTimeout = cancela um Timeout previamente estabelecido
        return () => clearTimeout(timer);
    }, [msg]);

    return (
        <>
            {
                //  Dentro de chaves, pode-se usar Javascript
                // Caso visible seja true, plota o componente
                visible && (
                <div className={`${styles.Message} ${styles[type]}`}>{msg}</div>
                )
            }
        </>
    )
}

export default Message;