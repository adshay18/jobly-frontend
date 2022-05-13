import React, { useEffect, useState, useContext } from 'react';
import JoblyApi from './api';
import SearchForm from './SearchForm';
import JobCard from './JobCard';
import UserContext from './UserContext';

const JobList = () => {
	const [ isLoading, setIsLoading ] = useState(true);
	const [ jobs, setJobs ] = useState([]);
	const { currUser } = useContext(UserContext);

	useEffect(() => {
		async function getJobList() {
			let res = await JoblyApi.getJobs();
			setJobs(res.jobs);
			setIsLoading(false);
		}
		getJobList();
	}, []);

	const addJobs = (results) => {
		setJobs(results);
	};

	if (isLoading) {
		return <p>Loading &hellip;</p>;
	}

	if (!currUser.username) {
		return <p>Please login to view companies.</p>;
	}
	return (
		<div className="JobList">
			<SearchForm addJobs={addJobs} type="job" />
			{jobs.map((job) => <JobCard key={job.id} job={job} />)}
		</div>
	);
};

export default JobList;
