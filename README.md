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
```
⚠️ Requisitos obrigatórios
1. Banco de dados MySQL configurado
O backend não inclui o banco de dados. Você precisa ter um servidor MySQL rodando com:

✅ Banco de dados: loja_online
✅ Usuário: loja
✅ Senha: loja123
✅ Acesso remoto habilitado
Exemplo de criação no MySQL:

``` sql
CREATE DATABASE loja_online CHARACTER SET utf8mb4;

CREATE USER 'loja'@'%' IDENTIFIED BY 'loja123';
GRANT ALL PRIVILEGES ON loja_online.* TO 'loja'@'%';
FLUSH PRIVILEGES;
```
Configurar o MySQL para aceitar conexões externas:

No servidor onde o MySQL está rodando, edite:
```
sudo vim /etc/mysql/mysql.conf.d/mysqld.cnf

Mude:
bind-address = 127.0.0.1
Para:
bind-address = 0.0.0.0
Reinicie:
sudo systemctl restart mysql
```
🛠️ Exemplo de tabela: produtos

```
USE loja_online;

CREATE TABLE produtos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  preco DECIMAL(10,2) NOT NULL,
  descricao TEXT
);

INSERT INTO produtos (nome, preco, descricao) VALUES
('Notebook Gamer', 5999.90, 'RTX 3060'),
('Fone Bluetooth', 299.90, 'Cancelamento de ruído'),
('Camiseta', 49.90, '100% algodão');

```
📦 Comandos úteis
```
# Subir os containers
docker-compose up -d

# Parar e remover
docker-compose down

# Ver logs do backend
docker logs loja-backend

# Ver logs do frontend
docker logs loja-frontend
```

