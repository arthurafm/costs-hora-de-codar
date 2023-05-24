// Componente para input de usuário via drop-box

// Importação de CSS via objeto 'styles'
import styles from './Select.module.css'

// Divisão de props em desestruturação de objeto
function Select ({ text, name, options, handleOnChange, value }) {
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            {/* Se for passado um value, é passado value={value}, caso contrário, passa value='' */}
            <select name={name} id={name} onChange={handleOnChange} value={value || ''}>
                <option>Selecione uma opção</option>
                {
                    //  Dentro de chaves, pode-se usar Javascript
                    //  Mapeia <option />'s para cada elemento do array
                    options.map(
                            (option) => {
                                return (
                                    <option value={option.id} key={option.id}>{option.name}</option>
                                )
                            }
                        )
                }
            </select>
        </div>
    )
}

export default Select;