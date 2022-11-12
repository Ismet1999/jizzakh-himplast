
FROM node:16-alpine
# add bash
WORKDIR /app
# https://stackoverflow.com/a/32785014/232619

# install dependencies
COPY package.json .

RUN npm install
RUN npm install --save-dev nodemon

COPY . /app 

EXPOSE 5000

CMD ["npm", "run", "dev"]