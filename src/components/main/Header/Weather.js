import React, { useState } from 'react';
const axios = require('axios');
const API_KEY = "220b162ef6574c97ac432326212612"
const BASE_URL = "http://api.weatherapi.com/v1"

function Weather(props) {
  let [weather, setWeather] = useState();
  const [address, setAddress] = useState();

  async function getWeather() {
    try {
      const response = await axios.get(`${BASE_URL}/current.json?key=${API_KEY}&q=${address}`);
      console.log(response?.data);
      setWeather(response?.data)
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div style={{ margin: 100 }} >
      <input placeholder="Nhập địa điểm" value={address} onChange={e => setAddress(e.target.value)} />
      <button onClick={getWeather} style={{ color: 'ư' }} >Tra cứu</button>
      {weather && <div>
        <ul style={{ display: 'flex' }}>
          <li> {weather?.location?.name} - {weather?.location?.country} </li>
          <li style={{ display: 'flex' }}> {weather?.current?.temp_c}{<p style={{ content: "00BA" }}>&#186;C</p>}</li>
          <li><a title="Free Weather API">
            <img src={`${weather?.current?.condition?.icon}`} alt="Weather data by WeatherAPI.com" border="0" />
          </a></li>
        </ul>
      </div>}
    </div>
  );
}

export default Weather;