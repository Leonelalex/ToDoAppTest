const userRepo = require('../repository/UserRepo.js');

class UserService {
    async LogIn(email, password){ 
        try{
            let user = await userRepo.login(email, password);
            return user[0];
        }catch(err){
            console.log(err);
            throw err;
        }
    }
}

module.exports = new UserService();