FROM oven/bun:1 AS base
WORKDIR /web

FROM base AS deps
COPY package.json  ./
COPY src/prisma ./src/prisma/
RUN bun install --frozen-lockfile

FROM deps AS final
COPY . ./
RUN bun run build
EXPOSE 3000

CMD bunx prisma db push && sleep 10 && bun run populate-db && bun run start