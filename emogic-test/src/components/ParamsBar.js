import React from 'react';

class ParamsBar extends React.Component{
	constructor(props){
		super(props);
		this.state = {isOpen: false, localhostMode: (this.props.urlIP === "localhost")};
		this.handleAjaxModeChange = this.handleAjaxModeChange.bind(this);
		this.handleLocalhostModeChange = this.handleLocalhostModeChange.bind(this);
		this.handleUrlIPChange = this.handleUrlIPChange.bind(this);
		this.handleUrlPortChange = this.handleUrlPortChange.bind(this);
		this.handleUrlMethodChange = this.handleUrlMethodChange.bind(this);
		this.handleContentTypeChange = this.handleContentTypeChange.bind(this);
		this.handleSaveData = this.handleSaveData.bind(this);
	}
	
	handleAjaxModeChange = (event) => {
		this.props.setStateField("ajaxMode", event.target.value);
	}
	
	handleContentTypeChange = (event) => {
		this.props.setStateField("contentType", event.target.value);
	}
	
	handleLocalhostModeChange = (event) => {
		this.setState({localhostMode: event.target.checked});
		this.props.setStateField("urlIP", (event.target.checked) ? "localhost" : this.props.urlIPDefault);
	}
	
	handleIsOpenChange = (event) => {
		this.setState({isOpen: event.target.checked});
	}
	
	handleUrlIPChange = (event) => {
		this.props.setStateField("urlIP", event.target.value);
		this.setState({localhostMode: event.target.value === "localhost"});
	}
	
	handleUrlPortChange = (event) => {
		this.props.setStateField("urlPort", event.target.value);
	}
	
	handleUrlMethodChange = (event) => {
		this.props.setStateField("urlMethod", event.target.value);
	}
	
	handleSaveData = (event) => {
		event.preventDefault();
		this.props.saveData();
	}
	
	render(){
		return(
				<div className="container-fluid">
					<div className="container-fluid">
						<div className="row justify-content-start align-items-center small">
							<div className="col-md-auto">
								<label htmlFor="open-params" className="form-check-label col-form-label">Параметры:</label>
							</div>
							<div className="col-md-auto pt-1 px-0">
								<input type="checkbox" id="open-params" className="input-sm" checked={this.state.isOpen} onChange={this.handleIsOpenChange} />
							</div>
						</div>
					</div>
					<div className="container-fluid" style={{"display" : ((this.state.isOpen) ? "block" : "none")}}>
						<div className="row justify-content-start align-items-center small">
							<div className="col-md-auto">
								<label htmlFor="ajax-mode" className="col-form-label text-right">Режим запросов к серверу:</label>
							</div>
							<div className="col-md-auto pl-0">
								<select id="ajax-mode" className="input-sm" onChange={this.handleAjaxModeChange} defaultValue={this.props.ajaxMode}>
									<option>Fetch</option>
									<option>XMLHttpRequest</option>
								</select>
							</div>
							<div className="col-md-auto">
								<label htmlFor="localhost-mode" className="form-check-label col-form-label">Запросы к localhost:</label>
							</div>
							<div className="col-md-auto pt-1 px-0">
								<input type="checkbox" id="localhost-mode" className="input-sm" checked={this.state.localhostMode} onChange={this.handleLocalhostModeChange} />
							</div>
						</div>
						<div className="row justify-content-start align-items-center small">
							<div className="col-md-auto">
								<label htmlFor="url-main" className="col-form-label text-right">URL:</label>
							</div>
							<div className="col-md-auto px-0">
								<input type="text" id="url-main" className="input-sm" value={this.props.urlIP} onChange={this.handleUrlIPChange} readOnly={this.state.localhostMode}/>
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
							<div className="col-md-auto">
								<select id="content-type" className="form-control" onChange={this.handleContentTypeChange} defaultValue={this.props.contentType}>
									<option>application/json</option>
									<option>text/plain</option>
								</select>
							</div>
							<div className="col-md-auto">
								<input type="button" id="save-button" className="btn btn-success" value="Сохранить" onClick={this.handleSaveData}/>
							</div>
						</div>
					</div>
				</div>
		)
	}
}

export default ParamsBar;