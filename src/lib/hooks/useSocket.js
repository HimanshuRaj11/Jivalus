import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const useSocket = () => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // Connect to your external Socket.io server
        const socketIo = io("http://localhost:4000/");

        setSocket(socketIo);

        // Cleanup on dismount
        return () => {
            socketIo.disconnect();
        };
    }, []);

    return socket;
};

export default useSocket;
