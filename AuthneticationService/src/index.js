const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

const {PORT} = require("./config/server-config");
const db = require("./models/index");
const apiRoutes = require("./routes/index");

const app = express();

// const UserRepository = require("./repostitory/user-repostitory");
// const UserService = require("./services/user-service");

const startServer = () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use("/api",apiRoutes);


    app.listen(PORT,async ()=>{

        // const userRepo = new UserRepository();
        // console.log(await userRepo.getById(3));

        // const userService = new UserService();
        // const token = userService.createToken({id:6,email:"bulma@admin.com"});
        // console.log(token);
        // console.log(userService.verfiyToken(token));

        if(process.env.DB_SYNC){
            await db.sequelize.sync({alter:true});
        }

        console.log(`Authentication Server Running on PORT:${PORT}!!`);
    })
}

startServer();