FROM mhart/alpine-node-auto

# Create app directory
RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/cache
WORKDIR /usr/src/app

#onde seus arquivos baixados ficarão
VOLUME /usr/src/app/cache
VOLUME /usr/src/app/downloads

# Install app dependencies
ADD ./ /usr/src/app/
RUN npm install

CMD node dataSourceReader.js


