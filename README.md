![descricao](egregora-tech.jpeg) 

# EGRÉGORA TECH

Você, mulher da área tech , já se sentiu insegura com seus primeiros passos nessa carreira? Já pensou como seria importante ter outra mulher que já atua na área te guiando sobre como montar seu CV, como se portar em uma entrevista ou te indicando os melhores cursos? Qual a diferença que uma mentoria faria na sua trajetória? A Egrégora Tech é uma comunidade que conecta mulheres da área de tecnologia para darem e receberem mentoria, e fazerem suas carreiras decolarem!  

##Features

✅ Fazer cadastro (senha com segurança bcrypt);

✅ Criar perfil (mentora e mentorada);

✅ Fazer buscas por perfil de atuação (frontend, backend, ...);

##API

A API Egrégora Tech é composta pelas seguintes rotas:

- **POST `/user/sign-up`**
  Cria cadastro (somente com convite).
  
- **POST `/user/sign-in`**
  Acesso via email e senha.
   
- **POST `/user/profile`**
  Cria perfil, onde a usuária poderá colocar área de atuação e seus interesses de mentoria.
  
- **POST `/user/sign-out`**
  Encerra o acesso a plataforma. 
  
- **GET `/career/:id/users`**
  Busca usuárias de uma determinada área de atuação.
  
  ## Como rodar o projeto?
  
  1. Instale o NodeJS [https://nodejs.org/en/](https://nodejs.org/en/)
2. Instale o Postgres 13 [https://www.postgresql.org/](https://www.postgresql.org/)
3. Crie uma nova database

    ```bash
    $ psql
    $ CREATE DATABASE minha_nova_database;
    ```

4. Clone o projeto
5. Crie o arquivo .env a partir do arquivo .env.example e preencha os valores com a url para a database criada e a porta a ser usada.
6. Instale as dependências

    ```bash
    npm i
    ```

7. Rode as migrations

    ```bash
    npx sequilize-cli db:migrate
    ```

8. Rode a aplicação 🙂

    ```bash
    npm run dev
    ```
  
  
  
  
