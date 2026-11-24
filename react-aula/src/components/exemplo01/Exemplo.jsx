import { useEffect, useState } from 'react';
import CardProduto from '../card/CardProduto.jsx';
import Formulario from '../formulario/Formulario.jsx';
import {
    cadastrarProduto,
    listarProdutos,
    atualizarProduto,
    excluirProduto,
} from '../../services/produtoService.js';
import '../../styles/estilo.css';

export default function Exemplo01({ voltar }) {
    const [produtos, setProdutos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erroCarregamento, setErroCarregamento] = useState('');
    const [erroExclusao, setErroExclusao] = useState('');
    const [produtoEmEdicao, setProdutoEmEdicao] = useState(null);

    async function carregarProdutos(ativo) {
        try {
            if (ativo) setCarregando(true);

            const resultado = await listarProdutos();

            if (ativo) setProdutos(resultado);
        } catch (erro) {
            if (ativo) {
                setErroCarregamento(erro instanceof Error
                    ? erro.message
                    : 'Não foi possível carregar os produtos.');
            }
        } finally {
            if (ativo) setCarregando(false);
        }
    }

    async function salvarProduto(dados) {
        if (produtoEmEdicao) {
            const atualizado = await atualizarProduto(produtoEmEdicao.id, dados);

            setProdutos((atuais) => atuais.map((produto) => (
                produto.id === produtoEmEdicao.id
                    ? { ...produto, ...dados, ...atualizado, id: produtoEmEdicao.id }
                    : produto
            )));
            
            setProdutoEmEdicao(null);
            
            return;
        }

        const criado = await cadastrarProduto(dados);

        setProdutos((atuais) => [{ ...dados, ...criado }, ...atuais]);
    }

    async function removerProduto(id) {
        if (!window.confirm('Deseja realmente excluir este produto?')) return;

        setErroExclusao('');
        
        try {
            await excluirProduto(id);

            setProdutos((atuais) => atuais.filter((produto) => produto.id !== id));
            
            if (produtoEmEdicao?.id === id) setProdutoEmEdicao(null);
        } catch (erro) {
            setErroExclusao(erro instanceof Error
                ? erro.message
                : 'Não foi possível excluir o produto.');
        }
    }

    useEffect(() => {
        let ativo = true;
        carregarProdutos();

        return () => {
            ativo = false;
        };
    }, []);

    return (
        <main className="pagina-produtos">
            <header className="cabecalho-produtos">
                <div>
                    <h1>Produtos</h1>
                    <p>Consulte e gerencie os produtos da API.</p>
                </div>
                <button className="botao botao-secundario" type="button" onClick={voltar}>
                    Voltar
                </button>
            </header>

            <Formulario
                key={produtoEmEdicao ? `editar-${produtoEmEdicao.id}` : 'novo'}
                produto={produtoEmEdicao}
                onSalvar={salvarProduto}
                onCancelar={() => setProdutoEmEdicao(null)}
            />

            <section className="secao-produtos" aria-labelledby="titulo-lista-produtos">
                <h2 id="titulo-lista-produtos">Lista de produtos</h2>
                {erroExclusao && <p className="mensagem-erro" role="alert">{erroExclusao}</p>}
                {carregando && <p>Carregando produtos...</p>}
                {erroCarregamento && (
                    <p className="mensagem-erro" role="alert">{erroCarregamento}</p>
                )}
                {!carregando && !erroCarregamento && produtos.length === 0 && (
                    <p>Nenhum produto encontrado.</p>
                )}
                <div className="lista-produtos">
                    {produtos.map((produto) => (
                        <div className="item-produto" key={produto.id}>
                            <CardProduto
                                nome={produto.title}
                                preco={produto.price}
                                descricao={produto.description}
                                categoria={produto.category}
                                imagem={produto.image}
                            />
                            <div className="acoes-produto">
                                <button
                                    className="botao"
                                    type="button"
                                    onClick={() => setProdutoEmEdicao(produto)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="botao botao-perigo"
                                    type="button"
                                    onClick={() => removerProduto(produto.id)}
                                >
                                    Excluir
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}