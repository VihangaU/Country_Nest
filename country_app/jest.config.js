module.exports = {
    transform: {
        '^.+\\.js$': 'babel-jest',  // This tells Jest to transform JavaScript files using Babel
    },
    transformIgnorePatterns: [
        '/node_modules/(?!axios|react-router-dom)/',  // This ensures that axios and react-router-dom are also transformed
    ],
    moduleNameMapper: {
        '^react-router-dom$': require.resolve('react-router-dom'), // Ensures Jest resolves react-router-dom correctly
    },
    testEnvironment: 'jsdom',  // Ensure tests run in a browser-like environment (required for React)
};
