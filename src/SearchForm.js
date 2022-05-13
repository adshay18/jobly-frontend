import React, { useState } from 'react';
import { Form, FormGroup, Input, Button } from 'reactstrap';
import './SearchForm.css';
import JoblyApi from './api';

const SearchForm = ({ addCompanies, addJobs, type }) => {
	const INIT = { searchTerm: '' };
	const [ formData, setFormData ] = useState(INIT);

	async function filterCompanies() {
		let term = formData.searchTerm;
		if (type === 'company') {
			let queryString = 'name=' + term;
			let res = await JoblyApi.getCompanies(queryString);
			addCompanies(res.companies);
		}
		if (type === 'job') {
			let queryString = 'title=' + term;
			let res = await JoblyApi.getJobs(queryString);
			addJobs(res.jobs);
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		filterCompanies();
		setFormData(INIT);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((data) => ({
			...data,
			[name]: value
		}));
	};

	return (
		<form className="SearchForm" onSubmit={handleSubmit}>
			<input
				className="SearchForm-input"
				type="text"
				placeholder="Enter search term..."
				name="searchTerm"
				value={formData.searchTerm}
				onChange={handleChange}
			/>
			<button className="SearchForm-button" type="submit">
				Submit
			</button>
		</form>
	);
};

SearchForm.defaultProps = { addCompanies: null, addJobs: null, type: null };

export default SearchForm;
