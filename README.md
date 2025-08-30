# Loja Online 🚀

Aplicação full-stack completa com **React**, **Node.js**, **MySQL** e **Docker**, pronta para ser usada em ambiente de desenvolvimento ou produção.

🛠️ **Tecnologias**:
- **Frontend**: React (com design moderno e responsivo)
- **Backend**: Node.js + Express (API RESTful)
- **Banco de dados**: MySQL (externo)
- **Containerização**: Docker & Docker Compose

📦 **Imagens no Docker Hub**:
- Frontend: [`warlleysilva/loja-frontend`](https://hub.docker.com/r/warlleysilva/loja-frontend)
- Backend: [`warlleysilva/loja-backend`](https://hub.docker.com/r/warlleysilva/loja-backend)

[![Docker Image](https://img.shields.io/docker/v/warlleysilva/loja-frontend?label=frontend)](https://hub.docker.com/r/warlleysilva/loja-frontend)
[![Docker Image](https://img.shields.io/docker/v/warlleysilva/loja-backend?label=backend)](https://hub.docker.com/r/warlleysilva/loja-backend)

---

## 🚀 Como usar

### 1. Crie um `docker-compose.yml`

```yaml
version: "3.8"

services:
  frontend:
    image: warlleysilva/loja-frontend:latest
    container_name: loja-frontend
    ports:
      - "3100:3100"
    depends_on:
      - backend

  backend:
    image: warlleysilva/loja-backend:latest
    container_name: loja-backend
    ports:
      - "4000:4000"
    environment:
      DB_HOST: "SEU_IP_AQUI"        # ← IP do servidor onde roda o MySQL
      DB_USER: "loja"
      DB_PASS: "loja123"
      DB_NAME: "loja_online
