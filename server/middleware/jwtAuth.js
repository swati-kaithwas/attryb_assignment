const jwt = require("jsonwebtoken");
const  User = require("../model/user");
let secretForJWT = "elysiancorptech";

var verifyJetToken = async function (token) {
    try {
        let decoded = await jwt.verify(token, secretForJWT);
        if (decoded) return decoded;
    } catch (error) {
        console.log("jwt verify error: ", error);
        throw error;
    }
};

module.exports = {
    jwtChecker: function (req, res, next) {
        const authorizationHeader = req.headers.authorization;
        if (authorizationHeader) {
            var values = req.headers.authorization.split(" ");
            var token = values[0].length > 20 ? values[0] : values[1];
            if (token) {
                verifyJetToken(token)
                    .then((userData) => {
                        if (userData) {
                            if (userData.userRole == "user") {
                                User.findById(userData.userId).then((user) => {
                                    if (user) {
                                        if (!user.userToken)
                                            return res.status(401).json({
                                                status: false,
                                                message: "You are logged out, Please login again.",
                                            });
                                        req.tokenData = userData;
                                        next();
                                    } else {
                                        return res.status(401).json({
                                            status: false,
                                            message: "Token expired, Please login again.",
                                        });
                                    }
                                });
                            } else {
                                //her ewe have code for admin

                                //for now
                                return res.status(401).status({
                                    status: false,
                                    message: "You are not authorized to perform this operation.",
                                });
                            }
                        } else
                            return res.status(401).json({
                                status: false,
                                message: "Token expired.",
                            });
                    })
                    .catch((err) => {
                        return res.status(401).json({
                            status: false,
                            message: err.message,
                        });
                    });
            } else
                return res.status(401).json({
                    status: false,
                    message: "Token required.",
                });
        } else {
            return res.status(401).json({
                status: false,
                message: "You are not authorized to perform this operation.",
            });
        }
    },
    setJwtToken: async function (userData) {
        return await jwt.sign(userData, secretForJWT, {
            expiresIn: process.env.JWT_EXPIRE_TIME,
        });
    },
    validateToken: async function (token) {
        if (token) {
            const res = await verifyJetToken(token);
            if (res) {
                userId = res.user._id;
                // check userId available
                const user = await admin.findOne({
                    _id: userId,
                });
                if (user) {
                    return true;
                } else {
                    return false;
                }
            } else return false;
        }
    },
};
