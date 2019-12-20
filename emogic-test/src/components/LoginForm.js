import React from 'react';

const URL = "http://localhost:3000/";

class LoginForm extends React.Component{
	
	constructor(props){
		super(props);
		this.state = {login: "", password: ""};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleLoginChange = this.handleLoginChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
	}
	
	handleSubmit = async (event) => {
		event.preventDefault();
		const body = {login: this.state.login, password: this.state.password};
		const response = await fetch(URL, {method: "POST", headers: {"Content-Type": "application/json;charset=utf-8"}, body: JSON.stringify(body)});
		console.log(response);
	}
	
	handleLoginChange = (event) => {
		event.preventDefault();
		this.setState({login: event.target.value});
	}
	
	handlePasswordChange = (event) => {
		event.preventDefault();
		this.setState({password: event.target.value});
	}
	
	render(){
		return (
				<form onSubmit={this.handleSubmit}>
					<div>
						<div className="form-group col-xs-4">
							<label for="login-input">Логин:</label>
							<input type="text" id="login-input" className="form-control" value={this.state.login} onChange={this.handleLoginChange}/>
						</div>
					</div>
					<div className="form-group col-xs-4">
						<label for="password-input">Пароль:</label>
						<input type="password" id="password-input" className="form-control" value={this.state.password} onChange={this.handlePasswordChange}/>
					</div>
					<div className="form-group col-xs-4">
						<label for="submit-button"></label>
						<input type="submit" id="submit-button" className="btn btn-primary" value="Войти"/>
					</div>	
				</form>
		)
	}
}

export default LoginForm;