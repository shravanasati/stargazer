"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { LoaderCircle, Send } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

type Message = {
  role: "user" | "model";
  content: string;
};

type SendChatResp = {
  message: string;
};

export function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const newMessage: Message = { content: input, role: "user" };
    setMessages([...messages, newMessage]);
    setInput("");

    try {
      setLoading(true);
      const response = await fetch("/api/chat/send", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          message: input,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const jsonResp: SendChatResp = await response.json();

      const botMessage: Message = { role: "model", content: jsonResp.message };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      // Handle error (e.g., show an error message to the user)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getChat = async () => {
      try {
        const resp = await fetch("/api/chat/list", {
          method: "GET",
          credentials: "include",
        });
        const jsonResp: Message[] = await resp.json();

        setMessages(jsonResp);
      } catch (err) {
        console.error(err);
      }
    };

    getChat();
  }, []);

  return (
    <div className="flex flex-col h-[calc(100vh-16rem)] bg-zinc-900 rounded-lg overflow-hidden">
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                message.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-zinc-800 text-zinc-100"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 bg-zinc-800">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="flex space-x-2"
        >
          <Input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Type a message..."
            className="flex-grow bg-zinc-700 text-zinc-100 border-zinc-600 focus:ring-blue-500 focus:border-blue-500"
          />
          <Button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {loading ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
