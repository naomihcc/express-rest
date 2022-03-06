const AuthController = {};

const jwt = require("jsonwebtoken");
const models = require("../models/index");
const getJwtConfig = require("../config/auth/jwt-key");

AuthController.login = async function (req, res) {
    let responseCode = 200; let response = {};
    const { email, password, roleChoosen } = req.body;

    const userFound = await models.User.findOne({
        where: {
            email: email,
        },
        include: [{
            attributes: ["id", "name"],
            model: models.Role,
        }],
    }); 

    if (userFound) {
        const checkPassword = await userFound.validatePassword(password);
        if (checkPassword) {
            const roleChecked = userFound.Roles.find(r => r.name === roleChoosen);
            if (roleChecked) {
                const token = jwt.sign({ sub: userFound.id, role: roleChecked.id }, getJwtConfig());
                response.token = token;
            } else {
                responseCode = 400;
                response.message  = "Role not found";
            }
        } else {
            responseCode = 400;
            response.message  = "Wrong password";
        }
    } else {
        responseCode = 400;
        response.message  = "User not found";
    }
    
    res.status(responseCode).json(response);
};


module.exports = {
    "controllerName": "AuthController",
    AuthController,
}