# BeanFlow

**BeanFlow** é uma aplicação de Business Intelligence em tempo real voltada para o gerenciamento de vendas, visualização de dados e automações. Combinando o poder do Apache Superset com tecnologias modernas como React, Firebase e PostgreSQL, a plataforma oferece dashboards personalizados e integrados à experiência de usuário final.

## 🚀 Tecnologias Utilizadas

- **Apache Superset** – Visualização de dados e criação de dashboards
- **Docker** – Containerização dos serviços
- **PostgreSQL** – Banco de dados relacional
- **Firebase** – Autenticação e funcionalidades em tempo real (a ser integrado)
- **React** – Interface web para exibição dos dashboards e demais recursos da aplicação
- **Railway / Render / Vercel** – Alternativas de hospedagem para backend, banco de dados ou frontend

---

## 📦 Como rodar o Superset na sua máquina (Windows)

### Pré-requisitos

- Docker instalado ([link para download](https://www.docker.com/products/docker-desktop/))
- Git instalado ([link para download](https://git-scm.com/downloads))

### Passo a passo

1. **Clone este repositório**:

```bash
git clone https://github.com/lucasazevedd/beanflow.git
cd beanflow
```

2. **Entre na pasta do Superset**:

```bash
cd superset
```

3. **Rode o Superset usando Docker**:

```bash
docker-compose -f docker-compose-non-dev.yml up --build
```

Esse processo pode demorar a primeira vez, pois o Superset será baixado e instalado dentro do container Docker.

4. **Acesse no navegador**:

```
http://localhost:8088
```

---

## 💡 Observações

- O banco de dados PostgreSQL já está incluído na configuração via Docker, não sendo necessária uma instalação manual.
- A pasta `superset` é baseada diretamente no repositório oficial do Apache Superset.
- Em breve o sistema contará com um frontend React personalizado que será integrado diretamente a este repositório.

---

## 📃 Licença

Este projeto está licenciado sob a **MIT License**.