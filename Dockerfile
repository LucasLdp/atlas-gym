FROM docker.io/library/node:20-slim

WORKDIR /app

# Dependências do sistema para o bcrypt nativo
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

# tsx executa o TypeScript diretamente (o app resolve os models em src/models)
CMD ["npx", "tsx", "src/app.ts"]
