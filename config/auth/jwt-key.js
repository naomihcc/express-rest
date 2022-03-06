require("dotenv").config();

JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

const getJwtKey = () => (JWT_SECRET_KEY);


module.exports = getJwtKey;