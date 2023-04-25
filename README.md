# Agendamento de consulta médica

### **Funcionalidades**

---

### **Cadastro de Usuário**

-   [x] Deve ser possivel o usuário realizar um cadastro
    -   [x] O Usuário não precisa estár autenticado no sistema para se cadastrar
    -   [x] Não deve ser possivel realizar o cadastro de um usuário sem username e senha.
    -   [x] Não deve ser possivel realizar um cadastro de username já existente.
    -   [x] Não deve ser possivel usuário cadastrar a permissão de adminstrador.

---

### **Cadastro de Especialidade**

-   [x] Deve ser possivel um usuario cadastar uma especilidade
    -   [x] O usuario precisa estar autenticado na aplicação.
    -   [x] Não deve ser possivel realizar o cadastro de uma especilidade já existente, ou seja, com o mesmo nome.
    -   [x] O usuario precisa ter permissão de administrador.
    -   [x] Não deve ser possivel cadastrar uma especialidade com o nome vazio.

---

### **Cadastro de Medico**

-   [x] Deve ser possivel cadastrar um medico
    -   [x] O médico deve possuir um CRM com 6 digitos
    -   [x] O médico deve estar atrelado a um usuario
    -   [x] O médico dever ter uma e somente uma especilialidade
    -   [x] Não deve ser possivel cadastrar um medico sem CRM
    -   [x] Não deve ser possivel cadastrar o mesmo CRM mais de uma vez.
