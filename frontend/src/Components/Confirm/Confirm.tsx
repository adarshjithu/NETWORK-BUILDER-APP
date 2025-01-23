import React from "react";

function ConfirmModal({ isOpen,handleDeleteConfirm, title = "Are you sure?", message = "Do you want to proceed?" }:any) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white rounded-lg shadow-lg w-96 p-6">
                {/* Modal Header */}
                <h2 className="text-xl font-semibold text-gray-900 mb-4">{title}</h2>
                
                {/* Modal Message */}
                <p className="text-gray-700 mb-6">{message}</p>
                
                {/* Action Buttons */}
                <div className="flex justify-end space-x-4">
                    <button onClick={()=>handleDeleteConfirm(false)} className="px-4 py-2 text-gray-800 bg-gray-300 rounded-md hover:bg-gray-400">
                        Cancel
                    </button>
                    <button onClick={()=>handleDeleteConfirm(true)} className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700">
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmModal;
