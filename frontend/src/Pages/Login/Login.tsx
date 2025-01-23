import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../../app/store";
import { loginUser } from "../../api/authServices";
import { setUserCredentials } from "../../features/authSlice";

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const user = useSelector((data: RootState) => data?.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const res = await loginUser(formData);
        dispatch(setUserCredentials(res?.data?.user));
    };

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        if (user?.userData) {
            navigate("/");
        }
    }, [user]);

    return (
        <div className="bg-gradient-to-t from-gray-800 via-black to-gray-900 min-h-screen flex items-center justify-center">
            <div className="bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-sm">
                <h2 className="text-3xl font-bold text-white text-center mb-6">
                    Login to <span className="text-pink-500">Network Builder</span>
                </h2>
                <form onSubmit={handleSubmit}>
                    {/* Email Input */}
                    <div className="mb-6">
                        <label htmlFor="email" className="text-white text-lg font-medium">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full p-3 mt-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                            placeholder="Enter your email"
                            value={formData?.email}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Password Input */}
                    <div className="mb-6">
                        <label htmlFor="password" className="text-white text-lg font-medium">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-full p-3 mt-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                            placeholder="Enter your password"
                            value={formData?.password}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Forgot Password Link */}
                    <div className="flex justify-between items-center mb-6">
                        <Link to="/forget-password" className="text-pink-500 hover:text-pink-400 text-sm">
                            Forgot Password?
                        </Link>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-pink-500 text-white rounded-lg font-semibold hover:bg-pink-400 transition duration-300"
                    >
                        Login
                    </button>
                </form>

                {/* Create Account Link */}
                <div className="mt-6 text-center">
                    <p className="text-white">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-pink-500 hover:text-pink-400 font-semibold">
                            Create one here.
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
