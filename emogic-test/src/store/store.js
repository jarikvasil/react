import {createStore} from 'redux';

const defaultParamValues = {
	requestMode: "Axios",
	urlIP: "localhost",
	urlPort: "8080",
	urlMethod: "login",
	contentType: "application/json"
}

const getRequestParamsFromStorage = (state) => {
	['requestMode','urlIP','urlPort','urlMethod','contentType'].forEach(paramName => {state[paramName] = localStorage.getItem(getStorageItemName(paramName)) || defaultParamValues[paramName]})
}

const getStorageItemName = (paramName) => {
	return "EmogicTest" + paramName.slice(0,1).toUpperCase() + paramName.slice(1);
}

const loginParamsReducer = (state, action) => {
	let newState = {};
	
	if (state !== undefined)
		Object.assign(newState, state);
	else{
		getRequestParamsFromStorage(newState);
		newState.login = sessionStorage.getItem(getStorageItemName("login")) || "";
		newState.password = "";
		newState.loginErrorText = "";
		newState.isLoggedOn = sessionStorage.getItem(getStorageItemName("isLoggedOn")) || "N";
	}
		
	if (action.type === "SET_PARAM"){
		newState[action.paramName] = action.paramValue;
		if (action.sessionStorageFlg && action.sessionStorageFlg === "Y")
			sessionStorage.setItem(getStorageItemName(action.paramName), action.value);
		if (action.clearParams && Array.isArray(action.Params))
			action.clearParams.forEach(paramName => {newState[paramName] = ""});	
	}
	
	if (action.type === "SAVE_REQUEST_PARAMS"){
		['requestMode','urlIP','urlPort','urlMethod','contentType'].forEach(paramName => {localStorage.setItem(getStorageItemName(paramName),state[paramName])});
	}
	
	if (action.type === "UNDO_REQUEST_PARAMS_CHANGES"){
		getRequestParamsFromStorage(newState);
	}
		
	return newState;
}

const store = createStore(loginParamsReducer);
export default store;