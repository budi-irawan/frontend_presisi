module.exports = {
    apps: [
      {
        name: 'nama-aplikasi',
        script: './node_modules/@vue/cli-service/bin/vue-cli-service.js',
        args: 'serve',
        instances: 1,
        autorestart: true,
        watch: false,
        max_memory_restart: '1G',
        env: {
          NODE_ENV: 'production',
          PORT: 8080
        }
      }
    ]
  };
  