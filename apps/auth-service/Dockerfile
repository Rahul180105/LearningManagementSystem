FROM node:20-alpine AS builder

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.29.3 --activate


COPY pnpm-workspace.yaml .
COPY package.json .
COPY pnpm-lock.yaml .


COPY apps ./apps
COPY packages ./packages

RUN pnpm install --frozen-lockfile


RUN pnpm --filter @lms/shared-db build


RUN pnpm --filter apps/auth-service build


FROM node:20-alpine

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.29.3 --activate

COPY --from=builder /app .


RUN pnpm install --prod --frozen-lockfile

WORKDIR /app/apps/auth-service

EXPOSE 3001

CMD ["node", "dist/index.js"]