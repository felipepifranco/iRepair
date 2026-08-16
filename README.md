Esse é uma implementação fullstack de um sistema de gerenciamento de ordem de serviços e clientes, permitindo o controle dessas informações com persistência de dados em um sistema completo e funcional

Esse projeto foi criado durante o trainee da iJunior ao longo de várias semanas, com o intuito de aprender sobre o desenvolvimento de aplicações web

### Funcionalidades
- Sistema de login e autenticação
- Criação e gerenciamento de lista de clientes
- Criação e gerenciamento de lista de ordens de serviços
  -  que é relacionada com um cliente

### Implementação

A implementação foi feita majoritariamente em TypeScript, separando a aplicação em 2 partes principais, backend (`api/`) e frontend (`client/`)

#### Frontend
Responsável por receber as informações dos usuários e fornecer para eles as informações do bancos de dados

- Criação de páginas html com `React`
- Estilização de páginas por meio de `TailwindCSS`
- Modularização de componentes e páginas, com páginas que atualizam sob alterações no banco de dados
- Sistema de rotas
- Garantia de autenticação, que é feita pela api, separando entre rotas privadas e rotas públicas

#### Backend

Responsável pela geração da api, além da lógica de négocios para lidar com os requests e reponses que conversam com o frontend

- **Banco de dados**relacionado criado com `MySQL` e `MariaDB` e gerenciado com `Prisma`
- Gerenciamento de **requests e reponses** por meio do `Express` 
- Arquitetura **MVC** para modularizar a manipulação do banco de dados e o uso dele como api
- **Autenticação** por meio do uso de Middleware e **tokens JWT**
  - armazenamento de informações sensíveis no banco de dados por meio de hashes

#### Containers

O sistema utiliza containers do docker. Isso permite que o programa possa ser compartilhado de maneira fácil (sem depender de uma configuração do computador, que poderia causar problemas) e facilitando o build.

- API (em [`/api`](api/Dockerfile))
- FrontEnd (em [`/client`](client/Dockerfile))
- Banco de dados (gerado no próprio [docker compose](docker-compose.yml))

Todo esse sistema é gerenciado por um [docker compose](docker-compose.yml).

### Dependências
- docker
- mysql (já configurado)
- npx
- node

*(todo o resto é baixado pelo próprio docker em um ambiente isolado)* 


### SetUp

1. Clone o repositório
```shell
git clone git@github.com:felipepifranco/iRepair.git 
cd iRepair
```

2. Configure as variáveis de ambiente:
    1. Na pasta raiz, executar o comando e 
        - preencher`MYSQL_ROOT_PASSWORD`com sua senha do MySQL 
        - preencher `JWT_SECRET` com um valor que será usado para autenticação (recomenda-se usar `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))")
    ```
      cp .env.example .env
    ```
    2. Repetir esse comando para a pasta `/api`:
        - mudar "SUASENHA" em `DATABASE_URL` pela sua senha do MySQL 
        - preencher `JWL_SECRET` com o valor que você colocou no passo 1
    ```
      cd api
      cp .env.example .env
    ```
    3. Repetir esse comando para a pasta client (não é preciso configurar nada)
    ```
      cd ..
      cd client
      cp .env.example .env
    ```
3. Na pasta raiz, execute o docker compose:
```shell
docker compose up --build
```