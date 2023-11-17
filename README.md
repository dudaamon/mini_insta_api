<img src="https://img.freepik.com/vetores-gratis/instagram-icone-novo_1057-2227.jpg?size=70&ext=jpg&ga=GA1.1.1826414947.1699920000&semt=ais"/>

# **Escopo Mini Insta**

## **O que o usuário pode fazer:**

- Fazer login;
- Fazer cadastro;
- Ver os dados do seu perfil;
- Editar os dados do seu perfil;
- Ver postagens de outras pessoas;
    - Ver quantidade de curtidas numa postagem;
    - Ver os comentários em uma postagem;
- Curtir postagens de outras pessoas;
- Comentar em postagens.

---

## **O que não será possível fazer:**

- Ver a localização de uma postagem;
- Ver pessoas que curtiram uma postagem;
- Curtir um comentário;
- Comentar em outros comentários.

---

## **Endpoints:**

### **POST - Login**

#### **Dados enviados**

- Username;
- Senha.

#### **Dados retornados**

- Sucesso ou erro;
- Token.

#### Objetivos gerais

- Validar username e a senha;
- Buscar o usuário no banco de dados;
- Verificar se a senha informada está correta;
- Gerar token de autenticação;
- Retornar os dados do usuário e o token.

---

### **POST - Cadastro**

#### **Dados enviados**

- Username;
- Senha.

#### **Dados retornados**

- Sucesso ou erro.

#### Objetivos gerais

- Validar username e a senha;
- Verificar se o username já existe no banco de dados;
- Criptografar a senha;
- Cadastrar o usuário no banco de dados;
- Retornar sucesso ou erro.

---

### **GET - Perfil**

#### **Dados enviados**

- Token (que terá id ou username);

#### **Dados retornados**

- URL da foto;
- Nome;
- Username;
- Site;
- Bio;
- Email;
- Telefone;
- Gênero.

#### Objetivos gerais

- Validar token do usuário;
- Buscar cadastro do usuário com a informação do token;
- Retornar os dados do usuário.

---

### **PUT - Perfil**

#### **Dados enviados**

- Token (que terá id ou username);
- URL da foto;
- Nome;
- Username;
- Site;
- Bio;
- Email;
- Telefone;
- Gênero.

#### **Dados retornados**

- Sucesso ou erro.

#### Objetivos gerais

- Validar token do usuário;
- Buscar cadastro do usuário com a informação do token;
- Exigir, ao menos, um campo para atualizar;
- Criptografar a senha se for informada;
- Verificar se email e username já existem no banco de dados se forem informados;
- Atualizar o registro do usuário no banco de dados.

---

### **GET - Postagens**

#### **Dados enviados**

- Token;
- Offset.

#### **Dados retornados**

- Postagens `[]`
    - Id;
    - Se foi curtida pelo usuário logado;
    - Usuário;
        - URL da foto;
        - Username;
        - Se é perfil oficial;
    - Fotos `[]`
    - Quantidade de curtidas;
    - Comentários `[]`
        - Username;
        - Texto;
    - Data.

#### Objetivos gerais

- Validar token do usuário;
- Buscar cadastro do usuário com a informação do token;
- Retornar as postagens de outras pessoas.

---

### **POST - Postagens**

#### **Dados enviados**

- Token;
- Offset;
- Array com fotos.

#### **Dados retornados**

- Sucesso ou erro.

#### Objetivos gerais

- Validar token do usuário;
- Buscar cadastro do usuário com a informação do token;
- Exigir que seja informado ao menos uma foto no array;
- Cadastrar postagem para o usuário logado;
- Cadastro das fotos da postagem;
- Retornar sucesso ou erro.

---

### **POST - Curtir**

#### **Dados enviados**

- Token (contém username ou id do usuário).
- Id da postagem.

#### **Dados retornados**

- Sucesso ou erro.

#### Objetivos gerais

- Validar token do usuário;
- Buscar cadastro do usuário com a informação do token;
- Buscar a postagem com o id informado;
- Verificar se a postagem já foi curtida pelo usuário;
- Cadastrar curtida da postagem no banco de dados;
- Retornar sucesso ou erro.

---

### **POST - Comentar**

#### **Dados enviados**

- Token (contém username ou id do usuário);
- Id da postagem;
- Texto.

#### **Dados retornados**

- Sucesso ou erro.

#### Objetivos gerais

- Validar token do usuário;
- Buscar cadastro do usuário com a informação do token;
- Validar texto inserido;
- Buscar a postagem pelo id informado;
- Cadastrar comentário da postagem;
- Retornar sucesso ou erro.

 <div align="center">Feito com 💗 por <a href="https://github.com/dudaamon">Duda</a>.</div>
