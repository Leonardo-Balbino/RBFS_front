// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import animaisReducer from '../features/animais/animaisSlice';

const store = configureStore({
  reducer: {
    animais: animaisReducer,
    // adicione outros reducers conforme necessário
  },
});

export default store;
