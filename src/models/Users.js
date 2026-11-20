const {DataTypes} = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../db');

const User = sequelize.define('User', {
username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate:{
        notEmpty: {
            msg:"dccd"
        },
        len: {
            args: [2, 60],
            msg:"dccd"
        }
    }
},
email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate:{
        isEmail: {
            msg:"dcddc"
        },
        notEmpty: {
            msg:"cdcd"
        }
    }
},
password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
        len: {
            args:[6, 1000],
            msg:"dcd"
        }
    }
}, {
    tabelName:'users',
    timestamps: true,
    hooks: {
        beforeCreate:async (user) => {
            if(user.password) {
                user.password = await bcrypt.hash(user.password, 10);
            }
        },
        beforeUpdate: async (user) => {
            if(user.changed('password')) {
                user.password = await bcrypt.hash(user.password, 10);
            }
        }
    }
}
});
module.exports = User;