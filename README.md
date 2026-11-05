# Atlas Gym

Aplicação web de academia (Express + TypeScript + Sequelize + MySQL + Handlebars)
com duas áreas: **Aluno** e **Personal Trainer**.

## Rodando com Podman (recomendado)

```bash
# 1. Banco de dados
podman run -d --name atlas-mysql \
  -e MYSQL_ROOT_PASSWORD=rootpass123 \
  -e MYSQL_DATABASE=atlas_gym \
  -e MYSQL_USER=atlas \
  -e MYSQL_PASSWORD=atlaspass123 \
  -p 3306:3306 mysql:8.0

# 2. Dependências + migrations + seeds
cp .env.example .env
npm install
npm run migrate
npm run seed

# 3. Aplicação (container)
podman build -t atlas-gym-app .
podman run -d --name atlas-app --network host \
  -e DB_HOST=127.0.0.1 -e DB_PORT=3306 \
  -e DB_USER=atlas -e DB_PASSWORD=atlaspass123 -e DB_DATABASE=atlas_gym \
  -e PORT=3000 -e SESSION_SECRET=atlas-gym-dev-secret-change-me \
  atlas-gym-app:latest

# Ou rode localmente em modo dev
npm run dev
```

Acesse: http://localhost:3000

## Rodando com Docker Compose

```bash
docker compose up -d mysql
npm install && npm run migrate && npm run seed
docker compose up -d app
```

## Usuários de teste (seeds)

### Aluno (login em `/login` aba Cliente)
| Nome | E-mail | Senha |
|------|--------|-------|
| Carlos Oliveira | carlos@exemplo.com | 123456 |
| Maria Silva | maria@exemplo.com | 123456 |
| João Batista | joao@exemplo.com | 123456 |
| Ana Souza | ana@exemplo.com | 123456 |
| Pedro Rocha | pedro@exemplo.com | 123456 |
| Sara Perez | sara@exemplo.com | 123456 |

### Personal Trainer (login em `/login` aba Personal)
| Nome | E-mail | Senha |
|------|--------|-------|
| Lucas | lucasdepauloldp1@gmail.com | senhaSegura |
| Maria | maria@exemplo.com | senhaSegura |
| João | joao@exemplo.com | senhaSegura |
| Ana | ana@exemplo.com | senhaSegura |
| Pedro | pedro@exemplo.com | senhaSegura |
| Sara | sara@exemplo.com | senhaSegura |
| Carlos | carlos@exemplo.com | senhaSegura |

## Estrutura do banco

- `users` — alunos (nome, sexo, idade, e-mail, telefone, senha, objetivo)
- `trainers` — personais (nome, e-mail, senha com bcrypt)
- `workouts` — treinos do aluno (tipo A–E)
- `exercises` — exercícios de cada treino (nome, séries, reps, kg, descanso)
- `meansurements` — medidas corporais (peso, altura, bíceps, cintura, coxas)
- `tips` — dicas do personal para o aluno
