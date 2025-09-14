import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signup, resetSignupForm, setSignupForm } from "../stores/authReducer";

export const SignupForm = () => {
  const signupForm = useSelector((state) => state.auth.signupForm);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState("");

  const updateSignupForm = (e) => {
    const { name, value } = e.target;
    dispatch(
      setSignupForm({
        ...signupForm,
        [name]: value,
      })
    );
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (signupForm.password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // signup thunk call
      await dispatch(signup(signupForm)).unwrap();
      dispatch(resetSignupForm());

      // ✅ navigate after successful signup
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Signup failed:", err);
      alert("Signup failed: " + (err.message || "Unknown error"));
    }
  };

  return (
    <form
      onSubmit={handleSignup}
      className="w-full max-w-md px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md"
    >
      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
          Email
        </label>
        <input
          className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          onChange={updateSignupForm}
          value={signupForm.email}
          type="email"
          name="email"
          placeholder="Email"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
          Password
        </label>
        <input
          className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          onChange={updateSignupForm}
          value={signupForm.password}
          type="password"
          name="password"
          placeholder="Password"
          required
        />
      </div>

      <div className="mb-6">
        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="confirmPassword">
          Confirm Password
        </label>
        <input
          className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          required
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
        >
          Sign up
        </button>
      </div>
    </form>
  );
};
