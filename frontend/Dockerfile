FROM node:16-alpine
WORKDIR /app/frontend

COPY package.json package-lock.json ./
RUN npm i

COPY . ./
EXPOSE 3000