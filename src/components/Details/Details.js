import React from 'react';
import { useSelector } from 'react-redux';
import { WiHumidity } from 'react-icons/wi';
import { RiWindyFill } from 'react-icons/ri';
import { FaTachometerAlt, FaEye } from 'react-icons/fa';
import './Details.css';

function Details() {
  const { data } = useSelector((state) => state.Details);

  return (
    <>
      {data && data.city ? (
        <div className="det-main">
          <div className="up">
            <p className="c-city">
              {data.city.name}
              ,
              {data.city.sys.country}
            </p>
            <div className="img-temp">
              <div className="temp-cond">
                <span className="temp-details">
                  {data.city.main.temp}
                  &deg;C
                </span>
                <span className="cond-details">
                  {data.city.weather[0].description}
                </span>
              </div>
              <span className="img-container">
                <img
                  className="details-image"
                  src={data.weatherImage}
                  alt="name"
                />
              </span>
            </div>
          </div>
          <div className="lower">
            <div className="humid">
              <p className="low-header">
                <WiHumidity className="Icons" />
                Humidity
              </p>
              <span className="low-value">
                {data.city.main.humidity}
                %
              </span>
            </div>
            <div className="humid">
              <p className="low-header">
                <RiWindyFill className="Icons" />
                Wind
              </p>
              <span className="low-value">
                {data.city.wind.speed}
                %
              </span>
            </div>
            <div className="humid">
              <p className="low-header">
                <FaTachometerAlt className="Icons" />
                Pressure
              </p>
              <span className="low-value">
                {data.city.main.pressure}
                (hPa)
              </span>
            </div>
            <div className="humid">
              <p className="low-header">
                <FaEye className="Icons" />
                Visibility
              </p>
              <span className="low-value">
                {data.city.visibility}
                m
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="no-data">Please go back or search city.</div>
      )}
    </>
  );
}

export default Details;
