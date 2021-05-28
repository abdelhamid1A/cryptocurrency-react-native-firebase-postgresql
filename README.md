# cryptocurrency-react-native-firebase-postgresql
inside the server folder add folder config/config.json 
content in config : 
```json
{
  "development": {
    "username": "postgres",
    "password": "password",
    "database": "cryptoDB",
    "host": "127.0.0.1",
    "port": 5432,
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "port": 5432,
    "dialect": "mysql"
  },
  "production": {
    "username": "username",
    "password": "password",
    "database": "database",
    "host": "host",
    "port": 5432,
    "dialect": "postgres",
    "ssl": true,
    "protocol": "postgres",

    "logging": true, 
    "dialectOptions": { 
        "ssl": {
            "require": true,
            "rejectUnauthorized": false 
        }
    }
  }
}
```
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