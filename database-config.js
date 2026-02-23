// Database configuration for MongoDB Atlas
const config = {
    // MongoDB Atlas connection details
    host: process.env.DB_HOST || 'tastyfoods.94v2zd3.mongodb.net',
    user: process.env.DB_USER || 'admin_db_user',
    password: process.env.DB_PASSWORD || 'Kaviyashree',
    dbName: process.env.DB_NAME || 'tastyfoods'
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
    host: config.host,
    user: config.user,
    password: config.password,
    dbName: config.dbName
};
