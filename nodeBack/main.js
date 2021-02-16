require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.port || 8000;
const authRoutes = require("./routers/userAuth")

app.get("/hello", (req, res) => {
    res.status(200).send("Hello madafaka");
});

app.use("/users", authRoutes);

app.listen(port, () => {
    console.log("Server running at port: " + port);
})