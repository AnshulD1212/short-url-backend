FROM node:19.8.1-alpine3.16
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN npm install -g yarn --force && yarn
COPY . .
ENV PORT=4000
EXPOSE 4000
RUN yarn run build
CMD ["yarn","start"]