module.exports = {
  apps: [
    {
      script: '../index.js',
      instances: 1,
      autorestart: false,
      watch: false,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'http://sunhee.duckdns.org/',
      ref: 'origin/main',
      repo: 'https://github.com/ssunnykku/secuprime.git',
      path: '/home/ubuntu/secuprime',
      'pre-deploy-local': '',
      'post-deploy':
        'npm install && npm run build && pm2 reload ecosystem.config.js',
    },
  },
};
