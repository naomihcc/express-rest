const { DataTypes, Deferrable } = require("sequelize");
const sequelize = require("../config/database/postgres");
const { User } = require("./user");
const { Role } = require("./role");

/***
 * 
 * Model
 * 
*/
const UsersToRole = sequelize.define("UsersToRoles", {
    id: {
        type: DataTypes.INTEGER,
        field: "id",
        autoIncrement: true,
        primaryKey: true,
    },

    user_id: {
        type: DataTypes.STRING,
        field: "user_id",
        references: {
            model: User,
            key: "id",
            deferrable: Deferrable.INITIALLY_IMMEDIATE,
        }
    },

    role_id: {
        type: DataTypes.STRING,
        field: "role_id",
        references: {
            model: Role,
            key: "id",
            deferrable: Deferrable.INITIALLY_IMMEDIATE,
        }
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
    tableName: "users_to_roles",
    freezeTableName: false,
    timestamps: false,
});

User.belongsToMany(Role, {
    through: UsersToRole,
    foreignKey: "user_id",
    otherKey: "role_id",
})
Role.belongsToMany(User, {
    through: UsersToRole,
    foreignKey: "role_id",
    otherKey: "user_id",
})


module.exports = {
    "modelName": "UsersToRole",
    User,
};