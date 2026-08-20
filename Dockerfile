FROM node:22-alpine AS dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM dependencies AS build
COPY client ./client
COPY server ./server
RUN npm run build

FROM node:22-alpine AS production-dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

FROM node:22-alpine AS client
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /app/client/.next/standalone ./
COPY --from=build /app/client/.next/static ./client/.next/static
COPY --from=build /app/client/public ./client/public
WORKDIR /app/client
EXPOSE 3000
CMD ["node", "server.js"]

FROM node:22-alpine AS server
ENV NODE_ENV=production
WORKDIR /app
COPY package.json ./
COPY --from=production-dependencies /app/node_modules ./node_modules
COPY --from=build /app/server/dist ./server/dist
EXPOSE 4000
CMD ["npm", "run", "start:server"]
