const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../config/database/postgres");
const { Book } = require("./book");


/***
 * 
 * Model
 * 
 */

class Author extends Sequelize.Model {

}

Author.init({
    id: {
        type: DataTypes.INTEGER,
        field: "id", 
        autoIncrement: true,
        primaryKey: true,
    },

    name: {
        type: DataTypes.STRING,
        field: "name"
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
    tableName: "authors",
    freezeTableName: false,
    timestamps: false,
});
Author.hasMany(Book, {foreignKey: "author_id"});
Book.belongsTo(Author, {foreignKey: "author_id"});


module.exports = {
    "modelName": "Author",
    Author,
}