module.exports = (sequelize, Sequelize) => {
    const temple = sequelize.define("temple", {
        filename: {
            type: Sequelize.STRING
        },
        color: {
            type: Sequelize.STRING
        },
        article_id: {
            type: Sequelize.INTEGER
        }
    }, { timestamps: false });
    return temple;
};