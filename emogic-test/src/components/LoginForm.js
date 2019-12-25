﻿import React from 'react';

//const URL = "http://localhost:8080/login";
const URL = "http://10.9.72.246:8080/login";
const ajaxMode = false;

class LoginForm extends React.Component{
	
	constructor(props){
		super(props);
		this.state = {login: "", password: "", isLoginEmpty: false, isPasswordEmpty: false, ajaxMode: ajaxMode};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleLoginChange = this.handleLoginChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
	}
	
	handleSubmit = async (event) => {
		event.preventDefault();
		this.setState({isLoginEmpty: this.state.login === "", isPasswordEmpty: this.state.password === ""});
		if (this.state.login !== "" && this.state.password !== ""){
			const body = {login: this.state.login, password: this.state.password};
			if (!this.state.ajaxMode){
				try{
					const response = await fetch(URL, {method: "POST", mode: "cors", headers: {"Content-Type": "application/json;charset=utf-8"}, body: JSON.stringify(body)});
					console.log(response);
				}
				catch(error){
					console.log("Возникла проблема с fetch-запросом");
				}
				
			}
			else{
				const xhr = new XMLHttpRequest();
				xhr.open("POST", URL, true);
				xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
				xhr.onreadystatechange = () => {console.log(xhr)};
				xhr.send(JSON.stringify(body));
			}	
		}	
	}
	
	handleLoginChange = (event) => {
		this.setState({login: event.target.value, isLoginEmpty: ((this.state.isLoginEmpty && event.target.value !== "") ? false : this.state.isLoginEmpty)});
	}
	
	handlePasswordChange = (event) => {
		this.setState({password: event.target.value, isPasswordEmpty: ((this.state.isPasswordEmpty && event.target.value !== "") ? false : this.state.isPasswordEmpty)});
	}
	
	render(){
		return (
				<div className="container">
					<form onSubmit={this.handleSubmit}>
						<div className="row mt-3 justify-content-center">
							<div className="col-3 text-center">
								<label htmlFor="login-input">Логин:</label>
								<input type="text" id="login-input" className={"form-control"+((this.state.isLoginEmpty) ? " is-invalid" : "")} value={this.state.login} onChange={this.handleLoginChange}/>
								<div className="invalid-feedback">
									{(this.state.isLoginEmpty) ? "Введите логин" : ""}
								</div>
							</div>
						</div>
						<div className="row mt-3 justify-content-center">
							<div className="col-3 text-center">
								<label htmlFor="password-input">Пароль:</label>
								<input type="password" id="password-input" className={"form-control"+((this.state.isPasswordEmpty) ? " is-invalid" : "")} value={this.state.password} onChange={this.handlePasswordChange}/>
								<div className="invalid-feedback">
									{(this.state.isPasswordEmpty) ? "Введите пароль" : ""}
								</div>
							</div>
						</div>
						<div className="row mt-3 justify-content-center">
							<div className="col-1">
								<input type="submit" id="submit-button" className="btn btn-success" value="Войти"/>
							</div>
						</div>	
					</form>
				</div>
		)
	}
}

export default LoginForm;