const jsonwebtoken = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        const token = req.header.authorization.split(" ")[1]
        const privateKey = "teste123"

        const decoded = jsonwebtoken.verify(token, privateKey, {algorithms: 'HS256'})
        next()
    } catch (error) {
        return res.status(401).json({
            message: "Usuario não autenticado!"
        })
    }
}