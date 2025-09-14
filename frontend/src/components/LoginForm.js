import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, resetLoginForm, setLoginForm } from "../stores/authReducer";


const LoginForm = () => {
	const loginForm = useSelector((state) => state.auth.loginForm);
	const loadingLogin = useSelector((state) => state.auth.loadingLogin);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const updateLoginForm = (e) => {
		const { name, value } = e.target;
		dispatch(
			setLoginForm({
				...loginForm,
				[name]: value,
			})
		);
	};

const handleLogin = async (e) => {
	e.preventDefault();
	try {
		await dispatch(login(loginForm)).unwrap(); // thunk call karega
		dispatch(resetLoginForm());
		navigate("/"); // login ke baad notes page ya create note pe bhej dega
	} catch (err) {
		console.error("Login failed:", err);
		alert("Login failed: " + (err.message || "Unknown error"));
	}
};
;

	return (
		<form
			onSubmit={handleLogin}
			className="w-full max-w-md px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md"
		>
			<div className="mb-4">
				<label
					className="block mb-2 text-sm font-bold text-gray-700"
					htmlFor="email"
				>
					Email
				</label>
				<input
					className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
					id="email"
					onChange={updateLoginForm}
					value={loginForm.email}
					type="email"
					name="email"
					placeholder="Email"
					required
					disabled={loadingLogin}
				/>
			</div>

			<div className="mb-6">
				<label
					className="block mb-2 text-sm font-bold text-gray-700"
					htmlFor="password"
				>
					Password
				</label>
				<input
					className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
					id="password"
					onChange={updateLoginForm}
					value={loginForm.password}
					type="password"
					name="password"
					placeholder="Password"
					required
					disabled={loadingLogin}
				/>
			</div>

			<div className="flex justify-end">
				<button
					className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
					type="submit"
					disabled={loadingLogin}
				>
					Login
				</button>
			</div>
		</form>
	);
};

export default LoginForm;
