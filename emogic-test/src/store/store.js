import {createStore, combineReducers} from 'redux';

const urlIPDefault = "10.9.72.246";
const urlPortDefault = "8080";
const urlMethodDefault = "login";
const contentTypeDefault = "application/json";
const requestModeDefault = "Fetch";

const getRequestParamsFromStorage = (state) => {
	state.requestMode = localStorage.getItem("EmogicTestRequestMode") || requestModeDefault;
	state.urlIP = localStorage.getItem("EmogicTestURLIP") || urlIPDefault;
	state.urlPort = localStorage.getItem("EmogicTestURLPort") || urlPortDefault;
	state.urlMethod = localStorage.getItem("EmogicTestURLMethod") || urlMethodDefault;
	state.contentType = localStorage.getItem("EmogicTestContentType") || contentTypeDefault;
}

const requestParamsReducer = (state, action) => {
	let newState = {};
	
	if (state !== undefined)
		Object.assign(newState, state);
	else{
		getRequestParamsFromStorage(newState);
	}
		
	if (action.type === "SET_REQUEST_MODE"){
		newState.requestMode = action.value;
	}
	
	if (action.type === "SET_URL_IP"){
		newState.urlIP = action.value;
	}
	
	if (action.type === "SET_URL_PORT"){
		newState.urlPort = action.value;
	}
	
	if (action.type === "SET_URL_METHOD"){
		newState.urlMethod = action.value;
	}
	
	if (action.type === "SET_CONTENT_TYPE"){
		newState.contentType = action.value;
	}
	
	if (action.type === "SAVE_REQUEST_PARAMS"){
		localStorage.setItem("EmogicTestRequestMode", state.requestMode);
		localStorage.setItem("EmogicTestURLIP", state.urlIP);
		localStorage.setItem("EmogicTestURLPort", state.urlPort);
		localStorage.setItem("EmogicTestURLMethod", state.urlMethod);
		localStorage.setItem("EmogicTestContentType", state.contentType);
	}
	
	if (action.type === "UNDO_REQUEST_PARAMS_CHANGES"){
		getRequestParamsFromStorage(newState);
	}
		
	return newState;
}

const loginParamsReducer = (state, action) => {
	let newState = {};
	
	if (state !== undefined)
		Object.assign(newState, state);
	else{
		newState.login = sessionStorage.getItem("EmogicTestLogin") || "";
		newState.password = "";
		newState.loginError = "";
		newState.isLoggedOn = sessionStorage.getItem("EmogicTestIsLoggedOn") || "N";
		
	}
	
	if (action.type === "SET_LOGIN"){
		newState.login = action.value;
		sessionStorage.setItem("EmogicTestLogin", action.value);
	}
	
	if (action.type === "SET_PASSWORD"){
		newState.password = action.value;
	}
	
	if (action.type === "SET_LOGIN_ERROR"){
		newState.loginError = action.value;
	}
	
	if (action.type === "SET_IS_LOGGED_STATUS"){
		newState.isLoggedOn = action.value;
		sessionStorage.setItem("EmogicTestIsLoggedOn", action.value);
	}
	
	return newState;
}

const reducers = combineReducers({
	requestParamsState: requestParamsReducer,
	loginParamsState: loginParamsReducer
});

const store = createStore(reducers);
export default store;