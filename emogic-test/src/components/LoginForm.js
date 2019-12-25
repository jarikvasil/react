import React from 'react';

class LoginForm extends React.Component{
	
	constructor(props){
		super(props);
		this.state = { isLoginEmpty: false, 
					   isPasswordEmpty: false};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleLoginChange = this.handleLoginChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
	}
	
	handleSubmit = async (event) => {
		event.preventDefault();
		this.setState({isLoginEmpty: this.props.login === "", isPasswordEmpty: this.props.password === ""});
		if (this.props.login !== "" && this.props.password !== ""){
			this.props.sendRequest();
		}	
	}
	
	handleLoginChange = (event) => {
		this.props.setLogin(event.target.value);
		this.setState({isLoginEmpty: ((this.state.isLoginEmpty && event.target.value !== "") ? false : this.state.isLoginEmpty)});
	}
	
	handlePasswordChange = (event) => {
		this.props.setPassword(event.target.value);
		this.setState({isPasswordEmpty: ((this.state.isPasswordEmpty && event.target.value !== "") ? false : this.state.isPasswordEmpty)});
	}
	
	render(){
		return (
				<div className="container">
					<form onSubmit={this.handleSubmit}>
						<div className="row mt-3 justify-content-center">
							<div className="col-3 text-center">
								<label htmlFor="login-input">Логин:</label>
								<input type="text" id="login-input" className={"form-control"+((this.state.isLoginEmpty) ? " is-invalid" : "")} value={this.props.login} onChange={this.handleLoginChange}/>
								<div className="invalid-feedback">
									{(this.state.isLoginEmpty) ? "Введите логин" : ""}
								</div>
							</div>
						</div>
						<div className="row mt-3 justify-content-center">
							<div className="col-3 text-center">
								<label htmlFor="password-input">Пароль:</label>
								<input type="password" id="password-input" className={"form-control"+((this.state.isPasswordEmpty) ? " is-invalid" : "")} value={this.props.password} onChange={this.handlePasswordChange}/>
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