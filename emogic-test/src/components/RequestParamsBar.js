import React from 'react';
import store from '../store/store';
import history from '../store/history';
import {connect} from 'react-redux';

class RequestParamsBar extends React.Component{
	constructor(props){
		super(props);
		this.handleRequestModeChange = this.handleRequestModeChange.bind(this);
		this.handleUrlIPChange = this.handleUrlIPChange.bind(this);
		this.handleUrlPortChange = this.handleUrlPortChange.bind(this);
		this.handleUrlMethodChange = this.handleUrlMethodChange.bind(this);
		this.handleContentTypeChange = this.handleContentTypeChange.bind(this);
		this.handleSaveRequestParams = this.handleSaveRequestParams.bind(this);
	}
	
	handleRequestModeChange = (event) => {
		store.dispatch({type: "SET_REQUEST_MODE", value: event.target.value})
	}
	
	handleContentTypeChange = (event) => {
		store.dispatch({type: "SET_CONTENT_TYPE", value: event.target.value})
	}
	
	handleUrlIPChange = (event) => {
		store.dispatch({type: "SET_URL_IP", value: event.target.value})
	}
	
	handleUrlPortChange = (event) => {
		store.dispatch({type: "SET_URL_PORT", value: event.target.value})
	}
	
	handleUrlMethodChange = (event) => {
		store.dispatch({type: "SET_URL_METHOD", value: event.target.value})
	}
	
	handleSaveRequestParams = (event) => {
		store.dispatch({type: "SAVE_REQUEST_PARAMS"});
		history.push('/login');
	}
	
	render(){
		return(
					<div className="container-fluid">
						<div className="row justify-content-start align-items-center small">
							<div className="col-md-auto">
								<label htmlFor="ajax-mode" className="col-form-label text-right">Режим запросов к серверу:</label>
							</div>
							<div className="col-md-auto pl-0">
								<select id="ajax-mode" className="input-sm" onChange={this.handleRequestModeChange} defaultValue={this.props.requestMode}>
									<option>Fetch</option>
									<option>XMLHttpRequest</option>
								</select>
							</div>
						</div>
						<div className="row justify-content-start align-items-center small">
							<div className="col-md-auto">
								<label htmlFor="url-main" className="col-form-label text-right">URL:</label>
							</div>
							<div className="col-md-auto px-0">
								<input type="text" id="url-main" className="input-sm" value={this.props.urlIP} onChange={this.handleUrlIPChange}/>
							</div>
							<div className="col-md-auto px-2">
								<label htmlFor="url-port" className="col-form-label text-right">:</label>
							</div>
							<div className="col-md-auto px-0">
								<input type="text" id="url-port" className="input-sm" value={this.props.urlPort} onChange={this.handleUrlPortChange}/>
							</div>
							<div className="col-md-auto px-2">
								<label htmlFor="url-method" className="col-form-label text-right">/</label>
							</div>
							<div className="col-md-auto px-0">
								<input type="text" id="url-method" className="input-sm" value={this.props.urlMethod} onChange={this.handleUrlMethodChange}/>
							</div>
						</div>
						<div className="row justify-content-start align-items-center small">
							<div className="col-md-auto">
								<label htmlFor="content-type" className="col-form-label text-right">Content-Type:</label>
							</div>
							<div className="col-md-auto pl-0">
								<select id="content-type" className="input-sm" onChange={this.handleContentTypeChange} defaultValue={this.props.contentType}>
									<option>application/json</option>
									<option>text/plain</option>
								</select>
							</div>
						</div>
						<div className="row justify-content-start align-items-center">
							<input type="button" id="save-request-params" className="btn btn-success" value="Сохранить" onClick={this.handleSaveRequestParams}/>
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
	contentType: state.requestParamsState.contentType
  };
}

export default connect(mapStateToProps)(RequestParamsBar);