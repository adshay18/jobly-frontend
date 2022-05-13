import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
	static async request(endpoint, data = {}, method = 'get') {
		console.debug('API Call:', endpoint, data, method);

		//there are multiple ways to pass an authorization token, this is how you pass it in the header.
		//this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
		const url = `${BASE_URL}/${endpoint}`;
		const headers = { Authorization: `Bearer ${JoblyApi.token}` };
		const params = method === 'get' ? data : {};

		try {
			return (await axios({ url, method, data, params, headers })).data;
		} catch (err) {
			console.error('API Error:', err.response);
			let message = err.response.data.error.message;
			throw Array.isArray(message) ? message : [ message ];
		}
	}

	// Individual API routes

	//  --------------  Company routes ------------------

	// Get list of companies
	static async getCompanies(query) {
		let res = await this.request(`companies${query ? '/?' + query : ''}`);
		return res;
	}

	// Add new company to list
	static async addCompany(company) {
		let res = await this.request('companies', company, 'post');
		return res;
	}

	/** Get details on a company by handle. */
	static async getCompany(handle) {
		let res = await this.request(`companies/${handle}`);
		return res;
	}

	// Edit company details
	static async editCompany(handle, company) {
		let res = await this.request(`companies/${handle}`, company, 'patch');
		return res;
	}

	// Delete a company
	static async deleteCompany(handle) {
		let res = await this.request(`companies/${handle}`, 'delete');
		return res;
	}

	//  --------------  Auth routes ------------------

	// the token for interactive with the API will be stored here.
	static token;

	// Authorize user
	static async authUser(user) {
		let res = await this.request('auth/token', user, 'post');
		return res;
	}

	// Register user
	static async registerUser(user) {
		let res = await this.request(`auth/register`, user, 'post');
		return res;
	}

	//  --------------  Job routes ------------------

	// Add new job
	static async addJob(job) {
		let res = await this.request(`jobs`, job, 'post');
		return res;
	}

	// Get list of jobs
	static async getJobs(query) {
		let res = await this.request(`jobs${query ? '/?' + query : ''}`);
		return res;
	}

	// Get info about a single job
	static async getJob(id) {
		let res = await this.request(`jobs/${id}`);
		return res;
	}

	// Edit job details
	static async editJob(id, job) {
		let res = await this.request(`jobs/${id}`, job, 'patch');
		return res;
	}

	// Delete a job
	static async deleteJob(id) {
		let res = await this.request(`jobs/${id}`, 'delete');
		return res;
	}
	//  --------------  User routes ------------------

	// Add new user
	static async addUser(user) {
		let res = await this.request(`users`, user, 'post');
		return res;
	}

	// Get list of users
	static async getUsers() {
		let res = await this.request(`users`);
		return res;
	}

	// Get info about a single user
	static async getUser(username) {
		let res = await this.request(`users/${username}`);
		return res;
	}

	// Edit user details
	static async editUser(username, user) {
		let res = await this.request(`users/${username}`, user, 'patch');
		return res;
	}

	// Delete a user
	static async deleteUser(username) {
		let res = await this.request(`users/${username}`, 'delete');
		return res;
	}

	// Add job to user's applied jobs
	static async applyToJob(username, id) {
		let res = await this.request(`users/${username}/jobs/${id}`, {}, 'post');
		return res;
	}
}

export default JoblyApi;
