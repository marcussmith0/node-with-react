const keys = require("./config/keys");
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cookieSession = require("cookie-session");

const app = express();

require("./models/User");
require("./services/passport");

mongoose.Promise = global.Promise;

mongoose.connect(keys.mongoURI, {
    useMongoClient: true
  });

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.serializeUser());

require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("IT'S HAPPENING!!");
});