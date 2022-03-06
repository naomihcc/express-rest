const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../config/database/postgres");


/*** 
 * 
 * Model
 * 
*/

class Role extends Sequelize.Model {
}

Role.init({
    id: {
        type: DataTypes.STRING,
        field: "id",
        autoIncrement: "true",
        primaryKey: true,
    },

    name: {
        type: DataTypes.STRING,
        field: "name",
        allowNull: false,
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
    tableName: "roles",
    freezeTableName: false,
    timestamps: false,
});


module.exports = {
    "modelName": "Role",
    Role,
};