import { Login } from "./Login";
import { DataTable } from "./Table";
import { getToken } from "utils/auth-provider";
import { useEffect, useState } from "react";
import { useAuth } from "context/auth-context";

const App = () => {
	const [token, setToken] = useState<null | string>("");
	const { user } = useAuth();
	useEffect(() => {
		setToken(getToken());
	}, [user]);
	return token ? <DataTable /> : <Login />;
};

export default App;
