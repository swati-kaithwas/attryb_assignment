const sendResponse = require("../helper/responseSender");
 const setJwtToken = require("../middleware/jwtAuth");
const Userservice = require("../service/user");
const crypto = require("crypto-js");
const validator = require("email-validator");
const signup = async (req, res) => {
  try {
    /*
    1. email,name,password is required!
    2.vaildate name ,email,password
    */
    let lowerCaseLetters = /[a-z]/g;
    let upperCaseLetters = /[A-Z]/g;
    let numbers = /[0-9]/g;
    let spChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    const { email, name, password } = req.body;
    //   validate field
    if (!email || !password || !name)
      return sendResponse(res, 400, {
        sataus: false,
        message: "Please fill all details",
      });
    else if (spChars.test(name) || name.match(numbers)) {
      return sendResponse(res, 400, {
        sataus: false,
        messaage: "name must not have special characters and numbers !",
      });
    } else if (!validator.validate(email)) {
      return sendResponse(res, 400, {
        status: false,
        message: "please enter correct email",
      });
    } else if (!password.match(upperCaseLetters) || password.length < 8) {
      return sendResponse(res, 400, {
        status: false,
        message: "Password must have at least 8 characters and one uppercase!",
      });
    }

    let checkuser = await Userservice.findUserByMail(email);
    console.log("dfghj", checkuser);
    if (checkuser) {
      return sendResponse(res, 400, {
        status: false,
        message: "Email already exist",
      });
    }
    let Key = "swatikaithwas";
    let hashedPass = crypto.HmacSHA512(password, Key);
    const user = await Userservice.create({
      email: email.toLowerCase(),
      password: hashedPass,
      name: name,
    });
    if (!user)
      return sendResponse(res, 400, {
        status: false,
        message: "somthing went wrong....",
      });
    return sendResponse(res, 200, {
      status: true,
      data: user,
      message: "Singup Success",
    });
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, {
      satus: false,
      message: "Internal Error",
    });
  }
};

const login = async (req, res) => {
    try {
      /*
          1.email,password is required
          */
  
      const { email, password } = req.body;
      // validate field
      if (!email || !password) {
        return sendResponse(res, 400, {
          status: false,
          message: " Email or Password is required!",
        });
      }
      //   check if user is exist
      let isExist = await Userservice.findUserByMail(email);
      console.log("isExist", isExist);
      if (!isExist)
        return sendResponse(res, 400, {
          status: false,
          message: "Either email or password incorrect.",
        });
      // compare password
      let isPasswordCorrect = await Userservice.validatePassword(
        password,
        isExist.password
      );
      console.log(isPasswordCorrect, "isPass");
      if (!isPasswordCorrect)
        return res.send({
          status: false,
          messaage: "incorrect",
        });
      // apply jwt token
      isExist.userToken = await setJwtToken({
        userId: isExist._id,
        userRole: isExist.user_role,
      });
      res.status(200).json({ status: true, data: isExist });
      isExist.save();
    } catch (error) {
      console.log(error);
      return sendResponse(res, 500, {
        satus: false,
        message: "Internal Error",
      });
    }
  };


  const UpadteProfile = async (req, res) => {
    try {
      /*
          1. id is required
          */
      let { id, name } = req.body;
      if (!id)
        return sendResponse(res, 400, {
          status: false,
          message: " Id is required !",
        });
      let obj = {
        id,
        name,
      };
      // update profile function
      let content = await Userservice.updateProfile(id, obj);
  
      if (!content)
        return sendResponse(400, res, {
          status: false,
          message: "profile not update !",
        });
      return res.status(200).send({
        status: true,
        data: content,
        message: "sucessfully update profile!",
      });
    } catch (error) {
      console.log(error);
      return sendResponse(res, 500, {
        status: false,
        message: "Internal Error!",
      });
    }
  };
  const logout = async (req, res) => {
    try {
      /*
          1.user token =null
          */
      let isLoggedOut = await userServices.logout(req.tokenData);
      if (!isLoggedOut)
        return res
          .status(400)
          .json({ status: false, message: "Unable to logout." });
      res.status(200).json({ status: true, message: "successfully logged out" });
    } catch (error) {
      console.log("error in logout api: ", error);
      res.status(500).json({ status: false, message: "Internal error" });
    }
  };
  
  module.exports = {
    signup,
    login,
    UpadteProfile,
    logout,
  
    
  };