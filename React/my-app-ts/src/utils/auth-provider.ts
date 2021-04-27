const tokenKey: string = "AUTH_TOKEN";

export interface IUser {
	username: string;
	password: string;
}
export interface IRUser extends IUser {
	token: string;
	avatar?: string;
}

export const getToken = () => {
	return localStorage.getItem(tokenKey);
};

export const setToken = ({ data }: { data: Omit<IRUser, "password"> }) => {
	localStorage.setItem(tokenKey, data.token);
	return data;
};

export const login = (data: IUser) => {
	return fetch("/mockApi/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	}).then(async (response: Response) => {
		return setToken(await response.json());
	});
};

export const register = (data: IUser) => {
	return fetch("/mockApi/register", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	}).then(async (response: Response) => {
		return setToken(await response.json());
	});
};

export const logout = async () => localStorage.removeItem(tokenKey);
