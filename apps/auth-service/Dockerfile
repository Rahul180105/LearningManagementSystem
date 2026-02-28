FROM node:20-alpine

RUN corepack enable
RUN corepack prepare pnpm@latest --activate

WORKDIR /app
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json tsconfig.base.json ./

COPY apps ./apps
COPY packages ./packages

RUN pnpm install

EXPOSE 3001
CMD ["pnpm","--filter","auth-service","dev"]