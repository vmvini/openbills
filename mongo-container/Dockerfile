#FROM darknode/docker-node-mongo
FROM mhart/alpine-node-auto

#install mongodb
ADD runmongo /
ADD https://raw.githubusercontent.com/mvertes/dosu/0.1.0/dosu /sbin/
RUN chmod +x /sbin/dosu && \
  echo http://dl-4.alpinelinux.org/alpine/edge/testing >> /etc/apk/repositories && \
  apk add --no-cache mongodb mongodb-tools
VOLUME /data/db
EXPOSE 27017 28017
RUN chmod +x /runmongo
#ENTRYPOINT [ "/runmongo" ]


#RUN apk add --no-cache mongodb-tools

# Create app directory
RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/cache
WORKDIR /usr/src/app

#onde seus arquivos baixados ficarão
VOLUME /usr/src/app/cache

# Install app dependencies
ADD ./ /usr/src/app/
RUN npm install

EXPOSE 27017

CMD mongod & node fileListener.js
