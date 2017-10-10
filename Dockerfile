FROM monostream/nodejs-gulp-bower

RUN mkdir -p /home/api

WORKDIR /home/api

COPY . .

ENV NODE_ENV=production VALIDATE_DB=ON DELAY_CONNECTION=1000 DB_CLIENT=sqlite3 DB_FILE=database ADMIN_USER=admin ADMIN_PASS=admin PUBLIC_USER=user PUBLIC_PASS=user PORT=3000 VALIDATE_DB=ON

EXPOSE 3000

RUN npm install
RUN bower install --allow-root

RUN npm run build-prod

CMD ["npm", "start"]
