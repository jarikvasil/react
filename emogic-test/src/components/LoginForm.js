import React from 'react';
import store from '../store/store';
import history from '../store/history';
import {connect} from 'react-redux';

class LoginForm extends React.Component{
	
	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	componentDidMount(){
		if (this.props.isLoggedOn === "Y")
			history.push("/");
	}
	
	handleSuccessLogin = () => {
		store.dispatch({type: "SET_IS_LOGGED_STATUS", value: "Y"});
		store.dispatch({type: "SET_LOGIN_ERROR", value: ""});
		history.push("/");
	}
	
	handleErrorLogin = (errorText) => {
		store.dispatch({type: "SET_LOGIN_ERROR", value: errorText});
	}
	
	handleSubmit = async (event) => {
		event.preventDefault();
		if (this.props.login !== "" && this.props.password !== ""){
			const URL = "http://" + this.props.urlIP + ((this.props.urlPort !== "") ? ":" + this.props.urlPort : "") + ((this.props.urlMethod !== "") ? "/" + this.props.urlMethod : "");
			const body = {login: this.props.login, password: this.props.password};
			if (this.props.requestMode === "XMLHttpRequest"){
				const xhr = new XMLHttpRequest();
				xhr.open("POST", URL, true);
				xhr.setRequestHeader("Content-Type", this.props.contentType +";charset=utf-8");
				xhr.onreadystatechange = () => {
					if (xhr.readyState === 4){
						console.log(xhr);
						if (xhr.status === 200){
							this.handleSuccessLogin();
						}
						else{
							this.handleErrorLogin("Не удалось войти в систему. HTTP-запрос возвращен с кодом: " + xhr.status + ".");
						}
					}	
				};
				xhr.send(JSON.stringify(body));
			}
			else{
				try{
					const response = await fetch(URL, {method: "POST", mode: "cors", headers: {"Content-Type": this.props.contentType +";charset=utf-8"}, body: JSON.stringify(body)});
					console.log(response);
					if (response.status === 200){
						this.handleSuccessLogin();
					}
					else{
						this.handleErrorLogin("Не удалось войти в систему. Fetch-запрос возвращен с кодом: " + response.status + ".");
					}
				}
				catch(error){
					this.handleErrorLogin("Не удалось войти в систему: " + error + ".");
				}
			}	
		}	
	}
	
	handleLoginChange = (event) => {
		store.dispatch({type: "SET_LOGIN", value: event.target.value})
	}
	
	handlePasswordChange = (event) => {
		store.dispatch({type: "SET_PASSWORD", value: event.target.value})
	}
	
	handleGoToRequestParams = (event) => {
		history.push("/login/request_params");
	}
	
	render(){
		return (
				<div className="container-fluid">
					<div className="row justify-content-start pl-1 mt-1">
						<button id="request-params" className="btn btn-sm align-middle btn-outline-secondary" type="button" onClick={this.handleGoToRequestParams}>Параметры</button>
					</div>
					<form onSubmit={this.handleSubmit}>
						<div className="row mt-3 justify-content-center">
							<div className="col-md-auto text-center h6">
								<label htmlFor="login-input">Логин:</label>
								<input type="text" id="login-input" className="form-control" value={this.props.login} onChange={this.handleLoginChange} required/>
							</div>
						</div>
						<div className="row mt-3 justify-content-center">
							<div className="col-md-auto text-center h6">
								<label htmlFor="password-input">Пароль:</label>
								<input type="password" id="password-input" className="form-control" value={this.props.password} onChange={this.handlePasswordChange} required/>
							</div>
						</div>
						<div className="row mt-3 justify-content-center">
							<input type="submit" id="submit-button" className="btn btn-success" value="Войти"/>
						</div>	
					</form>
					<div className="row mt-3 justify-content-center text-danger">
						{this.props.loginError}
					</div>
				</div>
		)
	}
}

const mapStateToProps = (state) => {
  return {
	...state.requestParamsState,
	...state.loginParamsState
  };
}

export default connect(mapStateToProps)(LoginForm);