# User Stories

Histórias de usuário levantadas em conjunto com o cliente.

# Gerenciar usuário

## Cadastro de usuário

> Como interessado, quero poder realizar meu cadastro no sistema para acessar as funcionalidades do mesmo.

```ts
interface User {
  name: string;
  email: string;
  password: string;
  role: "TEACHER" | "STUDENT";
}
```

### **RF** - Requisitos Funcionais

- Deve ser possível se cadastrar na plataforma.

### **RN** - Regras de Negócio

- Não deve ser possível cadastrar um usuário com o mesmo e-mail de outro usuário.
- Deve ser possível escolher o tipo de usuário entre "STUDENT" e "TEACHER".

---

## Autenticação de usuário

```json
{
  "email": "johndoe@example.com",
  "password": "1234"
}
```

### **RF** - Requisitos Funcionais

- Deve ser possível realizar a autenticação na plataforma.

### **RN** - Regras de Negócio

- Só será possível fazer a autenticação informando o e-mail e senha de um usuário previamente cadastrado na plataforma.

# Gerenciar Turma

## Cadastro de turma

> Como professor, quero poder cadastrar uma nova turma na plataforma para aplicar a metodologia gamificada na mesma

```ts
interface Class {
  name: string;
}
```

### **RF** - Requisitos Funcionais

- Deve ser possível cadastrar uma nova turma.

### **RN** - Regras de Negócio

- Só deve ser possível cadastrar uma nova turma se o usuário for do tipo "TEACHER".

---

## Cadastro de participantes

### **RF** - Requisitos Funcionais

- Deve ser possível adicionar participantes em uma turma.

### **RN** - Regras de Negócio

- Só deve ser possível adicionar participantes em uma turma se o usuário for do tipo "TEACHER" e for "dono" da turma em questão.
- Só deve ser possível adicionar participantes do tipo "STUDENT" em uma turma.
- Só deve ser possível adicionar um participante previamente cadastrado na plataforma.

---

## Cadastrar atividade

> Como professor, quero poder cadastrar uma nova atividade na plataforma para avaliar meus alunos.

### **RF** - Requisitos Funcionais

- Deve ser possível cadastrar uma nova atividade na turma.

### **RN** - Regras de Negócio

- Só deve ser possível cadastrar uma nova atividade se o usuário for do tipo "TEACHER" e for "professor" dessa turma.
- Só deve ser possível cadastrar uma nova atividade se a turma estiver "ativa".
- A atividade cadastrada deve estar vinculada à pelo menos UM elemento do jogo (coin, mushroom, mid-mushroom, cherry) que irão definir a pontuação da mesma com base na soma do valor desses elementos.
- A atividade cadastrada deve possuir uma data de entrega e a mesma deve ser uma data igual ou superior a data atual.

---

## Registrar presença

> Como professor, quero encerrar e corrigir uma atividade previamente cadastrada, para avaliar os meus alunos.

### **RF** - Requisitos Funcionais

- Deve ser possível registrar a presença de uma aluno em uma data específica.

### **RN** - Regras de Negócio

- Só deve ser possível registrar presença de alunos em datas passadas.
- Só deve ser possível registrar presença em uma turm "ativa".

---

## Visualizar ranking de alunos

### **RF** - Requisitos Funcionais

- Deve ser possível visualizar o ranking de pontuação total dos alunos da turma.

### **RNF** - Requisitos Não Funcionais

- A pontuação do aluno irá se dar pela soma de todas as atividades e da pontuação total de presença do aluno.

### **RN** - Regras de Negócio

---

# Gerenciar aluno

## Cadastrar nome de usuário (nickname)

> Como aluno, quero poder inserir um nome de usuário para que as pessoas me identifiquem por ele em vez do meu nome

### **RF** - Requisitos Funcionais

- Deve ser possível cadastrar um "nickname" que ficará vinculado ao aluno e a turma.

### **RN** - Regras de Negócio

- Não deve ser possível usar o mesmo "nickname" que outro participante da turma.
- O "nickname" substituirá o nome do usuário na visualização por parte de outros participantes da turma.
- Somente o professor da turma poderá visualizar o nome "verdadeiro" do usuário com "nickname" cadastrado.

---

## Fazer upload da foto de perfil (avatar)

> Como aluno, quero poder mudar minha foto de avatar na plataforma para facilitar que me identifiiquem.
