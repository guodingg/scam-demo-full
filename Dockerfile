FROM node:20-slim AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-slim AS runner
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server ./server
COPY --from=builder /app/data ./data

EXPOSE 3000
ENV PORT=3000
ENV DATA_DIR=/app/data
ENV DB_PATH=/app/data/antiscam.db

CMD ["node", "server/index.js"]