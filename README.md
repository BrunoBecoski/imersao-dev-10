<h1 align="center">Imersão DEV 10 - Alura</h1>

</br>
</br>

## Base de Conhecimento
Aplicação para pesquisar sobre linguagens de programação com os dados gerados pelo (Gemini).

<img src=".github/gif-1.gif" alt="Gif 1"/>

### O que ele faz
- Obtêm o pesquisa feita.
- Filtra com os dados do arquivo [data.json](data.json).
  - `"name"`
  - `"tags"`
- Mostra na tela a lista com os resultados.
- Ordena em:
   - Alfabética
   - Criação
       - Crescente
       - Decrescente
- Url com parâmetro da pesquisa ```?search=javascript```.

### Ordem Alfabética (Crescente e Decrescente)
<img src=".github/gif-2.gif" alt="Gif 2" />

### Ordem Criação (Decrescente e Crescente)
<img src=".github/gif-3.gif" alt="Gif 3" />

### Busca com a palavra-chave
<img src=".github/gif-4.gif" alt="Gif 4" />

### Pré-requisitos
- Visual Studio Code.
- Extensão Live Server.

### Como executar
   1. Clone o reposotório do GitHub
      ```js
         git clone https://github.com/BrunoBecoski/imersao-dev-10.git
      ```
   3. Abra no Visual Studio Code
   4. Instale a extensão [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
   1. Clique com o botão direito do mouse no arquivo [index.html](index.html) e em Abrir com Live Server

### Arquivos principais
- [index.html](index.html) — principal arquivo que estrutura a aplicação.
- [scripts.js](scripts.js) — arquivo que contém todas as funcionalidades.
- [styles.css](styles.css) — estilização da aplicação.
- [data.json](data.json) — arquivo de dados que será utilizado na pesquisa gerados pelo (Gemini).

</br>
</br>

## Node

### Gerador de dado da Base de Conhecimento (Gemini)

Cria e expande automaticamente uma base de conhecimento em JSON adicionando, em cada execução, 50 novas entradas únicas sobre tecnologias (linguagens, frameworks, ferramentas, bancos de dados, metodologias). A lógica usa a API Gemini para gerar conteúdo estruturado e valida/mescla o resultado com o arquivo local `data.json`.

### O que ele faz
- Gera exatamente 50 novas entradas em formato JSON.
- Evita repetir nomes já presentes na base.
- Faz validação básica da resposta (garante que seja um ARRAY com 50 objetos).
- Realiza tentativas com backoff exponencial em caso de falhas.
- Atualiza (sobrescreve) o arquivo `data.json` com a base combinada.

### Pré-requisitos
- Node.js instalado (v16+ recomendado).
- Chave da Gemini API.

### Como executar
1. Entre na pasta node
   ```js
     cd node
   ```
   
1. Instale dependências:
   ```js
     npm install
   ```

3. Renomeie o arquivo `.env.example` para `.env` e preenchar o campo:
   GEMINI_API_KEY = SUA_CHAVE_AQUI

4. Execute:
   ```js
     npm start
   ```

### Onde ajustar comportamento
- Para alterar a quantidade gerada, edite a constante `TOTAL_ITEMS` em [generator.js](node/generator.js) (`TOTAL_ITEMS`).
- Função responsável pela geração: [`generateNewKnowledge`](node/generator.js).
- Fluxo principal: [`main`](node/generator.js).

### Arquivos principais
- [generator.js](node/generator.js) — script principal que chama a API e atualiza a base.
- [data.json](node/data.json) — arquivo de dados que será atualizado.
- [package.json](node/package.json) — configuração do projeto e script de start.
- Crie [.env](node/.env.example) na raiz com a variável GEMINI_API_KEY.

### Formato do [data.json](data.json)
  ```json
    [
      {
        "name": "",
        "year": "",
        "description": "",
        "link": "",
        "tags": [ "", "", "", "" ]
      }
    ]
  ```
