import User from "../interfaces/User";
var db = require("../../models/index");
var User = db.sequelize.import("../../models/user");

export default class UserRepository {
  static getAllUsers() {
    return new Promise((res, rej) => {
      User.findAll().then((users: any) => {
        const nodeData = users.map((user: any) => user.get({ plain: true }));
        res(nodeData);
      });
    });
  }

  static addUser(usr: User) {
    User.create(usr);
  }

  static deleteUser(username: string) {
    User.destroy({
      where: {
        userName: username,
      },
    });
  }
  static updateUser(user: User) {
    console.log(User);
    User.findOne({
      where: {
        userName: user.userName,
      },
    }).then((u: any) => {
      if (u) {
        u.update({
          userName: user.userName,
          avgPriceMax: user.avgPriceMax,
          avgPriceMin: user.avgPriceMin,
          avgComments: user.avgComments,
          avgLikes: user.avgLikes,
          avgEngagementRate: user.avgEngagementRate,
          cursor: user.cursor,
          igId: user.igId,
          posts: user.posts,
          followers: user.followers,
          following: user.following,
        } as User);
      }
    });
  }

  static findUser(username: string): Promise<User> {
    return new Promise((res, rej) => {
      User.findOne({
        where: {
          userName: username,
        },
      }).then((user: any) => {
        res(user.get({ plain: true }) as User);
      });
    });
  }
  static getFollowersForUsername(username: string): Promise<number> {
    return new Promise((res, rej) => {
      User.findOne({
        where: {
          userName: username,
        },
      })
        .then((user: any) => {
          res((user.get({ plain: true }) as User).followers);
        })
        .catch((err: any) => {
          res(-1);
        });
    });
  }
  static getEngagementRateForUsername(username: string): Promise<number> {
    return new Promise((res, rej) => {
      User.findOne({
        where: {
          userName: username,
        },
      }).then((user: any) => {
        res((user.get({ plain: true }) as User).avgEngagementRate);
      });
    });
  }
  static getIgIdAndCursor(username: string): Promise<string[]> {
    return new Promise((res, rej) => {
      User.findOne({
        where: {
          userName: username,
        },
      }).then((user: any) => {
        res([
          (user.get({ plain: true }) as User).igId!,
          (user.get({ plain: true }) as User).cursor!,
        ]);
      });
    });
  }
}
