import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import JoblyApi from './api';
import './CompanyDetail.css';
import UserContext from './UserContext';
import JobCard from './JobCard';

const CompanyDetail = () => {
	const { handle } = useParams();
	const [ company, setCompany ] = useState({});
	const [ jobs, setJobs ] = useState([]);
	const { currUser } = useContext(UserContext);

	useEffect(
		() => {
			async function loadCompany() {
				let res = await JoblyApi.getCompany(handle);
				setCompany(res.company);
				setJobs(res.company.jobs);
			}

			loadCompany();
		},
		[ handle ]
	);

	if (!currUser.username) {
		return <p>Please login to view company details.</p>;
	}
	return (
		<div className="CompanyDetail">
			<h1>{company.name}</h1>
			<p>{company.description}</p>
			{jobs.map((job) => <JobCard key={job.id} job={job} />)}
		</div>
	);
};

export default CompanyDetail;
