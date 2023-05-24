// Componente para caixas de projetos

import { BsPencil, BsFillTrashFill } from 'react-icons/bs'

import { Link } from 'react-router-dom'

// Importação de CSS via objeto 'styles'
import styles from './ProjectCard.module.css'

// Divisão de props em desestruturação de objeto
function ProjectCard ({ id, name, budget, category, handleRemove }) {

    // Função de tratamento de evento onClick do botão
    const remove = (e) => {
        e.preventDefault()
        handleRemove(id)
    }

    return (
        <div className={styles.project_card}>
            <h4>{name}</h4>
            <p>
                <span>Orçamento:</span> R${budget}
            </p>
            <p className={styles.category_text}>
                <span className={`${styles[category.name.toLowerCase()]}`}></span> {category.name}
            </p>
            <div className={styles.project_card_actions}>
                <Link to={`/project/${id}`}>
                    <BsPencil /> Editar
                </Link>
                <button onClick={remove} >
                    <BsFillTrashFill /> Excluir
                </button>
            </div> 
        </div>
    )
}

export default ProjectCard