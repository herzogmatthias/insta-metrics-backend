import e = require("express");
import { basicInformation } from "./basicInformationController";
import { newUser } from "./newUserController";

const routes = (app: e.Express) => {
    app.route('/basic-information').get(basicInformation)
    app.route('/new-user/:username').get(newUser)
}

export default routes;