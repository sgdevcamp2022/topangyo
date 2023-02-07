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

<<<<<<< HEAD
=======
            memberLimit:{
                type: Sequelize.INTEGER
            },

>>>>>>> backend
            imageURL:{
                type: Sequelize.STRING
            },

            location_latitude:{
                type: Sequelize.DOUBLE
            },
            location_longitude:{
                type: Sequelize.DOUBLE
            },

<<<<<<< HEAD
=======
            meetTime:{
                type: Sequelize.DATE
            },

>>>>>>> backend
            createdAt:{
                type: Sequelize.DATE
                ,defaultValue: Sequelize.NOW
            },

        },

        { timestamps: false }
    );

    return Content;
};