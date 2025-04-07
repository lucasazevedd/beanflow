# BeanFlow

**BeanFlow** é uma aplicação de Business Intelligence (BI) voltada para pequenas empresas e empreendedores que desejam tomar decisões baseadas em dados.  
A plataforma permite o controle e visualização em tempo real de indicadores financeiros, operacionais e comerciais por meio de dashboards interativos, conectando-se a um banco de dados PostgreSQL.

---

## 🚀 Tecnologias Utilizadas

- **Apache Superset** — Dashboards e visualização de dados
- **PostgreSQL** — Banco de dados relacional
- **Node.js + Express** — Backend (API REST)
- **React + Vite + TypeScript** — Frontend
- **Docker** — Contêineres para backend e Superset
- **Railway** — Hospedagem do banco de dados, backend e frontend
- **Git e GitHub** — Versionamento e colaboração
- **CSS puro + Google Fonts** — Estilização
- **Figma** — Prototipação da interface

---

## 🔧 Estrutura do Projeto

```
beanflow/
├── backend/             # API Express + Node.js (em desenvolvimento)
├── frontend/            # Interface em React com Vite e TypeScript
├── superset/            # Dashboards Superset com Docker
├── .gitignore
├── README.md
└── LICENSE
```

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

Preencha os dados solicitados (nome, e-mail, usuário, senha).

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

## 🌐 Fluxo da Aplicação

1. **Frontend (React)**: acessa dados da API e exibe gráficos do Superset embutidos.
2. **Backend (Node/Express)**: processa dados e envia para o frontend ou Superset.
3. **PostgreSQL (Railway)**: banco central dos dados.
4. **Superset (Docker ou Railway)**: visualização dos dados conectados ao banco.
5. **Hospedagem (Railway)**: cada serviço (frontend, backend, banco) pode ser implantado separadamente.

---

## 📊 Exemplo de Integração

- O React pode exibir dashboards Superset por iframe.
- A API se comunica com o banco PostgreSQL para fornecer dados ao Superset e frontend.

---

## 💸 Possíveis Custos

- **Railway**: plano gratuito cobre até 500 horas/mês por ambiente. Após isso, será cobrado conforme uso.
- **Hospedagem Superset na nuvem** (opcional): se quiser deixar o Superset sempre online, precisará de plano pago na Railway, Render, Fly.io ou outra.
- **Domínio personalizado** (opcional): pode ser comprado por R$30~70/ano.

---

## 📝 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).