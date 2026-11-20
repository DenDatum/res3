const path = require('path');
const { Sequelize } = new Sequelize({
    dialect:'sqlite',
    storage: path.join(__dirname, '..', 'users.sqlite'),
    logging: false
});

module.exports = sequelize;