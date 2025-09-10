import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import API from "../api";

const socket = io("http://localhost:5000"); // backend URL

export default function ChatBox({ listingId, otherUser }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const room = `${listingId}-${user._id}-${otherUser._id}`; // unique room

  const handleTyping = (e) => {
    setText(e.target.value);
    socket.emit("typing", { room, sender: user._id });
  };

  useEffect(() => {
    // Join room
    socket.emit("joinRoom", room);

    // Fetch old messages
    API.get(`/chat/${listingId}/${otherUser._id}`).then((res) =>
      setMessages(res.data)
    );

    // Listen for new messages
    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => socket.off("receiveMessage");
  }, [listingId, otherUser._id]);

  useEffect(() => {
    socket.on("typing", (data) => {
      if (data.sender !== user._id) {
        setIsTyping(true);
        setTimeout(() => setIsTyping(false), 2000); // hide after 2 sec
      }
    });

    return () => socket.off("typing");
  }, []);

  const sendMessage = async () => {
    if (!text.trim()) return;

    const messageData = {
      room,
      sender: user._id,
      receiver: otherUser._id,
      text,
      listing: listingId,
      timestamp: new Date(),
    };

    // Emit via socket
    socket.emit("sendMessage", messageData);

    setMessages((prev) => [...prev, messageData]);
    setText("");
  };

  return (
    <div className="fixed bottom-5 right-5 w-80 bg-white shadow-lg border rounded p-3 flex flex-col h-96">
      <div className="flex-1 overflow-y-auto space-y-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded ${
              msg.sender === user._id
                ? "bg-blue-100 self-end"
                : "bg-gray-200 self-start"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex mt-2">
        <input
          className="flex-1 border p-2 rounded-l"
          value={text}
          onChange={handleTyping}
          placeholder="Type a message..."
        />

        {isTyping && <p className="text-xs text-gray-400 mt-1">Typing...</p>}
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 rounded-r"
        >
          Send
        </button>
      </div>
    </div>
  );
}
