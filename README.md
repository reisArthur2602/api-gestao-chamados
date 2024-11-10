<h1 align="center" style="font-weight: bold;">GESTÃO DE CHAMADOS - API 💻</h1>

<p align="center">
 <a href="#tech">Tecnologias</a> • 
 <a href="#started">Primeiros passos</a> • 
  <a href="#user-routes">User Endpoints</a> • 
  <a href="#category-routes">Category Endpoints</a> • 
  <a href="#client-routes">Client Endpoints</a> 
  <a href="#order-routes">Chamados Endpoints</a> 
</p>

<p align="center">
    <b>Desenvolvimento de uma api de gestão de chamados</b>
</p>

<h2 id="technologies">💻 Tecnologias</h2>

- Node.js
- Express
- TypeScript
- Prisma
- PostgreSQL

<h2 id="started">🚀 Primeiros Passos</h2>

<h3>Pré Requisitos</h3>

- [Node.js](https://nodejs.org/pt)
- [Git](https://git-scm.com/)

<h3>Clone o Projeto</h3>

```bash
git clone https://github.com/reisArthur2602/sistema-gestao-chamados
```

<h3>Configure as váriaveis .env </h2>

Use o`.env.example` como referência para criar seu arquivo de configuração `.env` com suas credenciais

```yaml
PORT=PORT
DATABASE_URL="postgresql://janedoe:mypassword@localhost:5432/mydb"
JWT_SECRET=JWT_SECRET
```

<h3>Para iniciar o projeto</h3>

```bash
cd nome-do-projeto
npm install
npx prisma migrate dev
npm run dev
```

<h2 id="user-routes">📍 User Endpoints</h2>

| Rotas                          | Descrição                                                                      |
| ------------------------------ | ------------------------------------------------------------------------------ |
| <kbd>POST /user/register</kbd> | Cadastrar um novo usuário [Detalhes da requisição](#post-register-detail)      |
| <kbd>POST /user/session</kbd>  | Realizar login do usuario [Detalhes da requisição](#post-session-detail)       |
| <kbd>GET /user/me</kbd>        | Buscar informações do usuário logado [Detalhes da requisição](#details-detail) |

<h3 id="post-register-detail">GET /user/register</h3>

**REQUEST**

```json
{
  "email": "arthur@guest.com",
  "password": "123456",
  "username": "Arthur"
}
```

<h3 id="post-session-detail">POST /user/session</h3>

**REQUEST**

```json
{
  "email": "arthur@guest.com",
  "password": "123456"
}
```

**RESPONSE**

```json
{
  "user": {
    "id": "aee1904e-fe99-49e5-af46-e27c99c5fbe6",
    "email": "arthur@guest.com",
    "password": "$2a$08$hMJ.PabdhofSFfLvIuVTYuAlWYoqDbujEHCgv6PqMAXdtRcMKw6Q6",
    "username": "Arthur"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQXJ0aHVyIiwiZW1haWwiOiJhcnRodXJAZ3Vlc3QuY29tIiwiaWF0IjoxNzMxMjE2NjAyLCJleHAiOjE3MzE4MjE0MDIsInN1YiI6ImFlZTE5MDRlLWZlOTktNDllNS1hZjQ2LWUyN2M5OWM1ZmJlNiJ9.C-5dqM8Mj-xd3y_pERr63gE4nLAeZYmjDXE4HFEI1Tc"
}
```

<h3 id="details-detail">GET /user/me</h3>

**RESPONSE**

```json
{
  "id": "aee1904e-fe99-49e5-af46-e27c99c5fbe6",
  "email": "arthur@guest.com",
  "password": "$2a$08$hMJ.PabdhofSFfLvIuVTYuAlWYoqDbujEHCgv6PqMAXdtRcMKw6Q6",
  "username": "Arthur"
}
```

<h2 id="category-routes">📍 Category Endpoints</h2>

| Rotas                           | Descrição                                                                 |
| ------------------------------- | ------------------------------------------------------------------------- |
| <kbd>POST /category</kbd>       | Criar uma novo categoria [Detalhes da requisição](#post-category-detail)  |
| <kbd>GET /category</kbd>        | Buscar todas as categorias [Detalhes da requisição](#get-category-detail) |
| <kbd>DELETE /category?id=</kbd> | Deletar uma categoria [Detalhes da requisição](#delete-category-detail)   |

<h3 id="post-category-detail">POST /category</h3>

**REQUEST**

```json
{
  "name": "Suporte Técnico"
}
```

<h3 id="get-category-detail">GET /category</h3>

**RESPONSE**

```json
[
  {
    "id": "ab7b7036-c186-42e3-b139-84702909d848",
    "name": "suporte técnico",
    "created_at": "2024-11-10T04:28:17.147Z"
  }
]
```

<h3 id="delete-category-detail">DELETE /category?id=</h3>

**REQUEST**

```json
{
  "id": "ab7b7036-c186-42e3-b139-84702909d848"
}
```

<h2 id="client-routes">📍 Client Endpoints</h2>

| Rotas                         | Descrição                                                                    |
| ----------------------------- | ---------------------------------------------------------------------------- |
| <kbd>POST /client</kbd>       | Cadastrar um novo cliente [Detalhes da requisição](#post-client-detail)      |
| <kbd>GET /client</kbd>        | Buscar todos os clientes [Detalhes da requisição](#get-client-detail)        |
| <kbd>DELETE /client?id=</kbd> | Deletar um cliente [Detalhes da requisição](#delete-client-detail)           |
| <kbd>PUT /client              | Editar informções de um cliente [Detalhes da requisição](#put-client-detail) |

<h3 id="post-client-detail">POST /client</h3>

**REQUEST**

```json
{
  "name": "Ana Costa",
  "email": "anacosta@guest.com",
  "address": "Avenida Yolando Fonseca - Jurema",
  "phone": "2199953-3913",
  "cpf": "11124349767"
}
```

<h3 id="get-client-detail">GET /client</h3>

**RESPONSE**

```json
[
  {
    "id": "d57f7526-4d3e-4464-885e-461916f1a9c7",
    "name": "Ana Costa",
    "email": "anacosta@guest.com",
    "address": "Avenida Yolando Fonseca - Jurema",
    "phone": "2199953-3913",
    "cpf": "11124349767",
    "userId": "76888986-bca2-412c-81c9-e32201d60d99",
    "created_at": "2024-11-10T05:09:37.684Z"
  }
]
```

<h3 id="delete-client-detail">DELETE /client?id=</h3>

**REQUEST**

```json
{
  "id": "d57f7526-4d3e-4464-885e-461916f1a9c7"
}
```

<h3 id="put-client-detail">PUT /client</h3>

**REQUEST**

```json
{
  "id": "d57f7526-4d3e-4464-885e-461916f1a9c7",
  "name": "Ana Costa",
  "email": "anacosta@guest.com",
  "address": "Avenida Yolando Fonseca - Jurema",
  "phone": "2199953-3913",
  "cpf": "11124349767"
}
```

<h2 id="order-routes">📍 Order Endpoints</h2>

| Rotas                        | Descrição                                                              |
| ---------------------------- | ---------------------------------------------------------------------- |
| <kbd>POST /order</kbd>       | Cadastrar um novo chamado [Detalhes da requisição](#post-order-detail) |
| <kbd>GET /order</kbd>        | Buscar todos os chamados [Detalhes da requisição](#get-order-detail)   |
| <kbd>Delete /order?id=</kbd> | Deletar um chamado [Detalhes da requisição](#details-task-detail)      |
| <kbd>PATCH /order?id=</kbd>  | Finalizar um chamado [Detalhes da requisição](#patch-task-detail)      |

<h3 id="post-order-detail">POST /order</h3>

**REQUEST**

```json
{
  "category_id": "ab7b7036-c186-42e3-b139-84702909d848",
  "clientId": "d57f7526-4d3e-4464-885e-461916f1a9c7",
  "description": "Suporte técnico"
}
```

<h3 id="#get-order-detail">GET /order</h3>

**RESPONSE**

```json
[
  {
    "id": "d57f7526-4d3e-4464-885e-461916f1a9c7",
    "clientId": "d57f7526-4d3e-4464-885e-461916f1a9c7",
    "userId": "76888986-bca2-412c-81c9-e32201d60d99",
    "status": false,
    "category_id": "ab7b7036-c186-42e3-b139-84702909d848",
    "description": "Suporte técnico",
    "created_at": "2024-11-10T05:14:42.366Z",
    "category": {
      "id": "ab7b7036-c186-42e3-b139-84702909d848",
      "name": "suporte técnico",
      "created_at": "2024-11-10T04:28:17.147Z"
    },
    "user": {
      "username": "Arthur"
    }
  }
]
```

<h3 id="patch-order-detail">PATCH /order?id=</h3>

**REQUEST**

```json
{
  "id": "d57f7526-4d3e-4464-885e-461916f1a9c7"
}
```
