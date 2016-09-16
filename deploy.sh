#!/bin/bash
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
docker volume rm $(docker volume ls |awk '{print $2}')
rm -rf temp
mkdir temp
#mvn -f openbills/pom.xml clean install
docker-compose build
docker-compose up