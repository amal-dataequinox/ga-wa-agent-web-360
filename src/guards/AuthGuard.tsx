import { useState, ReactNode } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Login from "../pages/Auth/Login";
import useAuth from "../pages/Auth/useAuth";

type AuthGuardProps = {
	children: ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
	const { isAuthenticated } = useAuth();
	console.log("Is authenticated", isAuthenticated);
	const { pathname } = useLocation();
	const history = useHistory();
	const [requestedLocation, setRequestedLocation] = useState<string | null>(
		null
	);

	if (!isAuthenticated) {
		if (pathname !== requestedLocation) {
			setRequestedLocation(pathname);
		}
		return <Login />;
	}

	if (requestedLocation && pathname !== requestedLocation) {
		setRequestedLocation(null);
		return history.push(requestedLocation);
	}

	return <>{children}</>;
}
