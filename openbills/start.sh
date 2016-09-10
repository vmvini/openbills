#!/bin/bash
while ! nc -z pg-alpine-eleicoes 5432; do sleep 5; done
asadmin start-domain && asadmin deploy openbills.war  && tail -f /dev/null