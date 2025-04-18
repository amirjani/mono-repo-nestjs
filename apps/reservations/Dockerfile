# Development stage
FROM node:alpine AS development

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json
COPY apps/reservations/ apps/reservations/
COPY libs libs

RUN npm install -g pnpm

RUN pnpm install -r --config.confirmModulesPurge=false

RUN pnpm run build reservations

# Production stage
FROM node:alpine AS production

ARG NODE_ENV=production
ARG NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install --production

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/reservations/main"]

