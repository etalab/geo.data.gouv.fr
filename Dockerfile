# 1/3 Create dependencies image
FROM node:10-alpine AS build-deps

RUN mkdir -p /opt/geo.data.gouv.fr
WORKDIR /opt/geo.data.gouv.fr

COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile --production

# 2/3 Create build image
FROM node:10-alpine AS build-front

RUN mkdir -p /opt/geo.data.gouv.fr
WORKDIR /opt/geo.data.gouv.fr

COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile

COPY . .

ENV NODE_ENV=production
RUN yarn build

# 3/3 Create production image
FROM node:10-alpine

RUN mkdir -p /opt/geo.data.gouv.fr
WORKDIR /opt/geo.data.gouv.fr

COPY server server
COPY locales locales
COPY public public
COPY static static
COPY robots.txt next.config.js ./

COPY --from=build-deps /opt/geo.data.gouv.fr .
COPY --from=build-front /opt/geo.data.gouv.fr/.next .next

ENV NODE_ENV=production

EXPOSE 3000
CMD ["node", "server"]
