# **Getting Started**

## Production (Docker Container)
Under construction...

## Development (Standalone Web Service)
### Quick setup
This project run with bower dependencies, so make sure you have Is installed. Else:
```
npm install bower -g
```
1. Install Back-end dependencies
```
npm install
```
2. Install Front-end dependencies
```
bower install
```
3. Start ExpressJS web Service
```
npm start
```

4. Wait for terminal to finish setup and enjoy at: `localhost:3000`

### Advanced setup

Any configuration **MUST** be specified before initiating app. If you want to change any configuration after that, you'll need to wipe PostgreSQL database or delete SQLite3 database file.

#### Browser-sync (Dev Front-en only)
If you want your bower to be automatically updated when any front-end file is updated:

1. Run Express Web Service with one terminal
```
npm start
```
2. Run Browser-sync on another terminal with this:
```
npm run serve
```

This will run the utility **Browser-sync** and will serve front-end files.

* If any problem with port binding or just wondering How front-end requests are dynamically set for this options?. That's because It also uses a **Gulp** task to render the `REST_URL` variable at the AngularJS  service `resouer.service.tempalted.js`. For more information checkout `package.json` or `frontend` task at `gulpfile.js`

##### Configuration File
For dev environment, configuration is placed at `/server/configs/configs.js` inside  `development` object.
```
development: {
    NODE_ENV: 'development',
    PORT: 3000,
    ...
}
```

#### Application Users
Access are specified at config file by:
```
development: {
  ADMIN_USER:  '{AdminPassword}',
  ADMIN_PASS:  '{AdminPassword}',
  PUBLIC_USER: '{PublicUser}',
  PUBLIC_PASS: '{PublicUserPassword}',
    ...
}
```

#### Database
This App supports **PostgreSQL** and **SQLite3** databases. By default **SQLite3** is selected, that's why you can hit `npm start` right away and it will start saving data. To specify configuration:

* To use **SQLite3** as database, set:
```
development: {
    DB_CLIENT: 'sqlite3',
    DB_FILE: '{AnyStringYouWantYourFileToBeNamed}'
}
```  
  * Database file will at: `/database`

* To use **PostgreSQL**  as database, set:
```
development: {
    DB_CLIENT: 'pg',
    DB_HOST: '{PostgreSQLHost}',
    DB_NAME: '{AnyStringYouWantYourDatabaseToBeNamed}',
    DB_USER: '{AnyUserWithPermissionsUnderDatabase}',
    DB_PASS: '{DB_USERPassword}',
}
```



### Troubleshoot

* **My Front-end requests are failing due Request URL mismatch**
This problem may occur if you are running back and front ends in different contexts. To manually set, run `gulp frontend --env dev --port [Specify port Here]`. If any port is provided, requests will be send to Relative PATH, else to https://localhost:[YourPort]

## How It Works?
Under construction...



## Environment Variables
Under construction...
