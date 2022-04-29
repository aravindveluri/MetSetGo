// import axios from "axios";
// import jwt_decode from "jwt-decode";
// import dayjs from "dayjs";
// import { useContext } from "react";
// import AuthContext from "../context/AuthContext";

// const baseURL = "http://127.0.0.1:8000/api";

// const useAxios = () => {
//   const { authTokens, setUser, setAuthTokens } = useContext(AuthContext);

//   const axiosInstance = axios.create({
//     baseURL,
//     headers: { Authorization: `Bearer ${authTokens?.access}` }
//   });

//   axiosInstance.interceptors.request.use(async req => {
//     const user = jwt_decode(authTokens.access);
//     const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

//     if (!isExpired) return req;

//     const response = await axios.post(`${baseURL}/auth/token/refresh/`, {
//       refresh: authTokens.refresh
//     });

//     localStorage.setItem("authTokens", JSON.stringify(response.data));

//     setAuthTokens(response.data);
//     setUser(jwt_decode(response.data.access));

//     req.headers.Authorization = `Bearer ${response.data.access}`;
//     return req;
//   });

//   return axiosInstance;
// };

// export default useAxios;





import axiosInstance from "./api";
import TokenService from "./TokenService";
// import { RefreshTokenAction } from "../actions/authActions";
const setup = (store) => {
	axiosInstance.interceptors.request.use(
		(config) => {
			const token = TokenService.getLocalAccessToken();
			if (token) {
				config.headers["Authorization"] = 'Bearer ' + token;
			}
			return config;
		},
		(error) => {
			return Promise.reject(error);
		}
	);
	const { dispatch } = store;
	axiosInstance.interceptors.response.use(
		(res) => {
			return res;
		},
		async (err) => {
			console.log(err, err.config)
			const originalConfig = err.config;
			if (originalConfig.url !== "/auth/token/refresh/" && err.response) {
				// Access Token expired
				if (err.response.status === 401 && !originalConfig._retry) {
					originalConfig._retry = true;
					try {
						const rs = await axiosInstance.post("/auth/token/refresh/", {
							refresh: TokenService.getLocalRefreshToken(),
						});
						const authTokens = rs.data;
						// dispatch(RefreshTokenAction(authTokens));
						TokenService.setAuthTokens(authTokens);
						return axiosInstance(originalConfig);
					} catch (_error) {
						return Promise.reject(_error);
					}
				}
			}
			return Promise.reject(err);
		}
	);
};
export default setup;