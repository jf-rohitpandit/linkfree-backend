const userModel = require('./userModel');
const {getUserByEmail} = require('./userModel');

const login = async (email, password)=>{
    let result = {message:'', body: {}, status: 200};
    try {
      let user = await getUserByEmail(email);
      console.log(user, !user , user.password , password)
      if(!user || user.password != password){
        result.status = 400;
        result.message = 'Bad credentials';  
        return result;
      }

      let token = ''

      result.status = 200;
      result.message = 'Login successful!';
      result.body = {token}
    } catch (error) {
        console.log("error in the login: ", error)
        result.status = 500;
        result.message = 'Internal Error Occured!'
    }

    return result;
}


module.exports ={
  login
}