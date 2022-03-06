const AuthorController = {};

const models = require("../models/index");

AuthorController.getAll = async function(req, res) {
    const response = {};
    let responseCode = 200;

    try {
        const author = await models.Author.findAll({
            attributes: ["id", "name"],
        });
        if (author.length > 0) {
            response.author = author;
        } else {
            response.author = [];
            response.message = "There's no result";
        }
    } catch (err) {
        responseCode = 500;
        response.message = "There's something wrong: " + err;
    }

    res.status(responseCode).json(response);
};

AuthorController.getById = async function (req, res) {
    const response = {};
    let responseCode = 200;

    let reqId = req.params.id;
    if (isNaN(reqId)) {
        res.status(400).json({
            message: "Invalid url",
        });
    }

    try {
        let author = await models.Author.findOne({
            attributes: ["id", "name"],
            where: {
                id: parseInt(reqId),
            },
        });

        if (author) {
            response.author = author;
        } else {
            response.message = "Can't find the author";
            responseCode = 404;
        }
    } catch (err) {
        response.message = "There's something wrong: " + err;
        responseCode = 500;
    }

    res.status(responseCode).json(response);
};

AuthorController.create = async function (req, res) {
    const response = {};
    let statusCode = 201;
    const reqPayload = req.body;

    try {
        const createdAuthor = await models.Author.create(reqPayload);

        response.createdAuthor = createdAuthor;
        response.message = "Author successfully created";
    } catch (err) {
        responseCode = 500;
        response.message = "There's something wrong: " + err;
    }

    res.status(statusCode).json(response);
}

AuthorController.update = async function (req, res) {
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
        const updatedAuthor = await models.Author.update(reqPayload, {
            where: {
                id: parseInt(reqId),
            }
        });

        responseCode = 200;
        response.message = "Author successfully updated";
    } catch (err) {
        responseCode = 500;
        response.message = "There's something wrong: " + err;
    }

    res.status(responseCode).json(response);
}

AuthorController.delete = async function (req, res) {
    const response = {};
    let responseCode = 200;

    const reqId = req.params.id;
    if (isNaN(reqId)) {
        res.status(400).json({
            message: "Invalid url",
        });
    }

    try {
        await models.Author.destroy({
            where: {
                id: parseInt(reqId),
            } 
        });

        response.message = "Author successfully deleted";
    } catch (err) {
        response.message = "There's something wrong: " + err;
        responseCode = 500;
    }

    res.status(responseCode).json(response);
}


module.exports = {
    "controllerName": "AuthorController",
    AuthorController,
}