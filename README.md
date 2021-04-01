
# Requisitos (User Stories)

- Como interessado, quero poder realizar meu cadastro no sistema para acessar as funcionalidades do mesmo.
- Como professor, quero poder cadastrar uma nova turma na plataforma para aplicar a metodologia gamificada na mesma.
- Como professor, quero poder cadastrar uma nova atividade na plataforma para avaliar meus alunos.
- Como professor, quero cadastrar a frequência diária dos alunos da turma na plataforma para controlar a presença dos mesmos.
- Como professor, quero encerrar e corrigir uma atividade previamente cadastrada, para avaliar os meus alunos.
- Como aluno, eu quero poder ingressar em uma turma para poder acompanhar meu desempenho na disciplina em questão.
- Como aluno, quero poder mudar minha foto de avatar na plataforma para facilitar que me identifiiquem.
- Como aluno, quero poder inserir um nome de usuário para que as pessoas me identifiquem por ele em vez do meu nome.

# Especificações

## User (Usuário)

```ts
  interface User {
    name: string,
    email: string,
    password: string,
    role: "TEACHER" | "STUDENT"
  }
```

### Criar usuário

- Para se registrar na plataforma, o usuário deve acessar a rota `POST /users/`;
- Um usuário não pode criar uma conta com um e-mail igual ao de outro usuário;
- Para se autenticar na plataforma o usuário deve acessar `POST /sessions/` e enviar:

```json
  {
    "email": "johndoe@example.com",
    "password": "1234"
  }
```

## Class (Turma)

```ts
  interface Class {
    name: string;
  }
```

### Criar turma

- Para criar uma turma o usuário deve estar autenticado e possuir a função "TEACHER"
- Um professor pode ter várias turmas em andamento;

### Adicionar alunos

- Um professor pode adicionar alunos a uma turma que ele criou;

### Ingressar em uma turma

- Após o professor adicionar o aluno na turma, 
