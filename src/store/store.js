import { configureStore } from "@reduxjs/toolkit";

import profileReducer from "./reducer/profile";
import cartReducer from "./reducer/cart";

//MIDDLEWARE
const localStorageMiddleware = ({ getState }) => {
  return next => action => {
    const result = next(action);
    localStorage.setItem('applicationState', JSON.stringify(getState()));
    return result;
  };
};

const reHydrateStore = () => {
  if (localStorage.getItem('applicationState') !== null) {
    return JSON.parse(localStorage.getItem('applicationState')); // re-hydrate the store
  }
};

const store = configureStore({
  reducer: {
    profileReducer,
    cartReducer
  },
  devTools: true, // should false for PROD deployment
  preloadedState: reHydrateStore(),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

store.subscribe(() => console.log('Successfully Subscribed with Initial State', store.getState()))

export default store;
