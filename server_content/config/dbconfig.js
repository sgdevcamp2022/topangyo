module.exports = {
    host: 'smilegateinstance.cjdo7bhd55cs.ap-northeast-1.rds.amazonaws.com',
    username: 'smilegateCAMP',
    password: 'Smi!egaTe0130',
    db: 'smilegate',
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