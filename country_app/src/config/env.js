const env = {
    development: {
        // API_BASE_URL: 'http://192.168.1.4:8091'
        API_BASE_URL: 'http://13.53.32.227:8091'
    },
    test: {
        API_BASE_URL: 'http://192.168.1.4:8091'
    },
    production: {
        API_BASE_URL: 'https://your-render-app-name.onrender.com' // Replace with your Render.com URL
    }
};

const environment = process.env.NODE_ENV || 'development';
export default env[environment]; 