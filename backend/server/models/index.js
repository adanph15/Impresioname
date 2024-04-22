const config = require("../config/config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.database.DB,
    config.database.USER,
    config.database.PASSWORD,
    {
        host: config.database.HOST,
        dialect: "mysql",
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.direction = require("./direction.model")(sequelize, Sequelize);
db.article = require("./article.model")(sequelize, Sequelize);
db.purchase = require("./purchase.model")(sequelize, Sequelize);
db.carry = require("./carry.model")(sequelize, Sequelize);
db.user = require("./user.model")(sequelize, Sequelize);
db.temple = require("./temple.model")(sequelize, Sequelize);
db.templeTips = require("./templeTips.model")(sequelize, Sequelize);
db.frame = require("./frame.model")(sequelize, Sequelize);
db.lenses = require("./lenses.model")(sequelize, Sequelize);
db.printer = require("./printer.model")(sequelize, Sequelize);

///Associations///

db.direction.belongsTo(db.user, {foreignKey: 'user_id'});
db.user.hasMany(db.direction, {foreignKey: 'user_id'});

db.printer.belongsTo(db.user, {foreignKey: 'user_id'});
db.user.hasMany(db.printer, {foreignKey: 'user_id'});

db.temple.belongsTo(db.article, { foreignKey: 'article_id' });
db.article.hasOne(db.temple, { foreignKey: 'article_id' });

db.templeTips.belongsTo(db.article, { foreignKey: 'article_id' });
db.article.hasOne(db.templeTips, { foreignKey: 'article_id' });

db.frame.belongsTo(db.article, { foreignKey: 'article_id' });
db.article.hasOne(db.frame, { foreignKey: 'article_id' });

db.lenses.belongsTo(db.article, { foreignKey: 'article_id' });
db.article.hasOne(db.lenses, { foreignKey: 'article_id' });

db.purchase.hasOne(db.carry, {
    through: 'carry',
    foreignKey: 'purchase_id'
});

db.article.hasOne(db.carry, {
    through: 'carry',
    foreignKey: 'article_id'
});

db.user.hasOne(db.purchase, {
    through: 'purchase',
    foreignKey: 'user_id'
});

module.exports = db;