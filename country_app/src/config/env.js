const env = {
    development: {
        // API_BASE_URL: 'http://192.168.1.4:8091'
        API_BASE_URL: 'https://countrynestback.dynac.space'
    },
    test: {
        API_BASE_URL: 'https://countrynestback.dynac.space'
    },
    production: {
        API_BASE_URL: 'https://countrynestback.dynac.space' // Replace with your Render.com URL
    }
};

const environment = process.env.NODE_ENV || 'development';
export default env[environment]; 