import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import {Provider} from 'react-redux';
import {Router, Switch, Route} from 'react-router-dom';
import store from './store/store';
import history from './store/history';
import HomePage from './components/HomePage';
import LoginForm from './components/LoginForm';
import RequestParamsBar from './components/RequestParamsBar';

function App() {
  return (
    <div className="App">
		<Provider store={store}>
			<Router history={history}>
				<Route exact path='/' component={HomePage}/>
				<Route exact path='/login' component={LoginForm}/>
				<Route exact path='/login/request_params' component={RequestParamsBar}/>
			</Router>
		</Provider>
    </div>
  );
}

export default App;
