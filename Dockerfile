FROM node:12-alpine

WORKDIR /srv/app

COPY ./ /srv/app/

RUN apk add yarn

RUN yarn

RUN yarn build:prod

EXPOSE 8500

CMD [ "yarn", "start:prod" ]