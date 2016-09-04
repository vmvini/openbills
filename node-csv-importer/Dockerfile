FROM mhart/alpine-node-auto

# Create app directory
RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/cache
WORKDIR /usr/src/app

#onde seus arquivos baixados ficarão
VOLUME /usr/src/app/cache

# Install app dependencies
ADD ./ /usr/src/app/
RUN npm install


RUN apk update

RUN apk add unrar

#RUN apk add netcat-openbsd sudo bash

#ADD start.sh /usr/src/app

#RUN sudo chmod +x /usr/src/app/start.sh

VOLUME /usr/src/app/downloads

#CMD ./start.sh

CMD node dataSourceReader.js

