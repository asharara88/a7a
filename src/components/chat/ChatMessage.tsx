import React from 'react';
import { User, Bot } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '../../utils/cn';

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
      <div className={`flex max-w-[85%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`flex-shrink-0 flex items-start mt-1 ${isUser ? 'ml-2' : 'mr-2'}`}>
          <div className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center shadow-sm",
            isUser 
              ? "bg-gradient-to-r from-primary to-secondary text-white" 
              : "bg-white dark:bg-gray-700 text-primary dark:text-white"
          )}>
            {isUser ? <User size={16} /> : <Bot size={16} />}
          </div>
        </div>
        
        <div className={cn(
          "rounded-lg p-3 shadow-md",
          isUser 
            ? "bg-gradient-to-r from-primary via-tertiary to-secondary text-white" 
            : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        )}>
          <div className="text-sm whitespace-pre-wrap leading-relaxed font-medium">{message.content}</div>
          <div className={cn(
            "text-xs mt-1",
            isUser 
              ? "text-white/90" 
              : "text-gray-600 dark:text-white/90"
          )}>
            {format(new Date(message.timestamp), 'h:mm a')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;