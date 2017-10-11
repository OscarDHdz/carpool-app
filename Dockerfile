# This is the "Quick Start" Dockerfile. It contains gulp, bower, and
# RAW dependencies. For a more light/prod container, refer to "Dockerfile_Jenkinsfile"
# as that one is Used by Jenkins CI/CD pipeline.

FROM monostream/nodejs-gulp-bower

RUN mkdir -p /home/app

WORKDIR /home/app

COPY . .


ENV NODE_ENV=production VALIDATE_DB=ON DELAY_CONNECTION=1000 DB_CLIENT=sqlite3 DB_FILE=database ADMIN_USER=admin ADMIN_PASS=admin PUBLIC_USER=user PUBLIC_PASS=user PORT=3000 VALIDATE_DB=ON

EXPOSE 3000

RUN npm install
RUN npm install --only=dev
RUN bower install --allow-root

RUN npm run build-prod

CMD ["npm", "start"]
