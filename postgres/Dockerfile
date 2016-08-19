FROM postgres:9.5.1
MAINTAINER Ricardo Job <sousajob@gmail.com>
ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD 12345
ENV POSTGRES_DB eleicoes
#VOLUME /var/dados
COPY create.sql /docker-entrypoint-initdb.d/