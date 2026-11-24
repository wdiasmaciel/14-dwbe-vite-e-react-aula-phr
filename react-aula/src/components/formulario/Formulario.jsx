import { useState } from 'react';

const camposIniciais = {
    title: '',
    price: '',
    description: '',
    category: '',
    image: '',
};

export default function Formulario({ produto, onSalvar, onCancelar }) {
    /*
     * Essa instrução cria o estado "campos" com useState:
     * 1. "campos" guarda os valores atuais do formulário.
     * 2. "setCampos" é a função para atualizá-los.
     * A função passada a "useState" é executada apenas na inicialização do componente.
     * O objeto inicial combina os valores nesta ordem:
     * 1. ...camposIniciais: valores padrão dos campos (strings vazios).
     * 2. ...produto: quando existe, os dados do produto substituem os padrões 
     *                correspondentes.
     * 3. price: é definido por último, então sempre prevalece. Se houver produto, o 
     *           preço vira texto com String(produto.price). Caso contrário, começa 
     *           como '' (string vazio).
     * Isso ajuda a preencher o formulário com os dados de um produto para edição ou 
     * deixá-lo vazio para um novo cadastro.
     */
    const [campos, setCampos] = useState(() => ({
        ...camposIniciais,
        ...produto,
        price: produto ? String(produto.price) : '',
    }));
    const [salvando, setSalvando] = useState(false);
    const [erro, setErro] = useState('');

    function atualizarCampo(evento) {
        const { name, value } = evento.target;
        setCampos((atuais) => ({ ...atuais, [name]: value }));
    }

    async function salvar(evento) {
        evento.preventDefault();
        setSalvando(true);
        setErro('');

        try {
            await onSalvar({ ...campos, price: Number(campos.price) });
        } catch (erroSalvamento) {
            setErro(erroSalvamento instanceof Error
                ? erroSalvamento.message
                : 'Não foi possível salvar o produto.');
        } finally {
            setSalvando(false);
        }
    }

    return (
        <form className="formulario-produto" onSubmit={salvar}>
            <h3>{produto ? 'Editar produto' : 'Cadastrar produto'}</h3>

            <label>
                Nome
                <input
                    name="title"
                    value={campos.title}
                    onChange={atualizarCampo}
                    required
                />
            </label>

            <label>
                Categoria
                <input
                    name="category"
                    value={campos.category}
                    onChange={atualizarCampo}
                    required
                />
            </label>

            <label>
                Preço
                <input
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={campos.price}
                    onChange={atualizarCampo}
                    required
                />
            </label>

            <label>
                Descrição
                <textarea
                    name="description"
                    value={campos.description}
                    onChange={atualizarCampo}
                    required
                />
            </label>

            <label>
                URL da imagem
                <input
                    name="image"
                    type="url"
                    value={campos.image}
                    onChange={atualizarCampo}
                    required
                />
            </label>

            {erro && <p className="mensagem-erro" role="alert">{erro}</p>}

            <div className="acoes-formulario">
                <button className="botao" type="submit" disabled={salvando}>
                    {salvando ? 'Salvando...' : produto ? 'Atualizar' : 'Cadastrar'}
                </button>
                {produto && (
                    <button
                        className="botao botao-secundario"
                        type="button"
                        onClick={onCancelar}
                        disabled={salvando}
                    >
                        Cancelar
                    </button>
                )}
            </div>
        </form>
    );
}