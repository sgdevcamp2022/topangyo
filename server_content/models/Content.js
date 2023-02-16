module.exports = (sequelizeConfig, Sequelize) => {
    // Set Model
    const Content = sequelizeConfig.define(
        'content',
        {
            postPK: {
                type: Sequelize.BIGINT
                ,primaryKey: true
                ,autoIncrement: true
            },
            title: {
                type: Sequelize.STRING
            },
            description: {
                type: Sequelize.STRING
            },

            author_name: {
                type: Sequelize.STRING
            },
            author_nickname: {
                type: Sequelize.STRING
            },
            author_id: {
                type: Sequelize.STRING
            },

            category:{
                type: Sequelize.STRING
            },

            memberLimit:{
                type: Sequelize.INTEGER
            },

            imageURL:{
                type: Sequelize.STRING
            },

            location_latitude:{
                type: Sequelize.DOUBLE
            },
            location_longitude:{
                type: Sequelize.DOUBLE
            },

            meetTime:{
                type: Sequelize.DATE
            },
            
            recruitStatus:{
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            matchingStatus:{
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },

            createdAt:{
                type: Sequelize.DATE
                ,defaultValue: Sequelize.NOW
            },

        },

        { timestamps: false }
    );

    return Content;
};