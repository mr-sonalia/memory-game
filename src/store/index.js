import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import gameReducer from "./gameSlice";

const store = configureStore(
	{
		reducer: {
			gameReducer,
		},
	},
	composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
