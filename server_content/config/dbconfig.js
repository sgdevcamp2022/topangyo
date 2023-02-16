module.exports = {
    host: 'db-fapub.pub-cdb.ntruss.com',
    username: 'smilegateCAMP',
    password: 'Smi!egaTe0130',
    db: 'dsgsmile',
    dialect: 'mysql',
    timezone: 'Asia/Seoul',
    dateStrings : 'date',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};