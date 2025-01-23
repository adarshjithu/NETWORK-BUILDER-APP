import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { resetPasswordSchema } from "../../Utils/resetPasswordValidation";
import { resetPassword, verifyToken } from "../../api/authServices";
import toast from "react-hot-toast";
// Import your API service for password reset

const ResetPassword = () => {
    const [formData, setFormData] = useState({ password: "", confirmpassword: "" });
    const [error, setError] = useState({ password: "", confirmpassword: "" });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const location = useLocation()
   const navigate =useNavigate()

    const handleSubmit = async(e: any) => {
        e.preventDefault();
        try {
          await resetPasswordSchema.validate(formData, { abortEarly: false });
            const res = await resetPassword({...formData,token:location.pathname.split("/")[2]})
            const message = res?.data?.response?.message
            if(res?.data?.response?.success){
                toast.success(message)
                navigate('/login')
            }else{
                toast.error(message);
                navigate("/login")
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

    useEffect(()=>{
      
       const fetchData  =async()=>{
            const res=  await verifyToken(location.pathname.split("/")[2])
           if(res?.data?.response?.success==false){
             toast.error(res?.data?.response.message)
             navigate('/login')
            }
       }
       fetchData()
    },[])

    return (
        <div className="bg-gradient-to-t from-gray-800 via-black to-gray-900 min-h-screen flex items-center justify-center">
            <div className="bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-sm">
                <h2 className="text-3xl font-bold text-white text-center mb-6">Reset Password</h2>
                <form onSubmit={handleSubmit}>
                    {/* New Password Input */}
                    <div className="mb-6">
                        <label htmlFor="newPassword" className="text-white text-lg font-medium">
                            New Password
                        </label>
                        <br />
                        {error?.password&&<span className="text-[red]">{error?.password}</span>}
                        <input
                            type="password"
                            id="newPassword"
                            name="password"
                            className="w-full p-3 mt-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                            placeholder="Enter your new password"
                            value={formData?.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Retype Password Input */}
                    <div className="mb-6">
                        <label htmlFor="retypePassword" className="text-white text-lg font-medium">
                            Retype Password
                        </label>
                        <br />
                        {error?.confirmpassword&&<span className="text-[red]">{error?.confirmpassword}</span>}
                        <input
                            type="password"
                            name="confirmpassword"
                            id="confirmpassword"
                            className="w-full p-3 mt-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                            placeholder="Retype your new password"
                            value={formData?.confirmpassword}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-pink-500 text-white rounded-lg font-semibold hover:bg-pink-400 transition duration-300"
                    >
                        Reset Password
                    </button>
                    <button
                         
                         onClick={()=>navigate('/login')}
                        type="submit"
                        className="w-full mt-2 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-pink-400 transition duration-300"
                    >
                        Back to login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
