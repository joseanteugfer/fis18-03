FROM node:10.14-stretch-slim

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY index.js .
COPY server.js .
COPY apikeys.js .
COPY ordenesPago.js .
COPY ordenesPago.json .
COPY dist dist

#RUN ng build --prod
ENV NODE_ENV=production

EXPOSE 3000
CMD npm start