FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN  npm install --production

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
COPY --from=ghcr.io/ufoscout/docker-compose-wait:latest /wait /wait

ENV NEXT_TELEMETRY_DISABLED 1
CMD /wait.sh
RUN npx prisma generate 
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY    --from=builder  /app/public ./public
COPY    --from=builder  /app/package.json ./package.json
COPY    --from=builder  /app/node_modules ./node_modules
COPY    --from=builder  /app/.next ./.next
COPY    --from=builder  /app/prisma ./prisma
USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["npm", "start"]