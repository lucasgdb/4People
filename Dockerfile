# syntax=docker/dockerfile:1.7

ARG NODE_VERSION=26
ARG PNPM_VERSION=12.15.0

# ---------- base ----------
FROM node:${NODE_VERSION}-alpine AS base
ARG PNPM_VERSION
ENV PNPM_HOME=/pnpm \
	PATH=/pnpm:$PATH \
	NEXT_TELEMETRY_DISABLED=1
RUN npm install -g pnpm@${PNPM_VERSION} && apk add --no-cache libc6-compat
WORKDIR /app

# ---------- deps ----------
FROM base AS deps
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/web/package.json apps/web/
COPY packages/ui/package.json packages/ui/
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
	pnpm install --frozen-lockfile --store-dir /pnpm/store

# ---------- dev (docker compose up) ----------
# Source code is bind-mounted by compose.yaml; dependencies live in named volumes because the
# host's node_modules contain glibc binaries (SWC, lightningcss) that don't run on Alpine (musl).
FROM base AS dev
ENV NODE_ENV=development
# Pre-create the volume mount points so the named volumes inherit `node` ownership
# (the image's `node` user is UID 1000, matching the usual host user).
RUN mkdir -p /pnpm/store /app/node_modules /app/apps/web/node_modules /app/apps/web/.next \
	/app/packages/ui/node_modules && chown -R node:node /pnpm /app
USER node
EXPOSE 3000
CMD ["sh", "-c", "pnpm install --frozen-lockfile --store-dir /pnpm/store && exec pnpm --filter @4people/web exec next dev --hostname 0.0.0.0 --port 3000"]

# ---------- build ----------
FROM deps AS build
COPY . .
ARG NEXT_PUBLIC_SITE_URL=https://4people.lucasbittencourt.dev
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}
RUN pnpm --filter @4people/web build

# ---------- runtime ----------
FROM node:${NODE_VERSION}-alpine AS runner
ENV NODE_ENV=production \
	NEXT_TELEMETRY_DISABLED=1 \
	PORT=3000 \
	HOSTNAME=0.0.0.0
WORKDIR /app

RUN addgroup -S nodejs -g 1001 && adduser -S nextjs -u 1001 -G nodejs

COPY --from=build --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=build --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
	CMD wget -qO- http://127.0.0.1:3000/ >/dev/null || exit 1

CMD ["node", "apps/web/server.js"]
