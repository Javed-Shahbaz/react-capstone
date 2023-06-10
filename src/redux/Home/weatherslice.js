import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const key = 'fe35aab220ffb69b8fb5eef45d5615d1';
const url = 'https://api.openweathermap.org/data/2.5/weather';

export const fetchWeatherData = createAsyncThunk('weather/fetchData', async (city) => {
  const cities = city ? [city] : ['islamabad', 'Dehli', 'colombo', 'Beijing', 'Washington DC', 'Ottawa', 'Tokyo', 'london'];
  const requests = cities.map((city) => {
    const params = {
      q: city,
      appid: key,
      units: 'metric',
    };
    return axios.get(url, { params });
  });
  try {
    const responses = await Promise.all(requests);
    const weatherData = responses.map((response) => response.data);
    return weatherData;
  } catch {
    throw new Error('City not found. Please enter the correct city name.');
  }
});

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => ({ ...state, isLoading: true, error: null }))
      .addCase(fetchWeatherData.fulfilled, (state, action) => ({
        ...state,
        isLoading: false,
        data: action.payload,
        error: null,
      }))
      .addCase(fetchWeatherData.rejected, (state, action) => {
        // eslint-disable-next-line
        console.log(action.error.message);
        return {
          ...state, data: [], isLoading: false, error: action.error.message,
        };
      });
  },
});

export const { data, isLoading } = weatherSlice.actions;
export default weatherSlice.reducer;
