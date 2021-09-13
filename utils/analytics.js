"use strict";

const logger = require("../utils/logger");
const axios = require("axios");
const analytics = {

  arrays(readings) {
    const times = [];
    const temperatures = [];
    const windSpeeds = [];
    const pressures = [];

    for (let i = 0; i < readings.length; i++) {
      times[i] = readings[i].time;
      temperatures[i] = readings[i].temperature;
      windSpeeds[i] = readings[i].windSpeed;
      pressures[i] = readings[i].pressure;
    }
    return { times, temperatures, windSpeeds, pressures };
  },

  minMax(readings) {
    const temperatures = this.arrays(readings).temperatures;
    const windSpeeds = this.arrays(readings).windSpeeds;
    const pressures = this.arrays(readings).pressures;

    let minTemp = Math.min(...temperatures);
    let maxTemp = Math.max(...temperatures);
    let minWind = Math.min(...windSpeeds);
    let maxWind = Math.max(...windSpeeds);
    let minPressure = Math.min(...pressures);
    let maxPressure = Math.max(...pressures);
    return { minTemp, maxTemp, minWind, maxWind, minPressure, maxPressure };
  },

  calcTrend(array) {
    if (array.length >= 3) {
      if ((array[array.length - 1] > array[array.length - 2]) && (array[array.length - 2] > array[array.length - 3])) {
        return "arrow up";
      } else if ((array[array.length - 1] < array[array.length - 2]) && (array[array.length - 2] < array[array.length - 3])) {
        return "arrow down";
      } else
        return "arrows alternate horizontal";
    } else
      return "question";
  },

  trend(readings) {
    const temperatures = this.arrays(readings).temperatures;
    const windSpeeds = this.arrays(readings).windSpeeds;
    const pressures = this.arrays(readings).pressures;

    let tempTrend = this.calcTrend(temperatures);
    let windTrend = this.calcTrend(windSpeeds);
    let pressureTrend = this.calcTrend(pressures);
    return { tempTrend, windTrend, pressureTrend };
  },

  async charts(station) {
    let report = {};
    const lat = station.latitude;
    const lng = station.longitude;
    const requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=metric&appid=93d7bef1b020c5c231ee18feaebf0a70`;
    const result = await axios.get(requestUrl);
    if (result.status == 200) {
      report.tempTrend = [];
      report.trendLabels = [];
      const trends = result.data.daily;
      for (let i = 0; i < trends.length; i++) {
        report.tempTrend.push(trends[i].temp.day);
        const date = new Date(trends[i].dt * 1000);
        report.trendLabels.push(`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`);
      }
    }
  }
};

module.exports = analytics;