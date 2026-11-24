# 14-dwbe-vite-e-react-aula-phr

Material:

https://app.notion.com/p/Cap-tulo-11-CRUD-com-FETCH-API-3d844ced362580228fb0d5623a6d5fef

---

## Comandos

```bash
sudo apt update
```

```bash
sudo apt install -y nodejs
```

```bash
node -v
```

```bash
npm install -g npm@11.19.0
```

```bash
npm -v
```

```bash
npm create vite@latest
```

Ao apresentar a mensagem abaixo, pressione a tecla `y`:

```text
Need to install the following packages:
create-vite@9.3.4
Ok to proceed? (y) 
```

Em seguida, informe o nome do projeto. Exemplo:

```text
react-aula
```

Depois, selecione o framework:

```text 
React
```

Na sequência, selecione a linguagem de programação:

```text
JavaScript
```

Na pergunta seguinte, selecione o linter:

```text
ESLint
```
Na pergunta abaixo, pressione a tecla `<ENTER>`, confirmando o `Yes` para a instalação:

```text
◆  Install with npm and start now?
│  ● Yes / ○ No
```

Depois da instalação, entre na pasta do projeto:

```bash
cd react-aula
```

```bash
npm install
```

```bash
npm run dev
```

```bash
git add . && git commit -m "Exemplo" && git push
```

---

# Exercícios 

1. Explique o significado da sigla CRUD.

---

Usando Node.js, Express, Vite e React crie uma API de produtos.

2. Crie uma função para cadastrar clientes utilizando `POST`.
3. Crie uma função para atualizar clientes utilizando `PUT`.
4. Crie uma função para excluir clientes utilizando `DELETE`.
5. Implemente confirmação antes da exclusão de um produto.
6. Como desafio, implemente atualização automática da lista após cada operação.
7. Implemente uma API que realize o CRUD de uma agência de viagens. Considere as tabelas Cliente, Destino e Reserva:
```text
Cliente(id, nome, email)
Destino(id, nome_destino, pais)
Reserva(id, id_cliente, id_destino, data_partida, data_retorno, valor)
```

---

8. Gere um projeto com operações de CRUD para a API https://dummyjson.com/docs/products.
9. Gere um projeto com operações de CRUD para a API https://jsonplaceholder.typicode.com/photos.