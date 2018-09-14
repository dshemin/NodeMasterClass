FROM node:9-alpine

RUN mkdir /app \
    && adduser app -D -h /app

COPY dist /app

USER app

WORKDIR /app

CMD node index.js
