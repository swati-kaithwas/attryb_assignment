const User = require("../model/user");
const bcrypt = require('bcrypt');

const findUserByMail = async(email)=>{
    try{
    const data = await User.findOne({email:email});
    return data;
    }
    catch(error){
        console.log(error);
        return false;
    }
}
const create =async(data)=>{
    try{
        let user = new User(data);
        await user.save();
        return user;

    }catch(error){
        console.log(error);
        return false;
    }
}
const validatePassword = async (pass, currPass) => {
    try {
      let isCorrect = await bcrypt.compare(pass, currPass);
      console.log("is", isCorrect);
      return isCorrect;
    } catch (error) {
      // Handle any potential errors from bcrypt.compare
      console.error(error);
      return false;
    }
  };
const updateProfile = async (id,obj)=>{
    try{
        const data = await User.findByIdAndUpdate({_id:id},{$set:obj},{new:true})
        return data;
    
      
    } catch(error){
            console.log(error);
            return false;
        }
     }
module.exports={
    findUserByMail,
    create,
    validatePassword,
    updateProfile,
}