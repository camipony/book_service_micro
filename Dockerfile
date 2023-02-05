FROM node:16

WORKDIR /book_services

COPY package*.json ./

RUN npm install
COPY . .

EXPOSE 8080
CMD [ "node", "index.js" ]