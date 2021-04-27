import { createContext, ReactNode, useState, useContext } from "react";
import * as auth from "../utils/auth-provider";

export const AuthContext = createContext<
	| {
			user: Omit<auth.IRUser, "password"> | null;
			register: (data: auth.IUser) => Promise<void>;
			login: (data: auth.IUser) => Promise<void>;
			logout: () => Promise<void>;
	  }
	| undefined
>(undefined);
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<Omit<auth.IRUser, "password"> | null>(null);

	const login = (data: auth.IUser) => auth.login(data).then(setUser);
	const register = (data: auth.IUser) => auth.register(data).then(setUser);
	const logout = () => auth.logout().then(() => setUser(null));

	return (
		<AuthContext.Provider
			children={children}
			value={{ user, login, register, logout }}
		/>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("userAuth必须在AuthProiver中使用");
	}
	return context;
};
