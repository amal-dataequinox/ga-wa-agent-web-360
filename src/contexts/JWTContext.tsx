import faker from "faker";
import { createContext, ReactNode, useEffect, useReducer } from "react";
import { isValidToken, setSession } from "../utils/jwt";
// @types
import {
	ActionMap,
	AuthState,
	AuthUser,
	JWTContextType,
} from "../@types/authentication";
import axiosInstance from "../utils/axios";
import URLConstants from "../constants/urlConstants";


// ----------------------------------------------------------------------

enum Types {
	Initial = "INITIALIZE",
	Login = "LOGIN",
	Logout = "LOGOUT",
	Register = "REGISTER",
}

type JWTAuthPayload = {
	[Types.Initial]: {
		isAuthenticated: boolean;
		user: AuthUser;
	};
	[Types.Login]: {
		user: AuthUser;
	};
	[Types.Logout]: undefined;
	[Types.Register]: {
		user: AuthUser;
	};
};

export type JWTActions = ActionMap<JWTAuthPayload>[keyof ActionMap<JWTAuthPayload>];

const initialState: AuthState = {
	isAuthenticated: false,
	isInitialized: false,
	user: null,
};

const JWTReducer = (state: AuthState, action: JWTActions) => {
	switch (action.type) {
		case "INITIALIZE":
			return {
				isAuthenticated: action.payload.isAuthenticated,
				isInitialized: true,
				user: action.payload.user,
			};
		case "LOGIN":
			return {
				...state,
				isAuthenticated: true,
				user: action.payload.user,
			};
		case "LOGOUT":
			return {
				...state,
				isAuthenticated: false,
				user: null,
			};

		case "REGISTER":
			return {
				...state,
				isAuthenticated: false,
				user: action.payload.user,
			};

		default:
			return state;
	}
};

const AuthContext = createContext<JWTContextType | null>(null);

function AuthProvider({ children }: { children: ReactNode }) {
	const [state, dispatch] = useReducer(JWTReducer, initialState);

	useEffect(() => {
		const initialize =  () => {
			try {
				const accessToken =  window.localStorage.getItem("accessToken");

				if (accessToken && isValidToken(accessToken)) {
					setSession(accessToken);
					/* 
					const response = await axios.get("/api/account/my-account");
					const { user } = response.data;
*/
					const user = {
						// id: "8864c717-587d-472a-929a-8e5f298024da-0",
						//displayName: "",
						// email: "demo@minimals.cc",
						// password: "demo1234",
						//photoURL: "/static/mock-images/avatars/avatar_default.jpg",
						// phoneNumber: "+40 777666555",
						// country: "United States",
						// address: "90210 Broadway Blvd",
						// state: "California",
						// city: "San Francisco",
						// zipCode: "94116",
						// about: faker.lorem.paragraphs(),
						// role: "Customer",
						// isPublic: true,
					};
					dispatch({
						type: Types.Initial,
						payload: {
							isAuthenticated: true,
							user,
						},
					});
				} else {
					dispatch({
						type: Types.Initial,
						payload: {
							isAuthenticated: false,
							user: null,
						},
					});
				}
			} catch (err) {
				console.error(err);
				dispatch({
					type: Types.Initial,
					payload: {
						isAuthenticated: false,
						user: null,
					},
				});
			}
		};

		initialize();
	}, []);

    const login = async (userName: string, password: string) => {

        console.log(userName, password);

        const response = await axiosInstance.post(URLConstants.LOGIN_BASE_URL, {
            userName,
            password,
        });
        console.log(response);
        
        const res = response.data.data;
        console.log(res);
        localStorage.setItem("authUser", JSON.stringify(res));
        const { accessToken } = res;
        const user = {
            id: "8864c717-587d-472a-929a-8e5f298024da-0",
            displayName: "Jaydon Frankie",
            email: "demo@minimals.cc",
            password: "demo1234",
            photoURL: "/static/mock-images/avatars/avatar_default.jpg",
            phoneNumber: "+40 777666555",
            country: "United States",
            address: "90210 Broadway Blvd",
            state: "California",
            city: "San Francisco",
            zipCode: "94116",
            about: "faker.lorem.paragraphs()",
            role: "Customer",
            isPublic: true,
           // token :accessToken
        };

        setSession(accessToken);
        dispatch({
            type: Types.Login,
            payload: {
                user,
            },
        });
    };

	const register = async (
		firstName: string,
		 lastName: string, 
		 userName: string, 
		 password:string,
		 email: string, 
		 contactNumber: string, 
		 accountName: string,
		
	
		
	) => {
		console.log(firstName,lastName,userName,password,email,contactNumber,accountName,);
		const response = await axiosInstance.post( URLConstants.SIGNUP_BASE_URL, {
			firstName,
			lastName,
			userName,
			password,
			email,
			contactNumber,
			accountName,
		
		});
		const { accessToken, user } = response.data;

		//window.localStorage.setItem("accessToken", accessToken);
		dispatch({
			type: Types.Register,
			payload: {
				user,
			},
		});
	};

	const logout = async () => {
		setSession(null);
		dispatch({ type: Types.Logout });
	};

	const resetPassword = (email: string) => console.log(email);

	const updateProfile = () => { };

	return (
		<AuthContext.Provider
			value={{
				...state,
				method: "jwt",
				login,
				logout,
				register,
				resetPassword,
				updateProfile,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export { AuthContext, AuthProvider };
