const env = {
    development: {
        // API_BASE_URL: 'http://192.168.1.4:8091'
        API_BASE_URL: 'http://localhost:8091'
    },
    test: {
        API_BASE_URL: 'http://localhost:8091'
    },
    production: {
        API_BASE_URL: 'http://localhost:8091' // Replace with your Render.com URL
    }
};

const environment = process.env.NODE_ENV || 'development';
export default env[environment]; 