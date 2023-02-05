module.exports = {
    host: '127.0.0.1',
    username: 'smilegateCAMP',
    password: 'Smi!egaTe0130',
    db: 'smilegate',
    dialect: 'mysql',
    timezone: '+09:00',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};