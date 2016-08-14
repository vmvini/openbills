
FROM postgres:9.5.1
MAINTAINER Ricardo Job <sousajob@gmail.com>
ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD 12345
ENV POSTGRES_DB eleicoes
VOLUME /var/dados
COPY create.sql /docker-entrypoint-initdb.d/


RUN apt-get update \
 && apt-get install -y --force-yes --no-install-recommends\
      apt-transport-https \
      ssh-client \
      build-essential \
      curl \
      ca-certificates \
      git \
      libicu-dev \
      'libicu[0-9][0-9].*' \
      lsb-release \
      python-all \
      rlwrap \
 && rm -rf /var/lib/apt/lists/*;


#INSTALLING NODE JS
RUN curl https://deb.nodesource.com/node_6.x/pool/main/n/nodejs/nodejs_6.0.0-1nodesource1~jessie1_amd64.deb > node.deb \
 && dpkg -i node.deb \
 && rm node.deb

RUN npm install -g pangyp\
 && ln -s $(which pangyp) $(dirname $(which pangyp))/node-gyp\
 && npm cache clear\
 && node-gyp configure || echo ""

ENV NODE_ENV production
WORKDIR /usr/src/app

#CMD ["npm","start"]

COPY /node-csv-importer/* /usr/src/app/
RUN cd /usr/src/app
RUN npm install  