# FROM node:12-alpine
# RUN apk add yarn
FROM node:12

WORKDIR /home/node/app

COPY package*.json ./

COPY yarn.lock ./

RUN yarn install --frozen-lockfile

COPY ./ /home/node/app

RUN yarn build:prod

EXPOSE 8500

CMD [ "yarn", "start:prod" ]