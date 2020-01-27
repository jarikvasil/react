import React, {useEffect} from 'react';
import history from '../store/history';
import {connect} from 'react-redux';
import axios from 'axios';

function LoginForm(props){
	
	useEffect(() => {
			if (props.isLoggedOn === "Y")
				history.push("/");
		}, [props.isLoggedOn]
	);
	
	const handleXMLHttpRequest = (URL, body, contentType) => {
		const xhr = new XMLHttpRequest();
		xhr.open("POST", URL, true);
		xhr.setRequestHeader("Content-Type", contentType);
		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4){
				console.log(xhr);
				if (xhr.status === 200){
					props.handleSuccessLogin();
				}
				else{
					props.handleErrorLogin("Не удалось войти в систему. HTTP-запрос возвращен с кодом: " + xhr.status + ".");
				}
			}	
		};
		xhr.send(JSON.stringify(body));
	}
	
	const handleFetchRequest = (URL, body, contentType) => {
		const checkForError = (response) => {
			console.log(response);
			if (!response.ok) 
				props.handleErrorLogin("Не удалось войти в систему. Fetch-запрос возвращен с кодом: " + response.status + ".");
			else
				props.handleSuccessLogin();
		};
		fetch(URL, {method: "POST", mode: "cors", headers: {"Content-Type": contentType}, body: JSON.stringify(body)})
			.then(checkForError)
			.catch(error => {props.handleErrorLogin("Не удалось войти в систему: " + error + ".")});
	}
	
	const handleAxiosRequest = (URL, body, contentType) => {
		axios.post(URL, JSON.stringify(body),{headers: {"Content-Type": contentType}})
			.then(response => {console.log(response); props.handleSuccessLogin()})
			.catch(error => {props.handleErrorLogin("Не удалось войти в систему: " + error + ".")});
	}
	
	const handleSubmit = async (event) => {
		event.preventDefault();
		if (props.login !== "" && props.password !== ""){
			const URL = "http://" + props.urlIP + ((props.urlPort !== "") ? ":" + props.urlPort : "") + ((props.urlMethod !== "") ? "/" + props.urlMethod : "");
			const body = {login: props.login, password: props.password};
			const contentType = props.contentType + ";charset=utf-8";
			switch (props.requestMode){
				case "XMLHttpRequest":
					handleXMLHttpRequest(URL, body, contentType);
					break;
				case "Fetch":
					handleFetchRequest(URL, body, contentType);
					break;
				case "Axios":
					handleAxiosRequest(URL, body, contentType);
					break;
			}
		}	
	}
	
	const handleGoToRequestParams = (event) => {
		history.push("/login/request_params");
	}
	
	return (
			<div className="container-fluid">
				<div className="row justify-content-start pl-1 mt-1">
					<button id="request-params" className="btn btn-sm align-middle btn-outline-secondary" type="button" onClick={handleGoToRequestParams}>Параметры</button>
				</div>
				<form onSubmit={handleSubmit}>
					<div className="row mt-3 justify-content-center">
						<div className="col-md-auto text-center h6">
							<label htmlFor="login">Логин:</label>
							<input type="text" id="login" className="form-control" value={props.login} onChange={props.handleInputChange} required/>
						</div>
					</div>
					<div className="row mt-3 justify-content-center">
						<div className="col-md-auto text-center h6">
							<label htmlFor="password">Пароль:</label>
							<input type="password" id="password" className="form-control" value={props.password} onChange={props.handleInputChange} required/>
						</div>
					</div>
					<div className="row mt-3 justify-content-center">
						<input type="submit" id="submit-button" className="btn btn-success" value="Войти"/>
					</div>	
				</form>
				<div className="row mt-3 justify-content-center text-danger">
					{props.loginErrorText}
				</div>
			</div>
	)
}

const mapStateToProps = (state) => {
  return {
	...state
  };
}

const mapDispatchToProps = (dispatch) => {
	return {
		handleInputChange: (event) => {dispatch({type: "SET_PARAM", paramName: event.target.id, paramValue: event.target.value})},
		handleSuccessLogin: () => {dispatch({type: "SET_PARAM", paramName: "isLoggedOn", paramValue: "Y", sessionStorageFlg: "Y", clearParams: ["loginErrorText"]})},
		handleErrorLogin: (errorText) => {dispatch({type: "SET_PARAM", paramName: "loginErrorText", paramValue: errorText})}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);