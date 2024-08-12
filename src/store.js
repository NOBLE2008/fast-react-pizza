import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";

const store = configureStore({
    reducer: {
        // Define your reducers here
        user: userReducer
    }
})

export default store;