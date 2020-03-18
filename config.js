global.environment = 'production';

var config = {

    development: {
        //url to be used in link generation
        url: 'http://localhost:8000',
        //mysql connection settings
        database: {
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'job',
            timezone: 'Z'
        }
    },
    production: {
        //url to be used in link generation
        url: 'http://localhost:8000',
        //mongodb connection settings
        database: {
            host: '192.168.1.11',
            user: 'adarsh',
            port: '8457',
            password: 'password',
            database: 'job',
            timezone: 'Z'
        }

    }
};

module.exports = config;