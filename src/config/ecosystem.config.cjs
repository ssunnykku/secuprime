module.exports = {
  apps: [
    {
      name: 'secuprime',
      script: '../index.js',
      instances: 'max',
      exec_mode: 'cluster',
      watch: false,
    },
  ],
};
