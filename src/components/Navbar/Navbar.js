import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { AiFillSetting } from 'react-icons/ai';
import { IoSearch, IoChevronBackCircleSharp } from 'react-icons/io5';
import { FaMicrophone } from 'react-icons/fa';
import './Navbar.css';
import { fetchWeatherData } from '../../redux/Home/weatherslice';

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const clickHandle = (value) => {
    navigate('/');
    dispatch(fetchWeatherData(value));
  };

  const [value, setvalue] = useState('');
  const isHomePage = location.pathname === '/';

  const handleIconClick = () => {
    navigate('/');
  };

  return (
    <nav>
      {isHomePage ? (
        <AiFillSetting className="setIcon" />
      ) : (
        <IoChevronBackCircleSharp
          className="setIcon"
          onClick={handleIconClick}
        />
      )}
      <div className="navName">
        <h3 className="nbarName">Weather Forecast</h3>
      </div>
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city name here"
          className="s-input"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              clickHandle(value);
            }
          }}
          value={value}
          onChange={(e) => setvalue(e.target.value)}
        />
        <span className="search-icon">
          <IoSearch onClick={() => clickHandle(value)} />
        </span>
        <FaMicrophone className="mic" />
      </div>
    </nav>
  );
}

export default Navbar;
