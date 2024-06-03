module.exports = (sequelize, Sequelize) => {
    const templeTips = sequelize.define("templeTips", {
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
    return templeTips;
};