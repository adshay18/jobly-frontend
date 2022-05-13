import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './NavBar';
import Home from './Home';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import EditProfileForm from './EditProfileForm';
import CompanyList from './CompanyList';
import CompanyDetail from './CompanyDetail';
import JobList from './JobList';

const Routes = () => {
	return (
		<Router>
			<NavBar />
			<main>
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route exact path="/companies">
						<CompanyList />
					</Route>
					<Route path="/companies/:handle">
						<CompanyDetail />
					</Route>
					<Route exact path="/jobs">
						<JobList />
					</Route>
					<Route exact path="/login">
						<LoginForm />
					</Route>
					<Route exact path="/signup">
						<SignupForm />
					</Route>
					<Route exact path="/profile">
						<EditProfileForm />
					</Route>
					<Route>
						<p>404 page not found</p>
					</Route>
				</Switch>
			</main>
		</Router>
	);
};

export default Routes;
