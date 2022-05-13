import React, { useContext, useState } from 'react';
import { Button, Card, CardBody, CardSubtitle } from 'reactstrap';
import JoblyApi from './api';
import UserContext from './UserContext';

const JobCard = ({ job }) => {
	const { currUser } = useContext(UserContext);
	const [ applications, setApplications ] = useState(currUser.applications);

	const apply = async (username, jobId) => {
		await JoblyApi.applyToJob(username, jobId);
		setApplications([ ...applications, job.id ]);
	};
	return (
		<Card className="card job-link">
			<CardBody>
				<h6 className="card-title job-title">{job.title}</h6>
				<CardSubtitle>{job.companyName}</CardSubtitle>
				<p>
					<small>{job.salary ? 'Salary: $' + job.salary : ''}</small>
				</p>
				<p>
					<small>{job.equity ? 'Equity: ' + job.equity : ''}</small>
				</p>
				{applications.includes(job.id) ? (
					<Button>Applied</Button>
				) : (
					<Button onClick={() => apply(currUser.username, job.id)}>Apply</Button>
				)}
			</CardBody>
		</Card>
	);
};

export default JobCard;
