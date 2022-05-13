import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Button, Card, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import UserContext from './UserContext';
import './EditProfileForm.css';
import JoblyApi from './api';

const EditProfileForm = () => {
	const { currUser, login } = useContext(UserContext);
	const INIT = { password: '', firstName: currUser.firstName, lastName: currUser.lastName, email: currUser.email };
	const [ formData, setFormData ] = useState(INIT);
	const [ errors, setErrors ] = useState([]);
	const history = useHistory();

	if (!currUser.username) {
		history.push('/login');
	}

	async function auth(info) {
		let res = await JoblyApi.authUser(info);
		return res.token;
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			let token = await auth({ username: currUser.username, password: formData.password });
			if (token) {
				await JoblyApi.editUser(currUser.username, formData);
				login(token);
				history.push('/');
				setFormData(INIT);
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
			<CardTitle>Profile</CardTitle>
			<CardSubtitle>{currUser.username}</CardSubtitle>
			{errors ? <CardSubtitle>{errors}</CardSubtitle> : null}
			<CardBody>
				<Form onSubmit={handleSubmit}>
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
					<FormGroup>
						<Label htmlFor="username">Confirm password to make changes:</Label>
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

export default EditProfileForm;
