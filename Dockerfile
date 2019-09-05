FROM node:12.6.0

WORKDIR /usr/src/smart-brain-api

COPY ./ ./
# You cna copy any folder by just naming it: COPY package.json ./

RUN npm install

CMD ["/bin/bash"]