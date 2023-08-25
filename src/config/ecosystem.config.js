module.exports = {
  apps: [
    {
      name: 'my-app',
      script: './src/index.js',
      interpreter: '/home/ubuntu/.nvm/versions/node/v19.8.1/bin/ts-node',
      exec_mode: 'fork',
      watch: true,
      env: {
        NODE_ENV: 'development',
      },
    },
  ],
};
