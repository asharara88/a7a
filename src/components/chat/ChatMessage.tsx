import React from 'react';
import { User, Bot } from 'lucide-react';
import { format } from 'date-fns';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
  isLoading?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isLoading = false }) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`flex-shrink-0 flex items-start mt-1 ${isUser ? 'ml-2' : 'mr-2'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isUser ? 'bg-primary text-white' : 'bg-gray-200'}`}>
            {isUser ? <User size={16} /> : <Bot size={16} />}
          </div>
        </div>
        
        <div className={`rounded-lg p-3 ${isUser ? 'bg-primary text-white' : 'bg-gray-100'}`}>
          <div className="text-sm whitespace-pre-wrap">{message.content}</div>
          <div className={`text-xs mt-1 ${isUser ? 'text-primary-light' : 'text-gray-500'}`}>
            {format(new Date(message.timestamp), 'h:mm a')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;