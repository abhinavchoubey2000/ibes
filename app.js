const express = require("express");
const cors = require("cors");
const app = express();
const { router } = require("./routes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/api/v1", router);

module.exports = { app };
