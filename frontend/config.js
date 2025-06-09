// config.js
const env = process.env.REACT_APP_ENV || 'local';

const configs = {
  local: {
    API_URL: 'http://my-bible-backend:8080'
  },
  production: {
    API_URL: 'https://my-bible-backend-xyz.a.run.app'
  }
};

export default configs[env];
