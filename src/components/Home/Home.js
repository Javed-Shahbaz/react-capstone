import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import { selectCity } from '../../redux/details/detailSlice';
import clear from '../../assets/clear.png';
import clouds from '../../assets/clouds.png';
import drizzle from '../../assets/drizzle.png';
import dust from '../../assets/dust.png';
import fog from '../../assets/fog.png';
import haze from '../../assets/haze.png';
import mist from '../../assets/mist.png';
import rain from '../../assets/rain.png';
import smoke from '../../assets/smoke.png';
import snow from '../../assets/snow.png';
import thunderstorm from '../../assets/thunderstorm.png';

const weatherImages = {
  clear,
  clouds,
  drizzle,
  dust,
  fog,
  haze,
  mist,
  rain,
  smoke,
  snow,
  thunderstorm,
};

function Home() {
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.weather);
  const dispatch = useDispatch();

  const ClickHandler = (weatherImage, city) => {
    dispatch(selectCity({ weatherImage, city }));
    navigate('/details');
  };

  return (
    <>
      {data.map((city) => {
        const weatherCondition = city.weather[0].main.toLowerCase();
        const weatherImage = weatherImages[weatherCondition];
        return (
          <div
            className="h-main"
            tabIndex={0}
            onClick={() => ClickHandler(weatherImage, city)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                navigate('/details');
              }
            }}
            role="button"
            key={city.id}
          >
            <div className="img-tem">
              <span>
                <img
                  className="logo"
                  src={weatherImage}
                  alt={city.name}
                />
              </span>
              <div className="tem-cond">
                <p className="temp">
                  {city.main.temp}
                  <sup className="celcius">°c</sup>
                </p>
                <p className="condition">{city.weather[0].main}</p>
              </div>
            </div>
            <div className="country">
              <p className="c-name">{city.name}</p>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Home;
