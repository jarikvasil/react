import React from 'react';
import LoginForm from './LoginForm';
import ParamsBar from './ParamsBar';

const urlIPDefault = "10.9.72.246";
const urlPortDefault = "8080";
const urlMethodDefault = "login";
const contentTypeDefault = "application/json";
const ajaxModeDefault = "Fetch";

class StartPage extends React.Component{
	constructor(props){
		super(props);
		this.state = {login: "", 
					  password: "", 
					  ajaxMode: localStorage.getItem("ajaxMode") || ajaxModeDefault, 
					  urlIP: localStorage.getItem("urlIP") || urlIPDefault, 
					  urlPort: localStorage.getItem("urlPort") || urlPortDefault, 
					  urlMethod: localStorage.getItem("urlMethod") || urlMethodDefault, 
					  contentType: localStorage.getItem("contentType") || contentTypeDefault};
		this.sendRequest = this.sendRequest.bind(this);
		this.setStateField = this.setStateField.bind(this);
		this.saveDataInLocalStorage  = this.saveDataInLocalStorage.bind(this);
	}
	
	sendRequest = async () => {
		console.log(this.state);
		const URL = "http://" + this.state.urlIP + ((this.state.urlPort !== "") ? ":" + this.state.urlPort : "") + ((this.state.urlMethod !== "") ? "/" + this.state.urlMethod : "");
		const body = {login: this.state.login, password: this.state.password};
		if (this.state.ajaxMode === "XMLHttpRequest"){
			const xhr = new XMLHttpRequest();
			xhr.open("POST", URL, true);
			xhr.setRequestHeader("Content-Type", this.state.contentType +";charset=utf-8");
			xhr.onreadystatechange = () => {console.log(xhr)};
			xhr.send(JSON.stringify(body));
		}
		else{
			try{
				const response = await fetch(URL, {method: "POST", mode: "cors", headers: {"Content-Type": this.state.contentType +";charset=utf-8"}, body: JSON.stringify(body)});
				console.log(response);
			}
			catch(error){
				console.log("Возникла проблема с fetch-запросом");
			}
		}	
	}
	
	saveDataInLocalStorage = () => {
		const params = ['ajaxMode','urlIP','urlPort','urlMethod','contentType'];
		params.forEach(prop => localStorage.setItem([prop], this.state[prop]));
		
	}
	
	setStateField = (field, val) => {
		this.setState({[field]: val});
	}
	
	render(){
		return(
			<div>
				<ParamsBar ajaxMode={this.state.ajaxMode} setStateField={this.setStateField} urlIP={this.state.urlIP} urlIPDefault={urlIPDefault} urlPort={this.state.urlPort} urlMethod={this.state.urlMethod} contentType={this.state.contentType} saveData={this.saveDataInLocalStorage}/>
				<LoginForm login={this.state.login} password={this.state.password} sendRequest={this.sendRequest} setStateField={this.setStateField} />
			</div>
		)
	}
}

export default StartPage;