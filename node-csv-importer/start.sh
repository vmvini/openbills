#!/bin/bash
while ! nc -z pg-alpine-eleicoes 5432; do sleep 3; done
node downloader.js