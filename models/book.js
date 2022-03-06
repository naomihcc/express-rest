const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../config/database/postgres");


/*** 
 * 
 * Model
 * 
*/

class Book extends Sequelize.Model {
    checkFunction(params) {
        return this.title;
    }
}

Book.init({
    id: {
        type: DataTypes.INTEGER,
        field: "id",
        autoIncrement: true,
        primaryKey: true,
    },

    title: {
        type: DataTypes.STRING,
        field: "title",
        allowNull: false,
    },

    year: {
        type: DataTypes.INTEGER,
        field: "year",
        allowNull: false,
    },

    authorId: {
        type: DataTypes.INTEGER,
        field: "author_id",
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
    tableName: "books",
    freezeTableName: false,
    timestamps: false,
});


module.exports = {
    "modelName": "Book",
    Book,
};