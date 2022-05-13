import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Button, Card, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import UserContext from './UserContext';
import './SignupForm.css';
import JoblyApi from './api';

const SignupForm = () => {
	const INIT = { username: '', password: '', firstName: '', lastName: '', email: '' };
	const [ formData, setFormData ] = useState(INIT);
	const history = useHistory();
	const { login, signup } = useContext(UserContext);
	const [ errors, setErrors ] = useState([]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			let token = await signup(formData);
			if (token) {
				JoblyApi.token = token;
				login(token);
				setFormData(INIT);
				history.push('/');
			}
		} catch (err) {
			setErrors(err);
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
			<CardTitle>Sign Up</CardTitle>
			{errors ? <CardSubtitle>Username already taken, please pick another.</CardSubtitle> : null}
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
					<FormGroup>
						<Label htmlFor="first-name">First name</Label>
						<Input
							type="text"
							id="first-name"
							name="firstName"
							value={formData.firstName}
							onChange={handleChange}
							required
						/>
					</FormGroup>
					<FormGroup>
						<Label htmlFor="last-name">Last name</Label>
						<Input
							type="text"
							id="last-name"
							name="lastName"
							value={formData.lastName}
							onChange={handleChange}
							required
						/>
					</FormGroup>
					<FormGroup>
						<Label htmlFor="email">Email</Label>
						<Input
							type="email"
							id="email"
							name="email"
							value={formData.email}
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

export default SignupForm;
