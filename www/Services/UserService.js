const app = require("./../autoloader");

const Helpers = app.Core.Helpers,
    User = app.Models.User;

module.exports =
class UserService {

    constructor() {
    }

    async addUser(datas) {
        let user = await User.findOne({
            where: {
                email: datas.email
            }
        });
        if (user instanceof User) {
            return false;
        }

        return User.create({
            firstname: datas.firstname,
            lastname: datas.lastname,
            email: datas.email,
            password: Helpers.hashPassword(datas.password)
        })
    }
}