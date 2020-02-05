import express from 'express'
import logger from 'morgan'
import helmet from 'helmet'
import routes from './api/routes'
express.Router({mergeParams: true})
const app = express()
var port = process.env.PORT || 8080;
app.use(express.urlencoded({extended: true}))
app.use(logger("dev"));
app.use(express.json());
app.use(helmet());
routes(app);
app.listen(port, function() {
    console.log("Server started on port: " + port);
});