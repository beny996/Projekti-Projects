import React, { useState } from "react";
import axios from "axios";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const Forecast = ({ lat, lon }) => {
  const [data, setData] = useState({});
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=hourly,minutely&appid=1393747bd6e941ae0741b3b7cf4ccc3c`;

  return <></>;
};

export default Forecast;
