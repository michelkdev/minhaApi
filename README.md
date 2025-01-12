# API de Propósitos de Teste

## Descrição

Esta **WebAPI RESTful** foi criada com o intuito de listar alunos em um sistema de teste. Ela foi projetada para ser uma solução simples e eficiente, demonstrando a integração entre diferentes tecnologias, incluindo C# no backend, React no frontend e PostgreSQL como banco de dados. A API segue os princípios de REST, permitindo uma comunicação fácil e padronizada entre o frontend e o servidor.

## Tecnologias Utilizadas

- **Backend (Servidor)**: C# com .NET
  - A API foi desenvolvida usando a linguagem C# com o framework .NET, proporcionando uma estrutura robusta e segura para gerenciar e fornecer dados.
  
- **Frontend (Cliente)**: React com Node.js
  - O frontend foi construído utilizando o React.js, um framework JavaScript popular para criar interfaces de usuário interativas, e Node.js para gerenciar o servidor web.

- **Banco de Dados**: PostgreSQL
  - O PostgreSQL foi escolhido como banco de dados relacional devido à sua estabilidade, escalabilidade e robustez no gerenciamento de dados estruturados.

## Funcionalidade

Esta API oferece um simples **endpoint GET** para listar todos os alunos armazenados no banco de dados. A comunicação entre o frontend e o backend é feita através de requisições HTTP, usando os métodos apropriados para obter, enviar e manipular dados.

### Endpoint

- **GET** `/api/aluno`: Retorna uma lista de alunos cadastrados no sistema.
