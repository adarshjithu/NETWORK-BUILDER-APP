import React from "react";
import { useNavigate } from "react-router-dom";

function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-red-500">404</h1>
                <h2 className="text-2xl font-semibold text-gray-100 mt-4">
                    Page Not Found
                </h2>
                <p className="text-gray-400 mt-2">
                    Sorry, the page you are looking for does not exist.
                </p>
                <button
                    onClick={() => navigate('/')}
                    className="mr-10 mt-6 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                    Home Page
                </button>
                
            </div>
        </div>
    );
}

export default NotFoundPage;
