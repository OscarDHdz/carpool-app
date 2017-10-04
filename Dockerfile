FROM node:alpine

RUN mkdir -p /home/api

WORKDIR /home/api

COPY . .

ENV NODE_ENV=prod
ENV VALIDATE_DB=ON
ENV DELAY_CONNECTION=1000

RUN npm install

CMD ["npm", "start"]
