"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { LoaderCircle, Send } from "lucide-react";

type Message = {
  role: "user" | "model";
  content: string;
};

type SendChatResp = {
  message: string;
}

export function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(false)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const newMessage: Message = { content: input, role: "user" }
    setMessages([...messages, newMessage])
    setInput("")

    try {
      setLoading(true)
      const response = await fetch("/api/chat/send", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          message: input,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
      const jsonResp: SendChatResp = await response.json()

      const botMessage: Message = { role: "model", content: jsonResp.message }
      setMessages((prevMessages) => [...prevMessages, botMessage])
    } catch (error) {
      console.error('Error sending message:', error);
      // Handle error (e.g., show an error message to the user)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const getChat = async () => {
      try {
        const resp = await fetch("/api/chat/list", {
          method: "GET",
          credentials: "include",
        });
        const jsonResp: Message[] = await resp.json();

        setMessages(jsonResp)
      } catch (err) {
        console.error(err);
      }
    };

    getChat();
  }, []);

  return (
    <div className="flex flex-col h-[92vh] w-screen bg-gray-900 text-gray-100">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`max-w-[80%] p-3 rounded-lg ${
              message.role === "user"
                ? "bg-blue-600 text-white ml-auto"
                : "bg-gray-800 text-gray-100"
            }`}
          >
            {message.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 bg-gray-800 border-t border-gray-700">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
            className="flex-1 p-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <LoaderCircle className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
