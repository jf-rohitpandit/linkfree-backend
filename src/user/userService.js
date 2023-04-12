const jwt = require('jsonwebtoken')
const userModel = require('./userModel');
const {getUserByEmail, createUser} = require('./userModel');

const login = async (email, password)=>{
    let result = {message:'', body: {}, status: 200};
    try {
      let user = await getUserByEmail(email);
      if(!user || user.password != password){
        result.status = 400;
        result.message = 'Bad credentials';  
        return result;
      }
      console.log(user, !user , user.password , password)

      let token = jwt.sign({'user': user.id}, 'secretText');

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

const signup = async (name, email, password) => {
  let result = {message: '', body: {}, status: 200};

  try{
    let existingUser = await getUserByEmail(email);
    if(existingUser != null){
      result.status = 400;
      result.message = 'Email already taken!';
      return result;
    }

    let id = await createUser(name, email, password);
    let token = jwt.sign({'user':id}, 'secretText');

    result.status = 201;
    result.message = 'Signup successful!';
    result.body = {token};
  } catch (error) {
    console.log('error in the signup: ', error);
    result.status = 500;
    result.message = 'Internal Error Occured!';
  }

  return result;
}


module.exports ={
  login,
  signup
}