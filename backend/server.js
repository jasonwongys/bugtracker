const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')
const PORT = 4000;
const passport = require('passport');


// const bugRoutes = express.Router();
// let Bug = require('./bug.model');

app.use(express.json());
app.use(cors());

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/bugs',{ useNewUrlParser: true})
const connection = mongoose.connection;

//const db = require("./config/keys").mongoURI;

// mongoose
//     .connect(
//         db,
//         { useNewUrlParser: true, useUnifiedTopology: true }
//     )
//     .then(() => console.log("MongoDB successfully connected"))
//     .catch( err => console.log(err));


connection.once('open',function() {
    console.log("Mongo DB connected successfully");
})

const bugRouter = require('./routes/bug.routes');
const users = require("./routes/api/users");
const projectRouter = require('./routes/project.routes');

app.use(passport.initialize());


require("../backend/config/passport")(passport);

app.use('/projects',projectRouter);
app.use('/api/users/', users);
app.use('/bugs', bugRouter);


//const port = process.env.PORT || 5000

app.listen(PORT, function() {
    console.log("Server is running on PORT: " + PORT);
});