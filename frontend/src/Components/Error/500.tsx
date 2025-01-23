import React from "react";
import { useNavigate } from "react-router-dom";

function InternalServerError() {

    const navigate = useNavigate()
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-red-500">500</h1>
                <h2 className="text-2xl font-semibold text-gray-800 mt-4">
                    Internal Server Error
                </h2>
                <p className="text-gray-600 mt-2">
                    Oops! Something went wrong on our end. Please try again later.
                </p>
                <button
                    onClick={()=>navigate('/')}
                    className="mr-10 mt-6 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                    Home Page
                </button>
             
            </div>
        </div>
    );
}

export default InternalServerError;
