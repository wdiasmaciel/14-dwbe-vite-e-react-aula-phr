export default function CardProduto({
    nome,
    preco,
    descricao,
    categoria,
    imagem,
}) {
    return (
        <article className="card-produto">
            <img
                className="card-produto-imagem"
                src={imagem}
                alt={nome}
            />

            <div className="card-produto-conteudo">
                <span className="card-produto-categoria">{categoria}</span>
                <h3>{nome}</h3>
                <p className="card-produto-descricao">{descricao}</p>
                <strong className="card-produto-preco">
                    R$ {Number(preco).toFixed(2)}
                </strong>
            </div>
        </article>
    );
}