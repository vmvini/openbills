#FROM k0st/alpine-postgres
FROM onjin/alpine-postgres
MAINTAINER vmvini - https://github.com/vmvini
ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD 12345
ENV POSTGRES_DB eleicoes
COPY . /docker-entrypoint-initdb.d/