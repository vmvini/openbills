FROM java:8-jdk-alpine

ENV PAYARA_PKG https://s3-eu-west-1.amazonaws.com/payara.co/payara-micro-prerelease.jar
ENV PKG_FILE_NAME payara-micro.jar
ENV PAYARA_PATH /opt/payara

RUN   apk update \                                                                                                                                                                                                                        
 &&   apk add ca-certificates wget \                                                                                                                                                                                                      
 &&   update-ca-certificates  \

 && apk add sudo


RUN echo "http://dl-4.alpinelinux.org/alpine/edge/main" | sudo tee -a /etc/apk/repositories; \
    echo "http://dl-4.alpinelinux.org/alpine/edge/community" | sudo tee -a /etc/apk/repositories

RUN adduser -D default;                                               \
    chgrp -R default /usr/local;                                      \
    find /usr/local -type d | xargs chmod g+w;                        \
    echo "default ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers.d/default; \
    chmod 0440 /etc/sudoers.d/default


USER    default
WORKDIR $PAYARA_PATH

# Default payara ports to expose
EXPOSE 4848 8009 8080 8181


RUN sudo wget -O $PAYARA_PATH/$PKG_FILE_NAME $PAYARA_PKG

ADD target/openbills.war  ${PAYARA_PATH}

ENTRYPOINT sudo java -jar payara-micro.jar --deploy openbills.war