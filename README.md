# Prime Scent

E-commerce acadêmico de perfumes desenvolvido para a disciplina de Programação Web.

O sistema permite pesquisar perfumes, filtrar produtos, visualizar detalhes, adicionar itens ao carrinho, aplicar cupom de desconto e calcular o valor final da compra utilizando dados atualizados do banco de dados.

## Funcionalidades

* Página inicial com produtos em destaque
* Pesquisa de perfumes por texto
* Filtro por categoria masculina e feminina
* Página de detalhes do produto
* Carrinho persistente utilizando LocalStorage
* Alteração da quantidade dos produtos
* Remoção e limpeza do carrinho
* Cálculo de subtotal, frete, desconto e total
* Cupom de desconto
* Cadastro de produtos com autenticação
* Exclusão de produtos com autenticação
* Validação de dados e tratamento de erros
* Documentação e testes da API com Swagger

## Tecnologias utilizadas

### Front-end

* HTML5
* CSS3
* JavaScript
* Fetch API
* LocalStorage

### Back-end

* Node.js
* Express
* MySQL
* mysql2
* dotenv
* CORS
* Swagger UI Express

## Estrutura do projeto

```
Prime-Scent/
├── database/
│   ├── db.js
│   └── schema.sql
├── frontend/
│   ├── assets/
│   ├── css/
│   ├── js/
│   ├── index.html
│   ├── busca.html
│   ├── produto.html
│   └── carrinho.html
├── middlewares/
│   └── basicAuth.js
├── .env.example
├── .gitignore
├── app.js
├── openapi.json
├── package.json
└── README.md
```

## Pré-requisitos

Para executar o projeto, é necessário ter instalado:

* Node.js
* npm
* MySQL Server
* MySQL Workbench ou outro cliente MySQL
* Visual Studio Code
* Extensão Live Server, recomendada para abrir o front-end

## Instalação

### 1. Instalar as dependências

Abra o terminal na pasta raiz do projeto e execute:

```
npm install
```

### 2. Configurar as variáveis de ambiente

Crie uma cópia do arquivo `.env.example` e renomeie a cópia para `.env`.

Exemplo:

```
PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=sua_senha_mysql
DB_NAME=prime_scent

BASIC_AUTH_USER=admin
BASIC_AUTH_PASS=sua_senha_de_autenticacao
```

O arquivo `.env` contém informações privadas e não deve ser enviado ao GitHub.

## Configuração do banco de dados

O arquivo `database/schema.sql` contém:

* criação do banco `prime_scent`;
* criação da tabela `products`;
* estrutura completa dos produtos;
* produtos utilizados pela aplicação.

Para importar pelo MySQL Workbench:

1. Abra uma conexão com o MySQL.
2. Acesse `Server`.
3. Escolha `Data Import`.
4. Selecione `Import from Self-Contained File`.
5. Escolha o arquivo `database/schema.sql`.
6. Inicie a importação.

Também é possível abrir o arquivo `schema.sql` no editor SQL do Workbench e executar todo o conteúdo.

## Executando o back-end

Na pasta raiz do projeto, execute:

```
npm start
```

O terminal deverá informar:

```
Servidor rodando na porta 3000
Swagger disponível em http://localhost:3000/api-docs/
```

A API ficará disponível em:

```
http://localhost:3000
```

## Executando o front-end

O Express é responsável pela API, enquanto o front-end é formado por arquivos HTML, CSS e JavaScript estáticos.

Para abrir o site:

1. Abra a pasta do projeto no Visual Studio Code.
2. Entre na pasta `frontend`.
3. Clique com o botão direito em `index.html`.
4. Escolha `Open with Live Server`.

O servidor da API deve permanecer ligado enquanto o front-end estiver sendo utilizado.

## Documentação Swagger

Com o servidor iniciado, abra:

```
http://localhost:3000/api-docs/
```

O Swagger permite visualizar e testar as rotas da API diretamente pelo navegador.

Para testar as rotas protegidas:

1. Clique no botão `Authorize`.
2. Informe os valores definidos em `BASIC_AUTH_USER` e `BASIC_AUTH_PASS`.
3. Confirme a autenticação.
4. Execute a rota desejada.

Atenção: as rotas `POST /products` e `DELETE /product/{id}` modificam o banco de dados.

## Rotas da API

| Método | Rota           | Descrição                          | Autenticação |
| ------ | -------------- | ---------------------------------- | ------------ |
| GET    | `/health`      | Verifica se a API está funcionando | Não          |
| GET    | `/search`      | Pesquisa, filtra e lista produtos  | Não          |
| GET    | `/product/:id` | Retorna os detalhes de um produto  | Não          |
| POST   | `/products`    | Cadastra um produto                | Basic Auth   |
| DELETE | `/product/:id` | Exclui um produto                  | Basic Auth   |
| POST   | `/cart`        | Valida e calcula o carrinho        | Não          |

## Pesquisa e paginação

A rota de pesquisa aceita os seguintes parâmetros:

* `query`: texto pesquisado;
* `cat`: categoria do produto;
* `page`: número da página;
* `limit`: quantidade de produtos por página.

Exemplo:

```
/search?query=Dior&cat=masculino&page=1&limit=8
```

Quando não são informados, os valores padrão são:

* página: 1;
* limite: 8 produtos.

O limite máximo aceito é de 50 produtos por página.

## Carrinho

Os itens do carrinho são armazenados no navegador utilizando LocalStorage.

A chave utilizada é:

```
primeScentCart
```

O LocalStorage guarda somente:

* ID do produto;
* quantidade selecionada.

Ao calcular o carrinho, o front-end envia esses dados para a rota `POST /cart`.

O back-end consulta novamente o banco de dados, garantindo que nomes, imagens e preços utilizados no cálculo sejam atuais.

## Regras de cálculo

### Frete

* Compras com subtotal igual ou superior a R$ 200,00 possuem frete grátis.
* Compras abaixo de R$ 200,00 possuem frete de R$ 25,00.

### Cupom

O cupom disponível é:

```
CAULFIELD10
```

O cupom concede 10% de desconto sobre o subtotal dos produtos.

O desconto somente é aplicado depois que o usuário informa o cupom no carrinho.

## Validações e tratamento de erros

A API possui validações para:

* IDs inválidos;
* páginas e limites inválidos;
* campos obrigatórios;
* preços e pesos inválidos;
* carrinho vazio;
* produtos inexistentes;
* quantidades inválidas;
* cupom enviado em formato incorreto;
* JSON inválido;
* autenticação ausente ou incorreta;
* rotas inexistentes.

Os principais códigos HTTP utilizados são:

* `200`: requisição realizada com sucesso;
* `201`: produto criado com sucesso;
* `400`: dados inválidos;
* `401`: autenticação ausente ou incorreta;
* `404`: produto ou rota não encontrado;
* `500`: erro interno do servidor.

## Segurança

As credenciais do banco de dados e da autenticação são armazenadas no arquivo `.env`.

O `.gitignore` impede o envio do `.env` e da pasta `node_modules` para o GitHub.

O arquivo `.env.example` contém apenas valores de exemplo para facilitar a configuração do projeto em outro computador.

As rotas de cadastro e exclusão de produtos são protegidas por Basic Auth.

## Fluxo da aplicação

O fluxo principal do sistema é:


Home → Busca → Detalhes do produto → Carrinho


1. O usuário acessa a página inicial.
2. O front-end realiza uma requisição para a API.
3. A API consulta os produtos no MySQL.
4. O usuário pesquisa ou seleciona um perfume.
5. A página de detalhes consulta o produto pelo ID.
6. O usuário adiciona o produto ao carrinho.
7. O LocalStorage armazena o ID e a quantidade.
8. A rota `/cart` consulta os dados atuais no banco.
9. O back-end calcula subtotal, frete, desconto e total.

## Uso de inteligência artificial

Ferramentas de inteligência artificial foram utilizadas como apoio durante o desenvolvimento, principalmente para:

* revisão e organização de código;
* identificação de erros;
* melhoria das validações;
* criação da documentação;
* apoio na interface e experiência do usuário.

Todas as alterações foram revisadas, testadas e estudadas pelo autor do projeto.

## Autor

Miguel Montemezzo

Projeto acadêmico de Programação Web — 2026.
