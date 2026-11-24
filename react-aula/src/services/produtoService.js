const url = "https://fakestoreapi.com/products";

export async function listarProdutos() {
    const resposta = await fetch(url);

    if (!resposta.ok)
        throw new Error("Erro ao buscar produtos.");

    return await resposta.json();
}

export async function cadastrarProduto(produto) {
    const resposta = await fetch(url, {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(produto)
    });

    if (!resposta.ok)
        throw new Error("Erro ao cadastrar produto.");

    return await resposta.json();
}

export async function atualizarProduto(id, produto) {
    const resposta = await fetch(`${url}/${id}`, {
        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(produto)
    });

    if (!resposta.ok)
        throw new Error("Erro ao atualizar produto.");

    return await resposta.json();
}

export async function excluirProduto(id) {
    const resposta = await fetch(`${url}/${id}`, {
        method: "DELETE"
    });

    if (!resposta.ok)
        throw new Error("Erro ao excluir produto.");
}