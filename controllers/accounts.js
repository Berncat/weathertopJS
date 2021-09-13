"use strict";

const logger = require("../utils/logger");
const userStore = require("../models/user-store");
const uuid = require("uuid");

const accounts = {
  index(request, response) {
    logger.info("Home rendering");
    const viewData = {
      title: "Home"
    };
    response.render("index", viewData);
  },

  login(request, response) {
    logger.info("Login rendering");
    const viewData = {
      title: "Login"
    };
    response.render("login", viewData);
  },

  logout(request, response) {
    logger.info("Logging out " + accounts.getCurrentUser(request).email);
    response.cookie("station", "");
    response.redirect("/");
  },

  signup(request, response) {
    logger.info("Sign up rendering");
    const viewData = {
      title: "Sign up"
    };
    response.render("signup", viewData);
  },

  edit(request, response) {
    logger.info("Edit details rendering");
    const viewData = {
      title: "Edit details",
      user: accounts.getCurrentUser(request),
    };
    response.render("edit", viewData);
  },

  update(request, response) {
    const user = accounts.getCurrentUser(request);
    logger.info(user);
    const updatedUser = request.body;
    logger.info(updatedUser);
    userStore.updateUser(user, updatedUser);
    response.cookie("station", "");
    response.redirect("/login");
  },

  register(request, response) {
    const user = request.body;
    let checkEmail = true;
    const users = userStore.getAllUsers()

    for (let i = 0; i < users.length; i++) {
      if (request.body.email === users[i].email) {
        checkEmail = false;
      }
    }

    if (checkEmail) {
      user.id = uuid.v1();
      userStore.addUser(user);
      logger.info(`Registering ${user.email}`);
      response.redirect("/login");
    } else {
      response.redirect("/signup");
    }
  },

  authenticate(request, response) {
    const user = userStore.getUserByEmail(request.body.email);
    if ((user) && (user.password === request.body.password)) {
      response.cookie("station", user.email);
      logger.info(`Logging in ${user.email}`);
      response.redirect("/dashboard");
    } else {
      response.redirect("/login");
    }
  },

  getCurrentUser(request) {
    const userEmail = request.cookies.station;
    return userStore.getUserByEmail(userEmail);
  }
};
module.exports = accounts;