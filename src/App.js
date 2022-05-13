import React, { useState, useEffect } from 'react';
import './App.css';
import Routes from './Routes';
import UserContext from './UserContext';
import JoblyApi from './api';
import jwt from 'jwt-decode';

function App() {
	const [ currUser, setCurrUser ] = useState({});
	const [ token, setToken ] = useState(localStorage.getItem('Jobly-Token'));

	const login = (token) => {
		setToken(token);
		localStorage.setItem('Jobly-Token', token);
	};
	const logout = () => {
		localStorage.removeItem('Jobly-Token');
		setCurrUser({});
		setToken(undefined);
	};
	const signup = async (info) => {
		let res = await JoblyApi.registerUser(info);
		return res.token;
	};

	useEffect(
		() => {
			async function getUser(username) {
				let res = await JoblyApi.getUser(username);
				setCurrUser(res.user);
			}
			if (token) {
				JoblyApi.token = token;
				let loggedInUser = jwt(token).username;
				if (loggedInUser) {
					getUser(loggedInUser);
				}
			}
		},
		[ token ]
	);

	return (
		<UserContext.Provider value={{ currUser, token, login, logout, signup }}>
			<div className="App">
				<Routes />
			</div>
		</UserContext.Provider>
	);
}

export default App;
