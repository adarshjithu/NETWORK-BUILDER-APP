import React, { useState } from "react";
import toast from "react-hot-toast";
import { createNewGroup } from "../../api/chatServices";
import { useDispatch } from "react-redux";
import { setChatGroup } from "../../features/chatSlice";

function CreateGroupModal({ setNewGroupModal }: any) {

  const [formData,setFormData] = useState({groupname:'',groupdescription:''})
 const dispatch =useDispatch()
  const createGroup = async()=>{
       if(formData?.groupdescription==''){
        toast.error("Group description is empty")
       }else if(formData?.groupname==''){
        toast.error('Group name is empty')
       }else{
        const res = await createNewGroup(formData);
  
        dispatch(setChatGroup(res?.data?.data))
        setNewGroupModal(false)
       }
  }


  const handleChange = (e:any)=>{
    setFormData({...formData,[e.target.name]:e.target.value})

  }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg w-96">
                <h3 className="text-xl text-white">Create New Group</h3>
                <div className="mt-4">
                    <input name="groupname" onChange={handleChange} type="text" placeholder="Group Name" className="w-full p-2 rounded-lg bg-gray-700 text-white mt-2" />
                    <textarea name="groupdescription" onChange={handleChange} placeholder="Group Description" className="w-full p-2 rounded-lg bg-gray-700 text-white mt-4" rows={4} />
                </div>
                <div className="mt-4 flex justify-end space-x-4">
                    <button onClick={() => setNewGroupModal(false)} className="px-6 py-2 bg-gray-600 text-white rounded-lg">
                        Cancel
                    </button>
                    <button onClick={createGroup} className="px-6 py-2 bg-pink-500 text-white rounded-lg">Create Group</button>
                </div>
            </div>
        </div>
    );
}

export default CreateGroupModal;
