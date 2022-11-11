
FROM node:16-alpine
# add bash
WORKDIR /app
# https://stackoverflow.com/a/32785014/232619

# install dependencies
COPY package.json .

RUN npm install

COPY . /app 

EXPOSE 5000

CMD ["npm", "start"]