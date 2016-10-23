FROM alpine:latest
MAINTAINER rhyuen

RUN apk add --update nodejs npm bash

WORKDIR /usr/src
COPY package.json /usr/src/package.json
RUN npm install
COPY . /usr/src/
COPY test /usr/src/test
EXPOSE 8989

RUN adduser -D robert
USER robert

CMD ["npm", "start"]
