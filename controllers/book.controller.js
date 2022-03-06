const BookController = {};

const models = require("../models/index");

BookController.getAll = async function (req, res) {
    const response = {};
    let responseCode = 200;

    try {
        const books = await models.Book.findAll({
            attributes: ["id", "title", "year"],
            include: [{
                attributes: [["name", "author_name"]],
                model: models.Author,
            }],
        });
        if (books.length > 0) {
            response.books = books;
        } else {
            response.books = [];
            response.message = "There's no result";
        }
    } catch (err) {
        responseCode = 500;
        response.message = "There's something wrong: " + err;
    }

    res.status(responseCode).json(response);
};

BookController.getById = async function (req, res) {
    const response = {};
    let responseCode = 200;

    let reqId = req.params.id;
    if (isNaN(reqId)) {
        res.status(400).json({
            message: "Invalid url",
        });
    }

    try {
        let book = await models.Book.findOne({
            attributes: ["id", "title", "year"],
            where: {
                id: parseInt(reqId),
            },
            include: [{
                attributes: [["name", "author_name"]],
                model: models.Author,
            }],
        });

        if (book) {
            response.book = book;
        } else {
            response.message = "Can't find the book";
            responseCode = 404;
        }
    } catch (err) {
        response.message = "There's something wrong: " + err;
        responseCode = 500;
    }

    res.status(responseCode).json(response);
};

BookController.create = async function (req, res) {
    const response = {};
    let statusCode = 201;
    const reqPayload = req.body;

    try {
        const createdBook = await models.Book.create(reqPayload);

        response.createdBook = createdBook;
        response.message = "Book successfully created";
    } catch (err) {
        responseCode = 500;
        response.message = "There's something wrong: " + err;
    }

    res.status(statusCode).json(response);
}

BookController.update = async function (req, res) {
    const response = {};
    let responseCode = 200;
    const reqPayload = req.body;

    const reqId = req.params.id;
    if (isNaN(reqId)) {
        res.status(400).json({
            message: "Invalid url",
        });
    }

    try {
        const updatedBook = await models.Book.update(reqPayload, {
            where: {
                id: parseInt(reqId),
            }
        });

        responseCode = 200;
        response.message = "Book successfully updated";
    } catch (err) {
        responseCode = 500;
        response.message = "There's something wrong: " + err;
    }

    res.status(responseCode).json(response);
}

BookController.delete = async function (req, res) {
    const response = {};
    let responseCode = 200;

    const reqId = req.params.id;
    if (isNaN(reqId)) {
        res.status(400).json({
            message: "Invalid url",
        });
    }

    try {
        await models.Book.destroy({
            where: {
                id: parseInt(reqId),
            } 
        });

        response.message = "Book successfully deleted";
    } catch (err) {
        response.message = "There's something wrong: " + err;
        responseCode = 500;
    }

    res.status(responseCode).json(response);
}


module.exports = {
    "controllerName": "BookController",
    BookController,
};