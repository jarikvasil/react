import React from 'react';
import store from '../store/store';
import history from '../store/history';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';


class LoginForm extends React.Component{
	
	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleLoginChange = this.handleLoginChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
	}
	
	componentDidMount(){
		if (this.props.isLoggedOn === "Y")
			history.push("/");
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
				xhr.onreadystatechange = () => {console.log(xhr)};
				xhr.send(JSON.stringify(body));
			}
			else{
				try{
					const response = await fetch(URL, {method: "POST", mode: "cors", headers: {"Content-Type": this.props.contentType +";charset=utf-8"}, body: JSON.stringify(body)});
					console.log(response);
					if (response.status === 200){
						store.dispatch({type: "SET_IS_LOGGED_STATUS", value: "Y"});
						history.push("/");
					}
				}
				catch(error){
					store.dispatch({type: "SET_LOGIN_ERROR", value: "Возникла проблема с fetch-запросом: " + error});
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
	
	render(){
		return (
				<div className="container">
					<div className="row justify-content-start">
						<Link to='/login/request_params'>Параметры</Link>
					</div>
					<form onSubmit={this.handleSubmit}>
						<div className="row mt-3 justify-content-center">
							<div className="col-3 text-center h6">
								<label htmlFor="login-input">Логин:</label>
								<input type="text" id="login-input" className="form-control" value={this.props.login} onChange={this.handleLoginChange} required/>
							</div>
						</div>
						<div className="row mt-3 justify-content-center">
							<div className="col-3 text-center h6">
								<label htmlFor="password-input">Пароль:</label>
								<input type="password" id="password-input" className="form-control" value={this.props.password} onChange={this.handlePasswordChange} required/>
							</div>
						</div>
						<div className="row mt-3 justify-content-center">
							<div className="col-1">
								<input type="submit" id="submit-button" className="btn btn-success" value="Войти"/>
							</div>
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
    requestMode: state.requestParamsState.requestMode,
	urlIP: state.requestParamsState.urlIP,
	urlPort: state.requestParamsState.urlPort,
	urlMethod: state.requestParamsState.urlMethod,
	contentType: state.requestParamsState.contentType,
	login: state.loginParamsState.login,
	password: state.loginParamsState.password,
	loginError: state.loginParamsState.loginError,
	isLoggedOn: state.loginParamsState.isLoggedOn
  };
}

export default connect(mapStateToProps)(LoginForm);