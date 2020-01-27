import React, {useEffect} from 'react';
import history from '../store/history';
import {connect} from 'react-redux';

function RequestParamsBar(props){
	
	useEffect(() => {
			if (props.isLoggedOn === "Y")
				history.push("/");
		}, [props.isLoggedOn]
	);
	
	return(
			<div className="container-fluid">
				<div className="row justify-content-start align-items-center h6 pl-4 mt-4 mb-5">
					<div className="col-md-auto">
						Параметры запроса к серверу:
					</div>
				</div>
				<div className="row justify-content-start align-items-center pl-4 my-4">
					<div className="col-md-auto">
						<label htmlFor="requestMode" className="col-form-label text-right">Режим запросов:</label>
					</div>
					<div className="col-md-auto pl-0">
						<select id="requestMode" className="form-control" onChange={props.handleInputChange} defaultValue={props.requestMode}>
							<option>Axios</option>
							<option>Fetch</option>
							<option>XMLHttpRequest</option>
						</select>
					</div>
				</div>
				<div className="row justify-content-start align-items-center pl-4 my-4">
					<div className="col-md-auto">
						<label htmlFor="urlIP" className="col-form-label text-right">URL:</label>
					</div>
					<div className="col-md-auto px-0">
						<input type="text" id="urlIP" className="form-control" value={props.urlIP} onChange={props.handleInputChange}/>
					</div>
					<div className="col-md-auto px-2">
						<label htmlFor="urlPort" className="col-form-label text-right">:</label>
					</div>
					<div className="col-md-1 px-0">
						<input type="text" id="urlPort" className="form-control" value={props.urlPort} onChange={props.handleInputChange}/>
					</div>
					<div className="col-md-auto px-2">
						<label htmlFor="urlMethod" className="col-form-label text-right">/</label>
					</div>
					<div className="col-md-auto px-0">
						<input type="text" id="urlMethod" className="form-control" value={props.urlMethod} onChange={props.handleInputChange}/>
					</div>
				</div>
				<div className="row justify-content-start align-items-center pl-4 my-4">
					<div className="col-md-auto">
						<label htmlFor="contentType" className="col-form-label text-right">Content-Type:</label>
					</div>
					<div className="col-md-auto pl-0">
						<select id="contentType" className="form-control" onChange={props.handleInputChange} defaultValue={props.contentType}>
							<option>application/json</option>
							<option>text/plain</option>
						</select>
					</div>
				</div>
				<div className="row justify-content-start align-items-center pl-4 my-5">
					<div className="col-md-auto">
						<input type="button" id="save-request-params" className="btn btn-success mr-2" value="Сохранить" onClick={props.handleSaveRequestParams}/>
						<input type="button" id="undo-request-params" className="btn btn-success ml-2" value="Отменить" onClick={props.handleUndoRequestParams}/>
					</div>
				</div>
			</div>
	)
}

const mapStateToProps = (state) => {
  return {
	...state
  };
}

const mapDispatchToProps = (dispatch) => {
	return {
		handleInputChange: (event) => {dispatch({type: "SET_PARAM", paramName: event.target.id, paramValue: event.target.value})},
		handleSaveRequestParams: (event) => {dispatch({type: "SAVE_REQUEST_PARAMS"}); history.push('/login');},
		handleUndoRequestParams: (event) => {dispatch({type: "UNDO_REQUEST_PARAMS_CHANGES"}); history.push('/login');}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestParamsBar);