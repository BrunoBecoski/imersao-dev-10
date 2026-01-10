<h1 align="center">Imersão DEV 10 - Alura</h1>

<p align="center">Projeto para pesquisar sobre linguagens de programação</p>

<img src=".github/gif-1.gif" alt="Gif 1"/>

<h2>Tecnologias</h2>
<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
</ul>

<h3>Ordem Alfabética</h3>
<img src=".github/gif-2.gif" alt="Gif 2" />

<h3>Ordem de Criação</h3>
<img src=".github/gif-3.gif" alt="Gif 3" />

<h3>Pesquisar com a palavra-chave</h3>
<img src=".github/gif-4.gif" alt="Gif 4" />


<h1>Node</h1>

<h2>Gerador de Base de Conhecimento (Gemini)</h2>

Descrição curta
Cria e expande automaticamente uma base de conhecimento em JSON adicionando, em cada execução, 50 novas entradas únicas sobre tecnologias (linguagens, frameworks, ferramentas, bancos de dados, metodologias). A lógica usa a API Gemini para gerar conteúdo estruturado e valida/mescla o resultado com o arquivo local `data.json`.

O que ele faz (resumido)
- Gera exatamente 50 novas entradas em formato JSON.
- Evita repetir nomes já presentes na base.
- Faz validação básica da resposta (garante que seja um ARRAY com 50 objetos).
- Realiza tentativas com backoff exponencial em caso de falhas.
- Atualiza (sobrescreve) o arquivo `data.json` com a base combinada.

Pré-requisitos
- Node.js instalado (v16+ recomendado).
- Chave da Gemini API.

Como executar (resumido)
1. Instale dependências:
   ```js
   npm install
   ```

3. Crie um arquivo `.env` na raiz com:
   GEMINI_API_KEY="SUA_CHAVE_AQUI"

4. Execute:
   ```js
   npm start
   ```

O que esperar
- Ao finalizar, o arquivo `data.json` será atualizado com as entradas antigas + 50 novas geradas.
- Logs no console informam sucesso, número de itens e possíveis erros.

Onde ajustar comportamento
- Para alterar a quantidade gerada, edite a constante `TOTAL_ITEMS` em [generator.js](generator.js) (`TOTAL_ITEMS`).
- Função responsável pela geração: [`generateNewKnowledge`](generator.js).
- Fluxo principal: [`main`](generator.js).

Arquivos principais
- [generator.js](generator.js) — script principal que chama a API e atualiza a base.
- [data.json](data.json) — arquivo de dados que será atualizado.
- [package.json](package.json) — configuração do projeto e script de start.
- Crie [.env](.env) na raiz com a variável GEMINI_API_KEY.

Avisos rápidos
- O arquivo `data.json` será sobrescrito ao final do processo.
- Verifique limites e custos da API Gemini antes de executar em escala.
