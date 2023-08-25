require('dotenv').config();

module.exports = {
  apps: [
    {
      name: 'secuprime',
      script: '../index.js',
      instances: 'max',
      exec_mode: 'cluster',
      watch: false,
      env: {
        ...process.env,
      },
      env_production: {
        ...process.env,
      },
    },
  ],
};
