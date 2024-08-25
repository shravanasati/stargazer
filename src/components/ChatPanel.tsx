import { useState } from 'react';
import { SendHorizonal } from 'lucide-react';
import { Input, MessageList } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';

export function ChatPanel() {
  const [messages, setMessages] = useState<{ position: string; type: string; text: string; date: Date; }[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    if (inputValue.trim() === '') return;

    const userMessage = {
      position: 'right',
      type: 'text',
      text: inputValue,
      date: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputValue('');
    setIsSending(true);

    try {
      const response = await fetch('/api/chat/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify({ message: inputValue }),
      });

      const data = await response.json();
      const botMessage = {
        position: 'left',
        type: 'text',
        text: data.message,
        date: new Date(),
      };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex-1 overflow-y-auto p-4">
        <MessageList
          className="message-list"
          lockable={true}
          toBottomHeight={'100%'}
          // @ts-ignore
          dataSource={messages}
        />
      </div>
      <div className="p-2 m-4">
        <Input
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
          onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter' && !isSending) {
              handleSend();
            }
          }}
          maxHeight={200}
          minHeight={35}
          placeholder="Type here..."
          // className="p-2 m-4 w-screen"
          rightButtons={
            <button onClick={handleSend} disabled={isSending}>
              <SendHorizonal size={18} color="#000" />
            </button>
          }
        />
      </div>
    </div>
  );
}