import React, {useEffect} from 'react';
import store from '../store/store';
import history from '../store/history';
import {connect} from 'react-redux';

function RequestParamsBar(props){
	
	useEffect(() => {
			if (props.isLoggedOn === "Y")
				history.push("/");
		}, [props.isLoggedOn]
	);
	
	const handleRequestModeChange = (event) => {
		store.dispatch({type: "SET_REQUEST_MODE", value: event.target.value})
	}
	
	const handleContentTypeChange = (event) => {
		store.dispatch({type: "SET_CONTENT_TYPE", value: event.target.value})
	}
	
	const handleUrlIPChange = (event) => {
		store.dispatch({type: "SET_URL_IP", value: event.target.value})
	}
	
	const handleUrlPortChange = (event) => {
		store.dispatch({type: "SET_URL_PORT", value: event.target.value})
	}
	
	const handleUrlMethodChange = (event) => {
		store.dispatch({type: "SET_URL_METHOD", value: event.target.value})
	}
	
	const handleSaveRequestParams = (event) => {
		store.dispatch({type: "SAVE_REQUEST_PARAMS"});
		history.push('/login');
	}
	
	const handleUndoRequestParams = (event) => {
		store.dispatch({type: "UNDO_REQUEST_PARAMS_CHANGES"});
		history.push('/login');
	}
	
	return(
			<div className="container-fluid">
				<div className="row justify-content-start align-items-center h6 pl-4 mt-4 mb-5">
					<div className="col-md-auto">
						Параметры запроса к серверу:
					</div>
				</div>
				<div className="row justify-content-start align-items-center pl-4 my-4">
					<div className="col-md-auto">
						<label htmlFor="ajax-mode" className="col-form-label text-right">Режим запросов:</label>
					</div>
					<div className="col-md-auto pl-0">
						<select id="ajax-mode" className="form-control" onChange={handleRequestModeChange} defaultValue={props.requestMode}>
							<option>Fetch</option>
							<option>Axios</option>
							<option>XMLHttpRequest</option>
						</select>
					</div>
				</div>
				<div className="row justify-content-start align-items-center pl-4 my-4">
					<div className="col-md-auto">
						<label htmlFor="url-main" className="col-form-label text-right">URL:</label>
					</div>
					<div className="col-md-auto px-0">
						<input type="text" id="url-main" className="form-control" value={props.urlIP} onChange={handleUrlIPChange}/>
					</div>
					<div className="col-md-auto px-2">
						<label htmlFor="url-port" className="col-form-label text-right">:</label>
					</div>
					<div className="col-md-1 px-0">
						<input type="text" id="url-port" className="form-control" value={props.urlPort} onChange={handleUrlPortChange}/>
					</div>
					<div className="col-md-auto px-2">
						<label htmlFor="url-method" className="col-form-label text-right">/</label>
					</div>
					<div className="col-md-auto px-0">
						<input type="text" id="url-method" className="form-control" value={props.urlMethod} onChange={handleUrlMethodChange}/>
					</div>
				</div>
				<div className="row justify-content-start align-items-center pl-4 my-4">
					<div className="col-md-auto">
						<label htmlFor="content-type" className="col-form-label text-right">Content-Type:</label>
					</div>
					<div className="col-md-auto pl-0">
						<select id="content-type" className="form-control" onChange={handleContentTypeChange} defaultValue={props.contentType}>
							<option>application/json</option>
							<option>text/plain</option>
						</select>
					</div>
				</div>
				<div className="row justify-content-start align-items-center pl-4 my-5">
					<div className="col-md-auto">
						<input type="button" id="save-request-params" className="btn btn-success mr-2" value="Сохранить" onClick={handleSaveRequestParams}/>
						<input type="button" id="undo-request-params" className="btn btn-success ml-2" value="Отменить" onClick={handleUndoRequestParams}/>
					</div>
				</div>
			</div>
	)
}

const mapStateToProps = (state) => {
  return {
	...state.requestParamsState,
	isLoggedOn: state.loginParamsState.isLoggedOn
  };
}

export default connect(mapStateToProps)(RequestParamsBar);