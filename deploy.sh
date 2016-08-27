#!/bin/bash
mvn -f openbills/pom.xml clean install
docker-compose build
docker-compose up