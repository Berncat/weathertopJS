"use strict";

const _ = require("lodash");
const JsonStore = require("./json-store");
const conversion = require("../utils/conversion");
const analytics = require("../utils/analytics");

const stationStore = {
  store: new JsonStore("./models/station-store.json", {
    stationCollection: []
  }),
  collection: "stationCollection",

  getAllStations() {
    return this.store.findAll(this.collection);
  },

  getStation(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  getStations(id) {
    return this.store.findBy(this.collection, { id: id });
  },

  getUserStations(userid) {
    return _.sortBy(this.store.findBy(this.collection, { userid: userid }),"name");
  },

  addStation(station) {
    this.store.add(this.collection, station);
    this.store.save();
  },

  removeStation(id) {
    const station = this.getStation(id);
    this.store.remove(this.collection, station);
    this.store.save();
  },

  removeAllStations() {
    this.store.removeAll(this.collection);
    this.store.save();
  },

  addReading(id, reading) {
    const station = this.getStation(id);
    station.readings.push(reading);
    this.store.save();
  },

  removeReading(id, readingId) {
    const station = this.getStation(id);
    const readings = station.readings;
    _.remove(readings, { id: readingId });
    this.store.save();
  },

  updateReport(station) {
    if (station.readings.length === 0) {
      station.report = {};
    } else {
      const lastReading = station.readings[station.readings.length - 1];
      station.report.time = lastReading.time;
      station.report.code = lastReading.code;
      station.report.conditions = conversion.weatherDescription(lastReading.code);
      station.report.icon = conversion.weatherIcon(lastReading.code);
      station.report.tempC = lastReading.temperature;
      station.report.tempF = conversion.celsiusToFahrenheit(lastReading.temperature);
      station.report.windSpeed = lastReading.windSpeed;
      station.report.beaufort = conversion.kmToBeaufort(lastReading.windSpeed);
      station.report.windChill = conversion.calculateWindChill(lastReading.temperature, lastReading.windSpeed);
      station.report.windDirection = lastReading.windDirection;
      station.report.windCompass = conversion.degreeToCompass(lastReading.windDirection);
      station.report.pressure = lastReading.pressure;
      station.report.minTemp = analytics.minMax(station.readings).minTemp;
      station.report.maxTemp = analytics.minMax(station.readings).maxTemp;
      station.report.tempTrend = analytics.trend(station.readings).tempTrend;
      station.report.minWind = analytics.minMax(station.readings).minWind;
      station.report.maxWind = analytics.minMax(station.readings).maxWind;
      station.report.windTrend = analytics.trend(station.readings).windTrend;
      station.report.minPressure = analytics.minMax(station.readings).minPressure;
      station.report.maxPressure = analytics.minMax(station.readings).maxPressure;
      station.report.pressureTrend = analytics.trend(station.readings).pressureTrend;
    }
    this.store.save();
  }
};
module.exports = stationStore;
