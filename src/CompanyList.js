import React, { useEffect, useState, useContext } from 'react';
import JoblyApi from './api';
import { CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import SearchForm from './SearchForm';
import UserContext from './UserContext';
import './CompanyList.css';

const CompanyList = () => {
	const [ isLoading, setIsLoading ] = useState(true);
	const [ companies, setCompanies ] = useState([]);
	const { currUser } = useContext(UserContext);

	useEffect(() => {
		async function getCompanyList() {
			let res = await JoblyApi.getCompanies();
			setCompanies(res.companies);
			setIsLoading(false);
		}
		getCompanyList();
	}, []);

	const addCompanies = (results) => {
		setCompanies(results);
	};

	if (isLoading) {
		return <p>Loading &hellip;</p>;
	}

	if (!currUser.username) {
		return <p>Please login to view companies.</p>;
	}

	return (
		<div className="CompanyList">
			<SearchForm addCompanies={addCompanies} type="company" />
			{companies.map((company) => (
				<Link key={company.handle} className="card company-link" to={`/companies/${company.handle}`}>
					<CardBody>
						<h6 className="card-title company-title">{company.name}</h6>
						<p>
							<small>{company.description}</small>
						</p>
					</CardBody>
				</Link>
			))}
		</div>
	);
};

export default CompanyList;
