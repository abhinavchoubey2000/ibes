const express = require("express");
const router = express.Router();
const { sendUserQuery } = require("./controllers");

router.route("/senduserquery").post(sendUserQuery);

module.exports = { router };
