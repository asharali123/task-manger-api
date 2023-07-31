const jwt = require("jsonwebtoken")
const userSchema = require("../schema/userSchema.js");

const checkUserAuth = async (req, resp, next) => {
    let token;
    const { authorization } = req.headers
    if (authorization && authorization.startsWith("Bearer")) {
        try {
            //split the token
            token = authorization.split(" ")[1];

            //verify token
            const { userID } = jwt.verify(token, process.env.JWT_SERECT_KEY)

            // get userfrom token
            req.user = await userSchema.findById(userID).select("-password");
            next();
        } catch (error) {
            console.log(error)
            resp.status(401).send({ "status": "failed", "message": "Unauthorized user" })
        }
    } else { resp.status(401).send({ "status": "failed", "message": "NO token found" }) }
    // if (!token) {
    //     resp.status(401).send({ "status": "failed", "message": "NO token found" })
    // }
}
module.exports = checkUserAuth