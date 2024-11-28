import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducres/index";

const store = configureStore({
    reducer: rootReducer,
})

export default store;