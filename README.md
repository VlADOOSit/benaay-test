# Benaay Test

Full-stack app with a Vite React frontend, an Express API backend, and MongoDB.

## Requirements

- Node.js 20+
- npm
- MongoDB (local) or Docker

## Run without Docker

1. Install dependencies:

```bash
cd server
npm install
cd ../client
npm install
```

2. Configure the server environment:

- Copy `server/.env.example` to `server/.env`.
- Set `ACCESS_TOKEN_SECRET` and `REFRESH_TOKEN_SECRET`.
- If you run MongoDB locally, keep `MONGO_URI=mongodb://localhost:27017/benaay_test`.
- Ensure `CORS_ORIGIN` matches the frontend URL (default is `http://localhost:5173`).

3. Start the backend:

```bash
cd server
npm run dev
```

4. Start the frontend:

```bash
cd client
npm run dev
```

Frontend: `http://localhost:5173`  
Backend: `http://localhost:3001`

## Run with Docker

1. Review secrets in `docker-compose.yml` and update the token values.

2. Build and start the stack:

```bash
docker compose up -d --build
```

Frontend: `http://localhost:5173`  
Backend: `http://localhost:3001`  
MongoDB: `mongodb://localhost:27017`

## Notes

- The Docker setup runs the frontend with Vite's dev server.
- If you change code, rebuild with `docker compose up --build` to pick it up.
