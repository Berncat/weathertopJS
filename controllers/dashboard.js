"use strict";

const accounts = require("./accounts.js");
const logger = require("../utils/logger");
const stationStore = require("../models/station-store");
const uuid = require("uuid");

const dashboard = {
  index(request, response) {

    try {
      logger.info("Rendering Dashboard");
      const loggedInUser = accounts.getCurrentUser(request);
      const viewData = {
        title: "Dashboard",
        stations: stationStore.getUserStations(loggedInUser.id)
      };
      response.render("dashboard", viewData);
    } catch (err) {
      response.redirect("/login");
    }
  },

  deleteStation(request, response) {
    const stationId = request.params.id;
    logger.info("Deleting Station: " + stationStore.getStation(stationId).name);
    stationStore.removeStation(stationId);
    response.redirect("/dashboard");
  },

  addStation(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newStation = {
      id: uuid.v1(),
      userid: loggedInUser.id,
      name: request.body.name,
      latitude: request.body.latitude,
      longitude: request.body.longitude,
      report: {},
      readings: []
    };
    logger.info("Adding Station: " + newStation.name);
    stationStore.addStation(newStation);
    response.redirect("/dashboard");
  }
};

module.exports = dashboard;
