const env = {
    development: {
        API_BASE_URL: 'http://192.168.1.4:8091'
    },
    test: {
        API_BASE_URL: 'http://192.168.1.4:8091'
    }
};

const environment = process.env.NODE_ENV || 'development';
export default env[environment]; 