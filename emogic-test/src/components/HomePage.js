import React, {useEffect} from 'react';
import history from '../store/history';
import {connect} from 'react-redux';

function HomePage(props){
	
	useEffect(() => {
			if (props.isLoggedOn !== "Y")
				history.push("/login");
		}, [props.isLoggedOn]
	);

	return (
			<div className="container-fluid">
				<div className="row justify-content-start align-items-center pl-4 my-3">
					<div className="col-md-auto">
						Добро пожаловать,&nbsp;<b>{props.login}</b>! Вы успешно вошли в систему.
					</div>
				</div>	
				<div className="row justify-content-start align-items-center pl-4 my-3">
					<div className="col-md-auto">
						<input type="button" id="exit" className="btn btn-success" value="Выйти из системы" onClick={props.handleExit}/>
					</div>
				</div>
			</div>
	);
}

const mapStateToProps = (state) => {
  return {
	login: state.login,
    isLoggedOn: state.isLoggedOn
  };
}

const mapDispatchToProps = (dispatch) => {
	return {
		handleExit: () => dispatch({type: "SET_PARAM", paramName: "isLoggedOn", paramValue: "N", sessionStorageFlg: "Y"})
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);