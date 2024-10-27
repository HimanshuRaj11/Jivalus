"use client"
import useSocket from "../../lib/hooks/useSocket";
import { useState } from "react";

export default function Chat() {
    const socket = useSocket();
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);

    const sendMessage = () => {
        console.log(socket);

        if (socket) {
            socket.emit("message", message);
            setMessage("");
        }
    };

    // Listen for new messages
    // socket?.on("message", (newMessage) => {
    //     setChat((prevChat) => [...prevChat, newMessage]);
    // });

    return (
        <div className="bg-dark-component w-full min-h-screen flex justify-center items-center">
            <ul>
                {chat.map((msg, idx) => (
                    <li key={idx}>{msg}</li>
                ))}
            </ul>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}
