import React, { useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const Search = () => {
  const [data, setData] = useState({});
  const [data1, setData1] = useState({});
  const [lon, setLon] = useState();
  const [lat, setLat] = useState();
  const [location, setLocation] = useState("");
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=f0dde32af7b09f551fd40f088122139a`;
  const url2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=hourly,minutely&appid=1393747bd6e941ae0741b3b7cf4ccc3c`;

  const searchLocation = async (event) => {
    if (event.key === "Enter") {
      const resp = await axios.get(url);
      setData(resp.data);
      setData1({});
      console.log(resp.data);

      setLocation("");

      setLon(resp.data.coord.lon);
      setLat(resp.data.coord.lat);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const resp = await axios.get(url2);
    setData1(resp.data);
    console.log(resp.data);
  };

  return (
    <>
      <div className="search">
        <input
          type="text"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter location"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>

          <div className="temp">
            {data.main ? (
              <h1>
                {Math.round(data.main.temp)}
                ºC
              </h1>
            ) : null}
          </div>
          {data.name ? (
            <div>
              {data1.daily ? null : (
                <p>
                  Za vremensku prognozu za narednih 5 dana kliknite{" "}
                  <a href="" onClick={handleClick} className="klik">
                    ovde
                  </a>
                </p>
              )}
            </div>
          ) : null}

          {data1.daily
            ? data1.daily.slice(1, 6).map((l) => (
                <div className="containter2" key={l.dt}>
                  <br></br>
                  <div className="forecast">
                    <p className="day">
                      {days[new Date(l.dt * 1000).getDay()]}
                    </p>
                    <p className="min">Min : {l.temp.min.toFixed()}</p> /{" "}
                    <p className="max">Max : {l.temp.max.toFixed()}</p>
                    <img
                      src={
                        "http://openweathermap.org/img/wn/" +
                        l.weather[0].icon +
                        "@2x.png"
                      }
                    />
                  </div>
                  <div></div>
                </div>
              ))
            : null}
        </div>
        {data.main ? (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{Math.round(data.main.feels_like)}</p>
              ) : null}
              <p>Feels like</p>
            </div>
            <div className="humidity">
              {data.main ? (
                <p className="bold">{data.main.humidity} % </p>
              ) : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className="bold">{data.wind.speed} KMH</p> : null}
              <p>Wind speed</p>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Search;
