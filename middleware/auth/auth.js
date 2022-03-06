const jwt = require("express-jwt");
const getJwtConfig = require("../../config/auth/jwt-key");
const models = require("../../models/role");

const _getRoleByName = async (name) => {
    let role = await models.Role.findOne({
        attributes: ["id", "name"],
        where: {
            name: name,
        },
    });

    return role;
};

const Authorize = (roles = []) => {
    if (typeof roles === 'string') {
        roles = [roles];
    }

    const secret = getJwtConfig();
    return [
        jwt({secret, algorithms:["HS256"]}),

        async (req, res, next) => {
            let isPass = false;
            for (let role of roles) {
                const roleFound = await _getRoleByName(role);
                if (roleFound.id === req.user.role) {
                    isPass = true;
                }
            }

            if (isPass) {
                next();
            } else {
                res.status(401).json({ message: 'Unauthorized' });
            }
        },
    ];
};


module.exports = Authorize;