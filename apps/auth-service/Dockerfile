
FROM node:20-alpine


WORKDIR /app


RUN npm install -g pnpm

COPY ./apps/auth-service/package.json ./
COPY ./packages/shared-db ./
COPY pnpm-lock.yaml pnpm-workspace.yaml ./




RUN pnpm install
COPY . .




RUN pnpm build

EXPOSE 3001


CMD ["pnpm", "start"]