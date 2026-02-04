// Database configuration for MongoDB Atlas
const config = {
    // MongoDB Atlas connection details
    host: process.env.DB_HOST || 'cluster0.ummyuou.mongodb.net',
    user: process.env.DB_USER || 'admin',
    password: process.env.DB_PASSWORD || 'Kaviyashree@24',
    dbName: process.env.DB_NAME || 'hotelusers'
};

// Get configuration based on environment
function getConfig() {
    return config;
}

// Get MongoDB URI
function getMongoURI() {
    const cfg = getConfig();
    return `mongodb+srv://${cfg.user}:${encodeURIComponent(cfg.password)}@${cfg.host}/${cfg.dbName}?retryWrites=true&w=majority`;
}

module.exports = {
    getConfig,
    getMongoURI,
    ...config
};
