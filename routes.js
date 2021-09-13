"use strict";

const express = require("express");
const router = express.Router();


const about = require("./controllers/about.js");
const accounts = require("./controllers/accounts.js");
const dashboard = require("./controllers/dashboard.js");
const station = require("./controllers/station.js");


router.get("/about", about.index);

router.get("/", accounts.index);
router.get("/login", accounts.login);
router.get("/logout", accounts.logout);
router.get("/signup", accounts.signup);
router.get("/edit", accounts.edit);
router.post("/edit", accounts.update);
router.post("/register", accounts.register);
router.post("/authenticate", accounts.authenticate);

router.get("/dashboard", dashboard.index);
router.get("/dashboard/deletestation/:id", dashboard.deleteStation);
router.post("/dashboard/addstation", dashboard.addStation);

router.get("/station/:id", station.index);
router.get("/station/:id/deletereading/:readingid", station.deleteReading);
router.post("/station/:id/addreading", station.addReading);
router.post("/station/:id/autoreading", station.autoReading);

module.exports = router;
