import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Button, Card, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import UserContext from './UserContext';
import './LoginForm.css';
import JoblyApi from './api';

const LoginForm = () => {
	const { login } = useContext(UserContext);
	const INIT = { username: '', password: '' };
	const [ formData, setFormData ] = useState(INIT);
	const history = useHistory();
	const [ errors, setErrors ] = useState([]);

	async function auth(info) {
		let res = await JoblyApi.authUser(info);
		return res.token;
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			let token = await auth(formData);
			if (token) {
				JoblyApi.token = token;
				login(token);
				setFormData(INIT);
				history.push('/');
			}
		} catch (err) {
			setErrors([ err ]);
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((data) => ({
			...data,
			[name]: value
		}));
	};
	return (
		<Card>
			<CardTitle>Log In</CardTitle>
			{errors ? <CardSubtitle>{errors}</CardSubtitle> : null}
			<CardBody>
				<Form onSubmit={handleSubmit}>
					<FormGroup>
						<Label htmlFor="username">Username</Label>
						<Input
							type="text"
							id="username"
							name="username"
							value={formData.username}
							onChange={handleChange}
							required
						/>
					</FormGroup>
					<FormGroup>
						<Label htmlFor="username">Password</Label>
						<Input
							type="password"
							id="password"
							name="password"
							value={formData.password}
							onChange={handleChange}
							required
						/>
					</FormGroup>

					<Button>Submit</Button>
				</Form>
			</CardBody>
		</Card>
	);
};

export default LoginForm;
