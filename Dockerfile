FROM node:21-alpine

WORKDIR /

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

RUN npm run build

CMD ["node", "dist/main.js"]