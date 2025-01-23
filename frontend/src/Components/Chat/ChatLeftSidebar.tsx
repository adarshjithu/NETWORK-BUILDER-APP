import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { getAllGroups, getAllMessages, searchGroups } from "../../api/chatServices";
import { selectGroup, setAllMessages, setChatGroups } from "../../features/chatSlice";
import { IGroup } from "../../Interfaces/Group";

function ChatLeftSidebar({ setNewGroupModal }: any) {
    const groups = useSelector((data: RootState) => data?.chat?.groups);
    const dispatch = useDispatch();
    const [debounceTimeout, setDebounceTimeout] = useState<any>();
    const [reload, setReload] = useState(false);
    const [search, setSearch] = useState("");

    const chooseGroup = async(group:any)=>{
        
        console.log(group)
        dispatch(selectGroup(group))
        const res =  await getAllMessages(group?._id)
        const messages = res?.data?.data
         dispatch(setAllMessages(messages))
    }
    useEffect(() => {
        const fetchData = async () => {
            const res = await getAllGroups();
          
            if (res?.data) {
                dispatch(setChatGroups(res?.data?.data));
            }
        };

        fetchData();

        return () => {
            clearTimeout(debounceTimeout);
        };
    }, [reload]);

    const handleInputChange = (e: any) => {
        if (e.target.value == "") {
            setReload(!reload);
        } else {
            setSearch(e.target.value);
            if (debounceTimeout) {
                clearTimeout(debounceTimeout);
            }
            const newTimeout = setTimeout(async () => {
                const res = await searchGroups(e.target.value);
                dispatch(setChatGroups([...groups, ...res?.data?.data]));
            }, 500);
            setDebounceTimeout(newTimeout);
        }
    };

    return (
        <div className="fixed">
            {/* Header Section */}
            <div className="flex flex-row w-full justify-between items-center border-b border-gray-700 p-3">
                <h2 className="text-2xl text-white font-semibold">Groups</h2>
                <button onClick={() => setNewGroupModal(true)} className="mt-4 ml-4 px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-700">
                    New Group
                </button>
            </div>

            {/* Search Input */}
            <div className="mt-4 p-3">
                <input
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Search groups..."
                    className="w-full p-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
            </div>

            {/* Group List */}
            <ul className="mt-4">
                {groups?.map((group: IGroup) => {
                    return (
                        <li key={group._id} onClick={()=>chooseGroup(group)} className="text-white cursor-pointer p-2 hover:bg-gray-700">
                            {group?.groupname}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default ChatLeftSidebar;
