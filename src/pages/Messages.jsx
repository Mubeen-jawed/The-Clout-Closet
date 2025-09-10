import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import API from "../api";

const socket = io("http://localhost:5000"); // adjust for prod

export default function Messages() {
  const location = useLocation();
  const [conversations, setConversations] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch conversations initially
  useEffect(() => {
    API.get("/chat/conversations").then((res) => {
      setConversations(res.data);

      // Auto-select chat if state exists
      if (location.state?.listingId && location.state?.otherUser) {
        const preselect = res.data.find(
          (c) =>
            c.listing._id === location.state.listingId &&
            c.otherUser._id === location.state.otherUser._id
        );

        if (preselect) {
          setActiveChat(preselect);
        } else {
          // If chat doesn’t exist yet, create temporary object
          setActiveChat({
            listing: { _id: location.state.listingId },
            otherUser: location.state.otherUser,
          });
        }
      }
    });
  }, [location.state]);

  // When active chat changes, join socket room and load messages
  useEffect(() => {
    if (!activeChat) return;

    const room = `${activeChat.listing._id}-${user._id}-${activeChat.otherUser._id}`;
    socket.emit("joinRoom", room);

    API.get(`/chat/${activeChat.listing._id}/${activeChat.otherUser._id}`).then(
      (res) => setMessages(res.data)
    );

    // Listen for new messages
    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    // Listen for typing indicator
    socket.on("typing", (data) => {
      if (data.sender !== user._id) {
        setIsTyping(true);
        setTimeout(() => setIsTyping(false), 2000);
      }
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("typing");
    };
  }, [activeChat]);

  const handleTyping = (e) => {
    setText(e.target.value);
    if (activeChat) {
      const room = `${activeChat.listing._id}-${user._id}-${activeChat.otherUser._id}`;
      socket.emit("typing", { room, sender: user._id });
    }
  };

  const sendMessage = () => {
    if (!text.trim() || !activeChat) return;

    const room = `${activeChat.listing._id}-${user._id}-${activeChat.otherUser._id}`;
    const messageData = {
      room,
      sender: user._id,
      receiver: activeChat.otherUser._id,
      text,
      listing: activeChat.listing._id,
      timestamp: new Date(),
    };

    socket.emit("sendMessage", messageData);
    setMessages((prev) => [...prev, messageData]);
    setText("");
  };

  return (
    <div className="flex h-screen border rounded  shadow-lg mx-6 bg-white">
      {/* Sidebar */}
      <div className="w-1/3 border-r overflow-y-auto pt-20">
        {conversations.map((conv, idx) => (
          <div
            key={idx}
            onClick={() => setActiveChat(conv)}
            className={`p-3 cursor-pointer hover:bg-gray-100 ${
              activeChat?.listing._id === conv.listing._id &&
              activeChat?.otherUser._id === conv.otherUser._id
                ? "bg-gray-200"
                : ""
            }`}
          >
            <p className="font-semibold">{conv.otherUser.name}</p>
            <p className="text-xs text-gray-500 truncate">
              {conv.listing.title} • {conv.lastMessage}
            </p>
          </div>
        ))}
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col pt-20">
        {activeChat ? (
          <>
            {/* Message List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`max-w-xs p-2 rounded-lg ${
                    msg.sender === user._id
                      ? "bg-blue-100 self-end text-right ml-auto"
                      : "bg-gray-200 self-start text-left mr-auto"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              {isTyping && (
                <p className="text-xs text-gray-400 italic">Typing...</p>
              )}
            </div>

            {/* Input */}
            <div className="flex border-t p-2">
              <input
                className="flex-1 border p-2 rounded-l"
                value={text}
                onChange={handleTyping}
                placeholder="Type a message..."
              />
              <button
                onClick={sendMessage}
                className="bg-blue-600 text-white px-4 rounded-r"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            Select a conversation
          </div>
        )}
      </div>
    </div>
  );
}
