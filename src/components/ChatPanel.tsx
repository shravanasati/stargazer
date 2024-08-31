import { ChangeEvent, useEffect, useRef, useState } from "react"
import "./ChatPanel.css"
import { LoaderCircle } from "lucide-react";

type Message = {
  role: "user" | "model";
  content: string;
}

type SendChatResp = {
  message: string;
}

export function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(scrollToBottom, [messages])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const newMessage: Message = { content: input, role: 'user' };
    setMessages([...messages, newMessage]);
    setInput('');

    try {
      setLoading(true)
      const response = await fetch(
        "/api/chat/send",
        {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({
            "message": input
          }),
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      const jsonResp: SendChatResp = await response.json();

      const botMessage: Message = {role: "model", content: jsonResp.message}
      setMessages(prevMessages => [...prevMessages, botMessage]);

    } catch (error) {
      console.error('Error sending message:', error);
      // Handle error (e.g., show an error message to the user)
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    const getChat = async () => {
      try {
        const resp = await fetch("/api/chat/list", {method: "GET", credentials: "include"})
        const jsonResp: Message[] = await resp.json()

        setMessages(jsonResp)
        
      } catch (err) {
        console.error(err)
      }
    }

    getChat()
  }, [])

  return (
    <div className="chatbot">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
            {message.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} disabled={loading}>{loading ? <LoaderCircle className="animate-spin" /> :  "Send"}</button>
      </div>
    </div>
  );
}