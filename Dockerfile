# FROM nginx:1.19.6-alpine
# EXPOSE 80

FROM node:16
# add bash
WORKDIR /app
# https://stackoverflow.com/a/32785014/232619

# RUN apt-get update && apt-get install -y nginx
# install dependencies
COPY package.json .

RUN npm install
# RUN npm rebuild bcrypt --build-from-source

COPY . /app 

EXPOSE 5000

CMD ["node", "index.js"]


