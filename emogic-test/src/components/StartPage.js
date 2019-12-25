import React from 'react';
import LoginForm from './LoginForm';

const urlIP = "10.9.72.246";
const urlPort = "8080";
const urlMethod = "login";
const contentType = "application/json";
const localhostMode = false;
const ajaxMode = false;

class StartPage extends React.Component{
	constructor(props){
		super(props);
		this.state = {login: "", password: "",  localhostMode: localhostMode, ajaxMode: ajaxMode};
		this.sendRequest = this.sendRequest.bind(this);
		this.setLogin = this.setLogin.bind(this);
		this.setPassword = this.setPassword.bind(this);
	}
	
	sendRequest = async () => {
		const URL = "http://" + ((this.state.localhostMode) ? "localhost" : urlIP) + ((urlPort !== "") ? ":" + urlPort : "") + ((urlMethod !== "") ? "/" + urlMethod : "");
		const body = {login: this.state.login, password: this.state.password};
		if (this.state.ajaxMode){
			const xhr = new XMLHttpRequest();
			xhr.open("POST", URL, true);
			xhr.setRequestHeader("Content-Type", contentType +";charset=utf-8");
			xhr.onreadystatechange = () => {console.log(xhr)};
			xhr.send(JSON.stringify(body));
		}
		else{
			try{
				const response = await fetch(URL, {method: "POST", mode: "cors", headers: {"Content-Type": contentType +";charset=utf-8"}, body: JSON.stringify(body)});
				console.log(response);
			}
			catch(error){
				console.log("Возникла проблема с fetch-запросом");
			}
		}	
	}
	
	setLogin = (login) => {
		this.setState({login: login});
	}
	
	setPassword = (password) => {
		this.setState({password: password});
	}
	
	render(){
		return(
			<div>
				<LoginForm login={this.state.login} password={this.state.password} sendRequest={this.sendRequest} setLogin={this.setLogin} setPassword={this.setPassword}/>
			</div>
		)
	}
}

export default StartPage;