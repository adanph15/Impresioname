const Glasses = require('./models/Glasses');
const Delivery = require('./models/Delivery');
const User = require('./models/User');
const Direction = require('./models/Direction');

// 1a1
// Usuario tiene una direccion
User.hasOne(Direction);
Direction.belongsTo(User);

// ManyToMany
// the glasses belongs to many deliveries
// create new table
Glasses.belongsToMany(Delivery, { through: "carry"});
Delivery.belongsToMany(Glasses, { through: "carry"});
