require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");

const authRoutes = require("./routers/userAuth");
const getRoutes = require("./routers/getData");
const editionRoutes = require("./routers/dataEdition");
const menuRoutes = require("./routers/menuRoutes");

const port = process.env.port || 8000;

var corsOptions = {
    origin: "http://localhost:8100",
    methods: "GET, PUT, DELETE, OPTIONS, HEAD",
    credentials: true,
    headers: "auth-toke, content-type",
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(session({secret:process.env.SESSION_SECRET, saveUninitialized:false, resave:false}));

app.use("/users", authRoutes);
app.use("/users", getRoutes);
app.use("/users", editionRoutes);
app.use("/menus", menuRoutes);

app.listen(port, () => {
    console.log("Server running at port: " + port);
})