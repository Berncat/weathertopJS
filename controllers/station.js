"use strict";

const logger = require("../utils/logger");
const stationStore = require("../models/station-store");
const analytics = require("../utils/analytics");
const uuid = require("uuid");
const axios = require("axios");

const station = {
  async index(request, response) {
    const stationId = request.params.id;
    const station = stationStore.getStation(stationId);
    const stations = stationStore.getStations(stationId);
    const charts = analytics.arrays(station.readings);

    const viewData = {
      title: "Station",
      station: station,
      stations: stations,
      charts: charts
    };
    response.render("station", viewData);
  },

  deleteReading(request, response) {
    const stationId = request.params.id;
    const readingId = request.params.readingid;
    const station = stationStore.getStation(stationId);
    logger.info(`Deleting Reading ${readingId} from Station ${stationId}`);
    stationStore.removeReading(stationId, readingId);
    logger.info("Report Card Updated");
    stationStore.updateReport(station);
    response.redirect("/station/" + stationId);
  },

  addReading(request, response) {
    const stationId = request.params.id;
    const station = stationStore.getStation(stationId);
    const newReading = {
      id: uuid.v1(),
      time: new Date().toLocaleString(),
      input: "Manual",
      code: Number(request.body.code),
      temperature: Number(request.body.temperature),
      windSpeed: Number(request.body.windSpeed),
      windDirection: Number(request.body.windDirection),
      pressure: Number(request.body.pressure)
    };
    logger.info("New reading added ", newReading);
    stationStore.addReading(stationId, newReading);
    logger.info("Report Card Updated");
    stationStore.updateReport(station);
    response.redirect("/station/" + stationId);
  },

  async autoReading(request, response) {
    const stationId = request.params.id;
    const station = stationStore.getStation(stationId);
    const lat = station.latitude;
    const lng = station.longitude;
    const requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=metric&appid=93d7bef1b020c5c231ee18feaebf0a70`;
    const result = await axios.get(requestUrl);

    if (result.status == 200) {
      const reading = result.data.current;
      const newReading = {
        id: uuid.v1(),
        time: new Date().toLocaleString(),
        input: "Auto",
        code: reading.weather[0].id,
        temperature: reading.temp,
        windSpeed: reading.wind_speed,
        windDirection: reading.wind_deg,
        pressure: reading.pressure
      };
      logger.info("New reading added ", newReading);
      stationStore.addReading(stationId, newReading);
      logger.info("Report Card Updated");
      stationStore.updateReport(station);
    }
    response.redirect("/station/" + stationId);
  }
};
module.exports = station;