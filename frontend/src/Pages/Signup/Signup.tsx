import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../../api/authServices";
import { userSchema } from "../../Utils/validations";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { setUserCredentials } from "../../features/authSlice";
import toast from "react-hot-toast";

const SignUp = () => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmpassword: "", chapter: "" });
    const [error, setError] = useState({ name: "", email: "", password: "", confirmpassword: "" });
    const dispatch = useDispatch();
    const user = useSelector((data: RootState) => data?.auth);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await userSchema.validate(formData, { abortEarly: false });
            if (formData?.chapter == "") {
                toast.error("Please select a chapter ");
                return;
            }
            const res = await createUser(formData);
            if (res?.data?.user) {
                dispatch(setUserCredentials(res?.data?.user));
            }
        } catch (err: any) {
            const validationErrors: any = {};
            if (err.inner) {
                err.inner.forEach((error: any) => {
                    validationErrors[error.path] = error.message;
                });
            }
            // User validation failed errors
            setError(validationErrors);
        }
    };

    useEffect(() => {
        if (user?.userData) {
            navigate("/");
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="bg-gradient-to-t from-gray-800 via-black to-gray-900 min-h-screen flex items-center justify-center">
            <div className="bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-sm">
                <h2 className="text-3xl font-bold text-white text-center mb-6">
                    Create Account for <span className="text-pink-500">Network Builder</span>
                </h2>
                <form onSubmit={handleSubmit}>
                    {/* Name Input */}
                    <div className="mb-6">
                        <label htmlFor="name" className="text-white text-lg font-medium">
                            Full Name
                        </label>{" "}
                        <br />
                        {error?.name && <span className="text-[red]">{error?.name}</span>}
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="w-full p-3 mt-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                            placeholder="Enter your full name"
                            value={formData?.name}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Email Input */}
                    <div className="mb-6">
                        <label htmlFor="email" className="text-white text-lg font-medium">
                            Email Address
                        </label>
                        <br />
                        {error?.email && <span className="text-[red]">{error?.email}</span>}
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
                        <br />
                        {error?.password && <span className="text-[red]">{error?.password}</span>}
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

                    <div className="mb-6">
                        <label htmlFor="confirmpassword" className="text-white text-lg font-medium">
                            Confirm Password
                        </label>
                        <br />
                        {error?.confirmpassword && <span className="text-[red]">{error?.confirmpassword}</span>}
                        <input
                            type="password"
                            id="confirmpassword"
                            name="confirmpassword"
                            className="w-full p-3 mt-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                            placeholder="Retype password"
                            value={formData?.confirmpassword}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Chapter Selection */}
                    <div className="mb-6">
                        <label htmlFor="chapter" className="text-white text-lg font-medium">
                            Select Chapter
                        </label>
                        <select
                            id="chapter"
                            name="chapter"
                            className="w-full p-3 mt-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                            value={formData?.chapter}
                            onChange={handleChange}
                        >
                            <option value="" disabled>
                                Choose a chapter
                            </option>
                            <option value="Technology Innovations">Technology Innovations</option>
                            <option value="Business Development">Business Development</option>
                            <option value="Digital Marketing">Digital Marketing</option>
                            <option value="Healthcare & Wellness">Healthcare & Wellness</option>
                            <option value="Finance & Investment">Finance & Investment</option>
                            <option value="Environmental Sustainability">Environmental Sustainability</option>
                            <option value="Education & E-learning">Education & E-learning</option>
                            <option value="Creative Arts & Media">Creative Arts & Media</option>
                            <option value="Legal & Regulatory Affairs">Legal & Regulatory Affairs</option>
                            <option value="HR & Talent Management">HR & Talent Management</option>
                        </select>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-pink-500 text-white rounded-lg font-semibold hover:bg-pink-400 transition duration-300"
                    >
                        Create Account
                    </button>
                </form>

                {/* Login Link */}
                <div className="mt-6 text-center">
                    <p className="text-white">
                        Already have an account?{" "}
                        <Link to="/login" className="text-pink-500 hover:text-pink-400 font-semibold">
                            Login here.
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
