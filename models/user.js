const { Sequelize, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const sequelize = require("../config/database/postgres");

/***
 * 
 * Model
 * 
*/
class User extends Sequelize.Model {
    async validatePassword(password) {
        return await bcrypt.compare(password, this.password);
    }
}

User.init({
    id: {
        type: DataTypes.STRING,
        field: "id", 
        primaryKey: true,
        allowNull: false,
    },

    name: {
        type: DataTypes.STRING,
        field: "name",
        allowNull: false,
    },

    email: {
        type: DataTypes.STRING,
        field: "email",
        allowNull: false,
        validate: {
            isEmail: {
                args: true,
            }
        }
    },

    password: {
        type: DataTypes.STRING,
        field: "password",
        allowNull: false,
    },

    avatar_path: {
        type: DataTypes.STRING,
        field: "avatar_path",
    },

    verification_code: {
        type: DataTypes.STRING,
        field: "verification_code",
    },

    email_verification_sent_at: {
        type: DataTypes.DATE,
        field: "email_verification_sent_at",
    },

    created_at: {
        type: DataTypes.DATE,
        field: "created_at",
    },

    updated_at: {
        type: DataTypes.DATE,
        field: "updated_at",
    },
}, {
    sequelize,
    tableName: "users",
    freezeTableName: false,
    timestamps: false,
});


module.exports = {
    "modelName": "User",
    User,
};