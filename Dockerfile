# Portfolio site, built for self-hosting on the Raspberry Pi 5 behind Caddy + a Cloudflare Tunnel.
#
# `node:22-bookworm-slim` is arm64-native, so this builds on the Pi with no qemu emulation. The build
# runs *inside* the container on purpose: the Pi host needs no Node toolchain, and `deploy.sh` only
# ever has to call `docker compose build`.

# ── build ─────────────────────────────────────────────────────────────────────────────────────────
FROM node:22-bookworm-slim AS build
WORKDIR /app

# Manifests first so the `npm ci` layer is reused whenever only source changed. `.npmrc` matters here
# too — it sets `engine-strict=true`, which is the check that this is a Node >= 20 image.
COPY package.json package-lock.json .npmrc ./
RUN npm ci

COPY . .

# ADAPTER=node selects `@sveltejs/adapter-node` in `svelte.config.js` (default is adapter-vercel, which
# keeps the fallback deployment building unchanged). Output is `build/`.
#
# No build-time secrets: both API routes read `GH_TOKEN` from `$env/dynamic/private` at *request* time,
# and nothing that prerenders touches the network. Rotating the token is a container restart, never a
# rebuild — so it must not be baked in here.
ENV ADAPTER=node
RUN npm run build

# ── runtime ───────────────────────────────────────────────────────────────────────────────────────
FROM node:22-bookworm-slim AS runtime
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
# Required. Behind a reverse proxy adapter-node cannot infer the public origin, and gets request URLs
# subtly wrong without this — form actions and any absolute-URL construction resolve to the container.
ENV ORIGIN=https://mario-belmonte.com
# Cloudflare's real-client-IP header, so logs are not a wall of the Caddy container's address.
ENV ADDRESS_HEADER=CF-Connecting-IP

# `build/` and the manifest are the whole runtime. adapter-node bundles its own dependencies and this
# repo has zero production dependencies, so no `node_modules` ships. package.json is still needed —
# it is the nearest one to `build/index.js`, and its `"type": "module"` is what makes the ESM output
# load at all.
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/build ./build

# The `node` user (uid 1000) ships with the image; nothing here is written at runtime.
USER node
EXPOSE 3000

# Probes `/projects-index.json` — prerendered and static. Deliberately NOT an `/api/*` route: those
# call the GitHub API, so a 30-second probe would burn the rate limit on nothing. `node -e` rather
# than curl/wget so the check depends on no package the base image might drop.
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
	CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||3000)+'/projects-index.json').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "build"]
