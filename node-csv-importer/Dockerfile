FROM mhart/alpine-node-auto

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
ADD ./ /usr/src/app/
RUN npm install

#Install Netcat
RUN apk add --update netcat-openbsd && rm -rf /var/cache/apk/*

#CMD [ "node", "downloader.js" ]


#install bash
RUN apk add --update bash && rm -rf /var/cache/apk/*

#Install sudo
RUN   apk update \                                                                                                                                                                                                                        
 &&   apk add ca-certificates wget \                                                                                                                                                                                                      
 &&   update-ca-certificates  \

 && apk add sudo


RUN echo "http://dl-4.alpinelinux.org/alpine/edge/main" | sudo tee -a /etc/apk/repositories; \
    echo "http://dl-4.alpinelinux.org/alpine/edge/community" | sudo tee -a /etc/apk/repositories


ADD start.sh /usr/src/app

RUN sudo chmod +x /usr/src/app/start.sh


CMD ./start.sh


