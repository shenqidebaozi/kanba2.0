'use strict';

module.exports = appInfo => {
  const config = exports = {
    mysql: {
      client: {
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: '970221',
        database: 'kanba',
      },
      app: true,
      agent: false,
    },

  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1523769154158_354';

  // add your config here
  config.middleware = [];

  return config;
};
