# finance-project

Starter stack for a finance platform using Docker, React.js, Java (Spring Boot), JWT, REST APIs, and MySQL.

## Stack
- **Frontend**: React + Vite
- **Backend**: Spring Boot (Java 17), JWT auth, REST API
- **Database**: MySQL 8
- **Containerization**: Docker + Docker Compose

## Quick start

```bash
docker compose up --build
```

Services:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080
- MySQL: localhost:3306

## API endpoints

- `POST /api/auth/register` — create a user and receive a JWT
- `POST /api/auth/login` — login and receive a JWT
- `GET /api/health` — health check
- `GET /api/secure` — JWT-protected sample endpoint

Example request:

```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"demo","password":"demo"}'
```

Then call the secure endpoint:

```bash
curl http://localhost:8080/api/secure \
  -H "Authorization: Bearer <token>"
```

## Configuration

Environment variables (see `docker-compose.yml`):
- `MYSQL_HOST`, `MYSQL_PORT`, `MYSQL_DB`, `MYSQL_USER`, `MYSQL_PASSWORD`
- `JWT_SECRET`, `JWT_EXPIRATION_MINUTES`
