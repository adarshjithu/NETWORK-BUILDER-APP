import { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";
import { RootState } from "../../app/store";
import { baseURL } from "../../api/baseUrl";

export const socketContext = createContext<Socket | null>(null); // Type the context

function SocketProvider({ children }: any) {
    const [socket, setSocket] = useState<Socket | null>(null); // Type state with Socket or null
    const userData = useSelector((data: RootState) => data?.auth?.userData);
    console.log(userData?._id);
    useEffect(() => {
        const newSocket = io(baseURL, { auth: { token: userData?._id } }); // Ensure backend is on port 5000
        setSocket(newSocket);

        // Cleanup function to disconnect the socket when component unmounts
        return () => {
            newSocket.disconnect(); // Use newSocket directly for cleanup
        };
    }, []);

    return <socketContext.Provider value={socket}>{children}</socketContext.Provider>;
}

export default SocketProvider;
