const express = require("express");
const app = express();
const port = process.env.port || 8000;

app.get("/Hello", (req, res) => {
    res.status(200).send("Hello madafaka");
});

app.listen(port, () => {
    console.log("Server running at port: " + port);
})