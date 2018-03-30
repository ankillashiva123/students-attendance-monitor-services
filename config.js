var config = {
    production: {
        database: 'mongodb://serviceuser:123456@ds227469.mlab.com:27469/studentbd',
    },
    default: {
        database: 'mongodb://localhost:27017/Studentdb',
    }
}

exports.get = function get(env) {
    return config[env] || config.default;
}