import React, { useEffect, useState } from "react";
import { FaTemperatureLow } from "react-icons/fa";
import { FaWind } from "react-icons/fa";
import styles from "./Weather.module.css";

function Weather() {
  const WEATHER_API_BASE =
    "https://api.open-meteo.com/v1/forecast?latitude=47.8517&longitude=35.1171&current_weather=true";

  const [temperature, setTemperature] = useState(null);
  const [wind, setWind] = useState(null);
  const [tempUnit, setTempUnit] = useState("c");
  const [windUnit, setWindUnit] = useState("m/s");

  const fetchData = (tempUnit, windUnit) => {
    const temperature_unit = tempUnit === "f" ? "fahrenheit" : "celsius";
    const wind_speed_unit = windUnit === "km/h" ? "kmh" : "ms";
    const url = `${WEATHER_API_BASE}&wind_speed_unit=${wind_speed_unit}&temperature_unit=${temperature_unit}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.current_weather) {
          setTemperature(data.current_weather.temperature);
          setWind(data.current_weather.windspeed);
        }
      })
      .catch(err => console.error("Error fetching weather data:", err));
  };

  useEffect(() => {
    fetchData(tempUnit, windUnit);
  }, [tempUnit, windUnit]);

  const handleTempUnitChange = e => {
    const unit = e.target.value;
    setTempUnit(unit);
  };

  const handleWindUnitChange = e => {
    const unit = e.target.value;
    setWindUnit(unit);
  };

  return (
    <div className={styles.weatherWrapper}>
      <div className={styles.unitsWrapper}>
        <label className={styles.labelUnits}>
          <p className={styles.containInfo}>Wind speed unit:</p>
          <select
            className={styles.unitsSelect}
            name="unitWindow"
            onChange={handleWindUnitChange}
            value={windUnit}
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
            value={tempUnit}
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
  );
}

export default Weather;
