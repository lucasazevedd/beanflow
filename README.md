# BeanFlow

**BeanFlow** é uma aplicação de Business Intelligence (BI) que utiliza o Apache Superset para criar dashboards interativos e em tempo real, conectados a bancos de dados PostgreSQL.  
Seu objetivo é fornecer uma visualização intuitiva e automatizada de dados financeiros e de vendas para pequenas empresas e empreendedores.

---

## 🚀 Tecnologias Utilizadas

- [Apache Superset](https://superset.apache.org/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- PostgreSQL (via container)
- React (em desenvolvimento)
- Firebase (em desenvolvimento)

---

## 📁 Estrutura Atual do Projeto

```
beanflow/
├── LICENSE
└── superset/
```

> Por enquanto o projeto inclui apenas a pasta `superset`. Outras pastas como `frontend-react` serão adicionadas futuramente.

---

## 🛠️ Requisitos

- Git instalado
- Docker instalado
- Docker Compose instalado
- 4 GB de RAM disponíveis (mínimo)
- Conexão com a internet para baixar imagens

---

## 📦 Como rodar o Superset localmente (Windows, macOS ou Linux)

### 1. Clone o repositório
```bash
git clone https://github.com/lucasazevedd/beanflow.git
cd beanflow/superset
```

### 2. Copie o arquivo de configuração
```bash
cp docker-compose-non-dev.yml docker-compose.yml
```

> No **Windows** (PowerShell), use:
```powershell
Copy-Item -Path "docker-compose-non-dev.yml" -Destination "docker-compose.yml"
```

### 3. Construa os containers (pode demorar bastante da primeira vez)
```bash
docker compose -f docker-compose.yml up --build
```

### 4. Crie um usuário administrador (em outro terminal)
```bash
docker exec -it superset_app superset fab create-admin
```

Preencha os dados solicitados no terminal (nome, e-mail, usuário, senha).

---

## ▶️ Parar e iniciar novamente

### Para parar:
```bash
docker compose down
```

### Para retomar (sem rebuild):
```bash
docker compose up
```

---

## 🧪 Testando o Superset

Acesse em seu navegador:  
[http://localhost:8088](http://localhost:8088)

Entre com o usuário e senha que você criou no passo 4.

---

## 📝 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
