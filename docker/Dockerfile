FROM node:19.8.1-alpine3.16
WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . .
ENV PORT=4000
EXPOSE 4000
CMD ["yarn", "start"]
