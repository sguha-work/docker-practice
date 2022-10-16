FROM node:18.9.0
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm i
COPY . .
EXPOSE 1000
CMD ["node","index.js"]