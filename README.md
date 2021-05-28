# cryptocurrency-react-native-firebase-postgresql
inside the server folder add folder config/config.json </br>
content in config : </br>
{</br>
  "development": {</br>
    "username": "postgres",</br>
    "password": "password",</br>
    "database": "cryptoDB",</br>
    "host": "127.0.0.1",</br>
    "port": 5432,</br>
    "dialect": "postgres"</br>
  },</br>
  "test": {</br>
    "username": "root",</br>
    "password": null,</br>
    "database": "database_test",</br>
    "host": "127.0.0.1",</br>
    "port": 5432,</br>
    "dialect": "mysql"</br>
  },</br>
  "production": {</br>
    "username": "username",</br>
    "password": "password",</br>
    "database": "database",</br>
    "host": "host",</br>
    "port": 5432,</br>
    "dialect": "postgres",</br>
    "ssl": true,</br>
    "protocol": "postgres",</br>

    "logging": true, </br>
    "dialectOptions": { </br>
        "ssl": {</br>
            "require": true,</br>
            "rejectUnauthorized": false </br>
        }</br>
    }</br>
  }</br>
}</br>
the first part "development" is very important that for local database </br>
the last one is optional you don't need to change anything just copy it </br>
creat a .env in server </br>
inside the .env add : </br>
JWT_KEY=private_key</br>
the same thing add .env in client and add this elements : </br>
API_KEY=</br>
AUTH_DOMAIN=</br>
MESSAGE_SENDER_ID=</br>
APP_ID=</br>
PROJECT_ID=</br>
STORAGE_BUCKET=</br>
API_URL=LAN after run</br>
API_HEROKU=API link </br>
the 6 first elements for firebase config </br>