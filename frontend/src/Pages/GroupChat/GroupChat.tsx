import React, { useContext, useEffect, useState, useRef } from "react";
import ChatLeftSidebar from "../../Components/Chat/ChatLeftSidebar";
import CreateGroupModal from "../../Components/Chat/CreateGroupModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { getAllGroups, getAllMessages, joinGroupWithId, searchGroups } from "../../api/chatServices";
import { selectGroup, setAllMessages, setChatGroups } from "../../features/chatSlice";
import { socketContext } from "../../Components/Context/SocketContext";
import { IGroup } from "../../Interfaces/Group";
import { data } from "react-router-dom";
import toast from "react-hot-toast";

const GroupChat = () => {
    const socket = useContext(socketContext);
    const userData = useSelector((data: RootState) => data?.auth?.userData);
    const allMessages = useSelector((data: RootState) => data?.chat?.allMessages);
    const [newGroupModal, setNewGroupModal] = useState(false);
    const selectedGroup: IGroup = useSelector((data: RootState) => data?.chat?.selectedGroup);
    const dispatch = useDispatch();
    const groups = useSelector((data: RootState) => data?.chat?.groups);
    const [messages, setMessages] = useState<any>([]);
    const [message, setMessage] = useState("");

    // Create a ref to the messages container
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const joinGroup = async () => {
        const res = await joinGroupWithId(selectedGroup?._id);
        console.log(res?.data?.data)
        setMessages(res?.data?.data)
        if (res?.data?.success) dispatch(selectGroup({ ...selectedGroup, newMember: false }));
       const data = await getAllGroups();
                
                  if (res?.data) {
                      dispatch(setChatGroups(data?.data?.data));
                  }
    };

    const sendMessage = () => {
        
        if(message=='') {toast.error('Empty Message'); return }
        
                setMessage('')
        const messageObj = {
            message: message,
            senderId: userData?._id,
            groupId: selectedGroup?._id,
            type: "text",
            attachments: [],
            read: [],
            username: userData?.name,
            createdAt: new Date()
        };
        if (socket) {
            socket.emit("new_message", messageObj);
        }
    };

    useEffect(() => {
        if (socket) {
            socket.on("new_message", (mes: any) => {
                setMessages((prevMessages:any) => [...prevMessages, mes]);
            });
        }
    }, [socket]);

    useEffect(() => {
        if (JSON.stringify(selectedGroup) !== JSON.stringify({})) {
            if (socket) {
                socket.emit("join-group", selectedGroup?._id);
            }
        }
    }, [selectedGroup]);

    useEffect(() => {
        setMessages(allMessages);
    }, [allMessages]);

    // Scroll to the bottom when new messages are added
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    return (
        <div className="bg-black min-h-screen flex">
            {/* Left Sidebar: Group List */}
            <div className="w-1/4 bg-gray-900 p-4">
                <ChatLeftSidebar setNewGroupModal={setNewGroupModal} />
            </div>

            {/* Right Section: Main Content */}
            <div className="flex-1 bg-gray-800 flex flex-col border-l border-l-1 border-gray-500">
                {/* New Group Modal */}
                {newGroupModal && <CreateGroupModal setNewGroupModal={setNewGroupModal} />}

                {JSON.stringify(selectedGroup) === JSON.stringify({}) ? (
                    ""
                ) : (
                    <>
                        {/* Group Header */}
                        <div className="fixed bg-gray-900 p-4 shadow-md flex items-center justify-between w-full">
                            <div className="flex items-center space-x-3">
                                <div className="bg-gray-800 h-10 w-10 rounded-full flex items-center justify-center">
                                    <i className="fas fa-users text-gray-400"></i>
                                </div>
                                <div>
                                    <h2 className="text-lg text-white font-semibold">{selectedGroup?.groupname || "Group Name"}</h2>
                                    <span className="text-sm text-gray-400">{selectedGroup?.groupdescription || "Group description"}</span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <button className="bg-gray-800 text-gray-400 hover:text-white p-2 rounded-full" title="Mute">
                                    <i className="fas fa-volume-mute"></i>
                                </button>
                                <button className="bg-gray-800 text-gray-400 hover:text-white p-2 rounded-full" title="Options">
                                    <i className="fas fa-ellipsis-v"></i>
                                </button>
                            </div>
                        </div>

                        {/* Chat Messages Section */}
                        {!selectedGroup?.newMember ? (
                            <div className="flex-1 overflow-y-auto p-4 space-y-4 mb-10 mt-16">
                            {messages.map((message: any, index: number) => (
                                <div
                                    key={index}
                                    className={`flex items-start space-x-2 ${String(message.senderId?._id) === String(userData?._id) ? "" : "flex-row-reverse"}`}
                                >
                                    <div
                                        className={`rounded-full w-10 h-10 flex items-center justify-center ${
                                            String(message.senderId?._id) === String(userData?._id) ? "bg-pink-500" : "bg-blue-500"
                                        } text-white`}
                                    >
                                        {"A"}
                                    </div>
                                    <div className="flex flex-col w-3/4">
                                        {/* User Name */}
                                        <span
                                            className={`block text-sm mb-1 ${
                                                String(message.senderId?._id) === String(userData?._id) ? "text-gray-400" : "text-gray-500"
                                            }`}
                                        >
                                            {String(message.senderId?._id) === String(userData?._id) ? "You" : `${message?.senderId?.name}`}
                                        </span>
                                        {/* Message Bubble */}
                                        <div
                                            className={`p-3 rounded-lg ${
                                                String(message.senderId?._id) === String(userData?._id) ? "bg-gray-700" : "bg-gray-600"
                                            } text-white`}
                                        >
                                            <p>{message.message}</p>
                                            <span
                                                className={`block text-sm ${
                                                    String(message.senderId?._id) === String(userData?._id) ? "text-gray-500" : "text-gray-400"
                                                } text-right`}
                                            >
                                                {new Date(message.createdAt).toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {/* Scroll target */}
                            <div className="" ref={messagesEndRef} />
                        </div>
                        
                        ) : (
                            <div className="flex-1 overflow-y-auto p-4 space-y-4 flex items-center justify-center"></div>
                        )}

                        {/* Message Input & Send Button */}
                        <div className="fixed bottom-0 w-[75%] bg-gray-900 p-4 flex items-center space-x-4">
                            {!selectedGroup?.newMember ? (
                                <input
                                value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    type="text"
                                    placeholder="Type a message..."
                                    className="bg-gray-800 text-white p-3 rounded-lg w-full focus:outline-none"
                                />
                            ) : (
                                <button onClick={joinGroup} className="bg-blue-500 text-white rounded p-4 w-full text-center">
                                    Join Group
                                </button>
                            )}

                            {!selectedGroup?.newMember && (
                                <button onClick={sendMessage} className="text-pink-500">
                                    <i className="fas fa-paper-plane"></i>
                                </button>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default GroupChat;
