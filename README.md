## UserSystem - Backend

Este repositório contém o código fonte do backend do UserSystem, um sistema completo de login, cadastro e gerenciamento de usuários, além de recursos para gerenciar projetos. O backend foi construído utilizando uma arquitetura robusta e tecnologias modernas, garantindo segurança, performance e escalabilidade.

### Tecnologias

- **Express.js:** Framework web leve e rápido para Node.js.
- **TypeScript:** Linguagem de programação que fornece tipagem estática e segurança para o código JavaScript.
- **Prisma:** ORM (Object-Relational Mapping) para interagir com bancos de dados de forma eficiente e segura.
- **JWT (JSON Web Token):** Padrão de indústria para autenticação e autorização segura de usuários.
- **Hexagonal Architecture:** Arquitetura modular e desacoplada que separa a lógica de negócio da infraestrutura.

### Arquitetura

O UserSystem é baseado na arquitetura hexagonal, com duas camadas principais:

- **Camada de Domínio:** Contém as regras de negócio, entidades, serviços e casos de uso do sistema. Essa camada é completamente independente da infraestrutura, o que permite testes e manutenção mais eficientes.
- **Camada de Infraestrutura:** Contém a implementação dos controladores, middleware, repositórios e rotas, além da interação com bancos de dados e outras dependências externas, chamado adaptadores.

### Recursos

**Gerenciamento de Usuários:**

- **CRUD (Create, Read, Update, Delete):** Rotas para gerenciar usuários, incluindo criação, leitura, atualização e exclusão.
- **Autenticação:**
  - Rotas para login e registro de usuários.
  - Implementação de JWT (JSON Web Token) para gerar tokens de autenticação seguros e gerenciar as sessões dos usuários.
  - Middleware de autenticação para proteger as rotas sensíveis.
- **Recuperação de Senha:** Rota dedicada à recuperação de senha por meio do email do usuário.

**Gerenciamento de Projetos:**

- **CRUD:** Rotas para gerenciar projetos, incluindo criação, leitura, atualização e exclusão.
- **Associação de Usuários:** Rotas para associar usuários a projetos, permitindo gerenciar permissões e acesso.

### Como Usar

**Instalação:**

```bash
npm install
```

**Execução:**

```bash
npm start
```

**Configuração:**

- **Banco de Dados:** Configure as credenciais do banco de dados no arquivo `.env`.
- **Segredos:** Utilize variáveis de ambiente para armazenar segredos como chaves JWT, senhas e outras informações confidenciais.

### Documentação

- **API Documentation:** [Link para a documentação da API]

### Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues, enviar pull requests ou entrar em contato se tiver alguma dúvida.

### Conclusão

O UserSystem é uma solução robusta e escalável para gerenciamento de usuários e projetos. Sua arquitetura hexagonal garante flexibilidade e manutenibilidade, enquanto as tecnologias modernas garantem segurança e performance. Este projeto é um ponto de partida para o desenvolvimento de sistemas de autenticação e gerenciamento de usuários complexos.
