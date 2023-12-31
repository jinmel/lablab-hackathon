import { PUBLIC_API_BASE_URL } from '$env/static/public';

export interface Profile {
	gender: string;
	ageFrom: number;
	ageTo: number;
	location: string;
	interests: string[];
	description?: string;
}

export interface Agent {
	id?: string;
	name: string;
	goal: string;
	profile: Profile;
}

export interface Log {
	timestamp: number;
	agent_id: string;
	task_id: string;
	action_id: string;
	action_type: string;
	goal: string;
	url: string;
	step: number;
}

export interface Task {
	id: string;
	goal: string;
	status: string;
}

export class ApiClient {
	constructor(private baseUrl: string) {
		this.baseUrl = baseUrl;
	}

	async createAgent(agent: Agent): Promise<Agent> {
		const response = await fetch(`${this.baseUrl}/agents`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(agent)
		});
		return response.json();
	}

	async getAgents(): Promise<Agent[]> {
		return fetch(`${this.baseUrl}/agents`).then((res) => res.json());
	}

	async getAgent(id: string): Promise<Agent> {
		return fetch(`${this.baseUrl}/agents/${id}`).then((res) => res.json());
	}

	async deleteAgent(id: string) {
		return fetch(`${this.baseUrl}/agents/${id}`, {
			method: 'DELETE'
		}).then((res) => res.json());
	}

	async dispatchAgentTask(id: string, goal: string, numTasks: number): Promise<string> {
        const result = await fetch(`${this.baseUrl}/agents/${id}/dispatch`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                goal,
                n: numTasks
            })
        })
        return result.text();
	}

	async getLogs(): Promise<Log[]> {
		return fetch(`${this.baseUrl}/logs`).then((res) => res.json());
	}

	async getTasks(): Promise<Task[]> {
		return fetch(`${this.baseUrl}/tasks`).then((res) => res.json());
	}
}

export const apiClient = new ApiClient(PUBLIC_API_BASE_URL);
