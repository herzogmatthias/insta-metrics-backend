import User from "../interfaces/User";

var db = require('../../models/index');
var User = db.sequelize.import('../../models/user');

export default class UserRepository {
    static getAllUsers() {
        return new Promise((res, rej) => {
            User.findAll().then((users: any) => {
                const nodeData = users.map((user: any) => user.get({ plain: true }));
                res(nodeData);
              });
        })
    }

    static addUser(usr: User) {
        User.create(usr);
    }
}