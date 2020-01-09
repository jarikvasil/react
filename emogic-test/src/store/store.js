import {createStore, combineReducers} from 'redux';

const urlIPDefault = "10.9.72.246";
const urlPortDefault = "8080";
const urlMethodDefault = "login";
const contentTypeDefault = "application/json";
const requestModeDefault = "Fetch";

const requestParamsReducer = (state, action) => {
	let newState = {};
	
	if (state !== undefined)
		Object.assign(newState, state);
	else{
		newState.requestMode = localStorage.getItem("EmogicTestRequestMode") || requestModeDefault;
		newState.urlIP = localStorage.getItem("EmogicTestURLIP") || urlIPDefault;
		newState.urlPort = localStorage.getItem("EmogicTestURLPort") || urlPortDefault;
		newState.urlMethod = localStorage.getItem("EmogicTestURLMethod") || urlMethodDefault;
		newState.contentType = localStorage.getItem("EmogicTestContentType") || contentTypeDefault;
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
	
	return newState;
}

const loginParamsReducer = (state, action) => {
	let newState = {};
	
	if (state !== undefined)
		Object.assign(newState, state);
	else{
		newState.login = "";
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