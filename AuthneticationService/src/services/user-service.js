const UserRepository = require("../repostitory/user-repostitory");

class UserService{

    constructor(){
        this.userRepository = new UserRepository();
    }

    async create(data){
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log("Something went wrong on Service Layer!!");
            throw {error};
        }

    }

}

module.exports = UserService;