FROM node:16
WORKDIR /usr/src/app
COPY package.json ./
# Checking if package-lock file exists or not, if exists then deleting it
RUN rm -f package-lock.json
# Checking if node_modules folder exists or not, if exists then deleting it
RUN rm -rf node_modules
# Installing global packages
RUN npm install nodemon -g
# Installing local packages
RUN npm i
COPY . .
# If you are building your code for production
#RUN npm ci --only=production
EXPOSE 3000
CMD [ "nodemon", "./bin/www" ]

###############################################################################
#   Assumin the local app folder name is "express-app"                        #
#   To build this image run                                                   #
#   docker build -t express-app .                                             #
#   To run this image use                                                     #
#   docker run -p 3000:3000 -v cd:/usr/src/app express-app nodemon ./bin/www  #
###############################################################################