global.environment = 'development';

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
        url: 'http://my.site.com',
        //mongodb connection settings
        database: {
            host: 'sql2.freesqldatabase.com',
            user: 'sql2321059',
            password: 'yK2!xR2*',
            database: 'sql2321059',
            timezone: 'Z'
        }

    }
};

module.exports = config;