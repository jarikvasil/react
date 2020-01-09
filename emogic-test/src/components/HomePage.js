import React from 'react';
import store from '../store/store';
import history from '../store/history';
import {connect} from 'react-redux';

class HomePage extends React.Component{
	constructor(props){
		super(props);
		this.handleExit = this.handleExit.bind(this);
	}
	
	componentDidMount(){
		if (this.props.isLoggedOn !== "Y")
			history.push("/login");
	}
	
	handleExit = (event) => {
		store.dispatch({type: "SET_IS_LOGGED_STATUS", value: "N"});
		history.push("/login");
	}
	
	render() {
		return (
				<div>
					<div className="row justify-content-center align-items-center">
						{"Добро пожаловать, " + this.props.login + "! Вы успешно вошли в систему."}
					</div>	
					<div className="row justify-content-center align-items-center">
						<input type="button" id="exit" className="btn btn-success" value="Выйти из системы" onClick={this.handleExit}/>
					</div>
				</div>
		);
	}
}

const mapStateToProps = (state) => {
  return {
	login: state.loginParamsState.login,
    isLoggedOn: state.loginParamsState.isLoggedOn
  };
}

export default connect(mapStateToProps)(HomePage);