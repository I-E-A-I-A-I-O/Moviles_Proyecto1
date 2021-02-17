require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.port || 8000;
const authRoutes = require("./routers/userAuth");
const session = require("express-session");


var corsOptions = {
    origin: "http://localhost:8100",
    methods: "GET, PUT, DELETE, OPTIONS, HEAD",
    credentials: true,
    headers: "auth-toke, content-type",
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(session({secret:process.env.TOKEN_SECRET, saveUninitialized:false, resave:false}));

app.use("/users", authRoutes);

app.listen(port, () => {
    console.log("Server running at port: " + port);
})