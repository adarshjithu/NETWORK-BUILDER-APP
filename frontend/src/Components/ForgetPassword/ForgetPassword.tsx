import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { forgetPassword } from "../../api/authServices";
import LoadingButton from "../Loading/LoadingButton";

function ForgotPassword() {
    const [email,setEmail] = useState('')
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit =async (e:any)=>{
        e.preventDefault()
        setLoading(true)
        const res = await forgetPassword(email);
        navigate('/login')
        setLoading(false)
    }
    return (
        <div className="bg-gradient-to-t from-gray-800 via-black to-gray-900 min-h-screen flex items-center justify-center">
            <div className="bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-sm">
                <h2 className="text-3xl font-bold text-white text-center mb-6">
                    Reset Your Password
                </h2>
                <form onSubmit={handleSubmit}>
                    {/* Email Input */}
                    <div className="mb-6">
                        <label htmlFor="email" className="text-white text-lg font-medium">
                            Email Address
                        </label>
                        <input
                            onChange={(e)=>setEmail(e.target.value)}
                            type="email"
                            id="email"
                            required
                            name="email"
                            className="w-full p-3 mt-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                            placeholder="Enter your email"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-pink-500 text-white rounded-lg font-semibold hover:bg-pink-400 transition duration-300"
                    >
                       {loading?
                       <div className="w-full flex justify-center items-center">

                           <LoadingButton/>
                       </div>
                       : 'Send Reset Link'}
                    </button>
                </form>

                {/* Back to Login Link */}
                <div className="mt-6 text-center">
                    <p className="text-white">
                        Remember your password?{" "}
                        <Link to="/login" className="text-pink-500 hover:text-pink-400 font-semibold">
                            Login here.
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
