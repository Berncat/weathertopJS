"use strict";

const weatherConditions = new Map();
weatherConditions.set(200, { description: "Thunderstorm with light rain", icon: "bolt" });
weatherConditions.set(201, { description: "Thunderstorm with rain", icon: "bolt" });
weatherConditions.set(202, { description: "Thunderstorm with heavy rain", icon: "bolt" });
weatherConditions.set(210, { description: "Light thunderstorm", icon: "bolt" });
weatherConditions.set(211, { description: "Thunderstorm", icon: "bolt" });
weatherConditions.set(212, { description: "Heavy thunderstorm", icon: "bolt" });
weatherConditions.set(221, { description: "Ragged thunderstorm", icon: "bolt" });
weatherConditions.set(230, { description: "Thunderstorm with light drizzle", icon: "bolt" });
weatherConditions.set(231, { description: "Thunderstorm with drizzle", icon: "bolt" });
weatherConditions.set(232, { description: "Thunderstorm with heavy drizzle", icon: "bolt" });
weatherConditions.set(300, { description: "Light intensity drizzle", icon: "cloud rain" });
weatherConditions.set(301, { description: "Drizzle", icon: "cloud rain" });
weatherConditions.set(302, { description: "Heavy intensity drizzle", icon: "cloud rain" });
weatherConditions.set(310, { description: "Light intensity drizzle rain", icon: "cloud rain" });
weatherConditions.set(311, { description: "Drizzle rain", icon: "cloud rain" });
weatherConditions.set(312, { description: "Heavy intensity drizzle rain", icon: "cloud showers heavy" });
weatherConditions.set(313, { description: "Shower rain and drizzle", icon: "cloud showers heavy" });
weatherConditions.set(314, { description: "Heavy shower rain and drizzle", icon: "cloud showers heavy" });
weatherConditions.set(321, { description: "Shower drizzle", icon: "cloud showers heavy" });
weatherConditions.set(500, { description: "Light rain", icon: "cloud sun rain" });
weatherConditions.set(501, { description: "Moderate rain", icon: "cloud sun rain" });
weatherConditions.set(502, { description: "Heavy intensity rain", icon: "cloud showers heavy" });
weatherConditions.set(503, { description: "Very heavy rain", icon: "cloud showers heavy" });
weatherConditions.set(504, { description: "Extreme rain", icon: "cloud showers heavy" });
weatherConditions.set(511, { description: "Freezing rain", icon: "snowflake" });
weatherConditions.set(520, { description: "Light intensity shower rain", icon: "cloud sun rain" });
weatherConditions.set(521, { description: "Shower rain", icon: "cloud showers heavy" });
weatherConditions.set(522, { description: "Heavy intensity shower rain", icon: "cloud showers heavy" });
weatherConditions.set(531, { description: "Ragged shower rain", icon: "cloud showers heavy" });
weatherConditions.set(600, { description: "Light snow", icon: "snowflake" });
weatherConditions.set(601, { description: "Snow", icon: "snowflake" });
weatherConditions.set(602, { description: "Heavy snow", icon: "snowflake" });
weatherConditions.set(611, { description: "Sleet", icon: "snowflake" });
weatherConditions.set(612, { description: "Light shower sleet", icon: "snowflake" });
weatherConditions.set(613, { description: "Shower sleet", icon: "snowflake" });
weatherConditions.set(615, { description: "Light rain and snow", icon: "snowflake" });
weatherConditions.set(616, { description: "Rain and snow", icon: "snowflake" });
weatherConditions.set(620, { description: "Light shower snow", icon: "snowflake" });
weatherConditions.set(621, { description: "Shower snow", icon: "snowflake" });
weatherConditions.set(622, { description: "Heavy shower snow", icon: "snowflake" });
weatherConditions.set(701, { description: "Mist", icon: "smog" });
weatherConditions.set(711, { description: "Smoke", icon: "smog" });
weatherConditions.set(721, { description: "Haze", icon: "smog" });
weatherConditions.set(731, { description: "Sand/dust whirls", icon: "smog" });
weatherConditions.set(741, { description: "Fog", icon: "smog" });
weatherConditions.set(751, { description: "Sand", icon: "smog" });
weatherConditions.set(761, { description: "Dust", icon: "smog" });
weatherConditions.set(762, { description: "Volcanic ash", icon: "smog" });
weatherConditions.set(771, { description: "Squalls", icon: "smog" });
weatherConditions.set(781, { description: "Tornado", icon: "exclamation triangle" });
weatherConditions.set(800, { description: "Clear sky", icon: "sun" });
weatherConditions.set(801, { description: "Few clouds: 11-25%", icon: "cloud sun" });
weatherConditions.set(802, { description: "Scattered clouds: 25-50%", icon: "cloud" });
weatherConditions.set(803, { description: "Broken clouds: 51-84%", icon: "cloud" });
weatherConditions.set(804, { description: "Overcast clouds: 85-100%", icon: "cloud" });

const conversion = {
  weatherDescription(key) {
    return weatherConditions.get(key).description;
  },

  weatherIcon(key) {
    return weatherConditions.get(key).icon;
  },

  celsiusToFahrenheit(temperature) {
    const calc = (temperature * 1.8) + 32;
    return Math.round(calc * 100.00) / 100.00;
  },

  kmToBeaufort(windSpeed) {
    if (windSpeed <= 1) {
      return 0;
    } else if (windSpeed > 1 && windSpeed <= 5) {
      return 1;
    } else if (windSpeed >= 6 && windSpeed <= 11) {
      return 2;
    } else if (windSpeed >= 12 && windSpeed <= 19) {
      return 3;
    } else if (windSpeed >= 20 && windSpeed <= 28) {
      return 4;
    } else if (windSpeed >= 29 && windSpeed <= 38) {
      return 5;
    } else if (windSpeed >= 39 && windSpeed <= 49) {
      return 6;
    } else if (windSpeed >= 50 && windSpeed <= 61) {
      return 7;
    } else if (windSpeed >= 62 && windSpeed <= 74) {
      return 8;
    } else if (windSpeed >= 75 && windSpeed <= 88) {
      return 9;
    } else if (windSpeed >= 89 && windSpeed <= 102) {
      return 10;
    } else if (windSpeed >= 103 && windSpeed <= 117) {
      return 11;
    } else {
      return 11;
    }
  },

  calculateWindChill(temperature, windSpeed) {
    const calc = 13.12 + (0.6215 * temperature)
        - 11.37 * (Math.pow(windSpeed, 0.16))
        + 0.3965 * temperature * (Math.pow(windSpeed, 0.16));
    return Math.round(calc * 100.00) / 100.00;
  },

  degreeToCompass(degree) {
    if (degree > 0 && degree <= 11.25) {
      return "N";
    } else if (degree > 11.25 && degree <= 33.75) {
      return "NNE";
    } else if (degree > 33.75 && degree <= 56.25) {
      return "NE";
    } else if (degree > 56.25 && degree <= 78.75) {
      return "ENE";
    } else if (degree > 78.75 && degree <= 101.25) {
      return "E";
    } else if (degree > 101.25 && degree <= 123.75) {
      return "ESE";
    } else if (degree > 123.75 && degree <= 146.25) {
      return "SE";
    } else if (degree > 146.25 && degree <= 168.75) {
      return "SSE";
    } else if (degree > 168.75 && degree <= 191.25) {
      return "S";
    } else if (degree > 191.25 && degree <= 213.75) {
      return "SSW";
    } else if (degree > 213.75 && degree <= 236.25) {
      return "SW";
    } else if (degree > 236.25 && degree <= 258.75) {
      return "WSW";
    } else if (degree > 258.75 && degree <= 281.25) {
      return "W";
    } else if (degree > 281.25 && degree <= 303.75) {
      return "WNW";
    } else if (degree > 303.75 && degree <= 326.25) {
      return "NW";
    } else if (degree > 326.25 && degree <= 348.75) {
      return "NNW";
    } else if (degree > 348.75 && degree <= 360.00) {
      return "N";
    }
  }
};
module.exports = conversion;