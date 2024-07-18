import React, { useEffect, useState } from "react";
import { FaTemperatureLow } from "react-icons/fa6";

import { FaWind } from "react-icons/fa";
import styles from "./Weather.module.css";

function Weather() {
  const WEATHER_API_C_MS =
    "https://api.open-meteo.com/v1/forecast?latitude=47.8517&longitude=35.1171&hourly=temperature_2m,wind_speed_10m&wind_speed_unit=ms&temperature_unit=celsius";

  const WEATHER_API_F_KMH =
    "https://api.open-meteo.com/v1/forecast?latitude=47.8517&longitude=35.1171&hourly=temperature_2m,wind_speed_10m&wind_speed_unit=kmh&temperature_unit=fahrenheit";

  const [temperature, setTemperature] = useState(null);
  const [wind, setWind] = useState(null);

  const [tempUnit, setTempUnit] = useState("c");
  const [windUnit, setWindUnit] = useState("m/s");

  useEffect(() => {
    fetch(WEATHER_API_C_MS)
      .then(response => response.json())
      .then(data => {
        setTemperature(data.hourly.temperature_2m[0]);
        setWind(data.hourly.wind_speed_10m[0]);
      })
      .catch(err => console.log(err));
  }, []);

  const handleTempUnitChange = e => {
    const unit = e.target.value;
    setTempUnit(unit);

    if (unit === "f") {
      fetch(WEATHER_API_F_KMH)
        .then(response => response.json())
        .then(data => setTemperature(data.hourly.temperature_2m[0]))
        .catch(err => console.log(err));
    } else {
      fetch(WEATHER_API_C_MS)
        .then(response => response.json())
        .then(data => setTemperature(data.hourly.temperature_2m[0]))
        .catch(err => console.log(err));
    }
  };

  const handleWindUnitChange = e => {
    const unit = e.target.value;
    setWindUnit(unit === "m/s" ? "m/s" : "km/h");

    if (unit === "km/h") {
      fetch(WEATHER_API_F_KMH)
        .then(response => response.json())
        .then(data => setWind(data.hourly.wind_speed_10m[0]))
        .catch(err => console.log(err));
    } else {
      fetch(WEATHER_API_C_MS)
        .then(response => response.json())
        .then(data => setWind(data.hourly.wind_speed_10m[0]))
        .catch(err => console.log(err));
    }
  };

  return (
    <>
      <div className={styles.weatherWrapper}>
        <div className={styles.unitsWrapper}>
          <label className={styles.labelUnits}>
            <p className={styles.containInfo}>Wind speed unit:</p>
            <select
              className={styles.unitsSelect}
              name="unitWindow"
              onChange={handleWindUnitChange}
            >
              <option value="m/s">M/s</option>
              <option value="km/h">Km/h</option>
            </select>
          </label>

          <label className={styles.labelUnits}>
            <p className={styles.containInfo}>Temperature unit:</p>
            <select
              className={styles.unitsSelect}
              name="unitTemperature"
              onChange={handleTempUnitChange}
            >
              <option value="c">°C</option>
              <option value="f">°F</option>
            </select>
          </label>
        </div>

        <div className={styles.infoWrapper}>
          <label className={styles.info}>
            <h2 className={styles.infoTitle}>Current Weather</h2>
            <div className={styles.windTempWrapper}>
              <p className={styles.units}>
                <FaWind className={styles.sign} />
                {wind} <span>{windUnit}</span>
              </p>
              <p className={styles.units}>
                <FaTemperatureLow className={styles.sign} />
                {temperature} <span>{tempUnit === "c" ? "°C" : "°F"}</span>
              </p>
            </div>
          </label>
        </div>
      </div>
    </>
  );
}

export default Weather;
