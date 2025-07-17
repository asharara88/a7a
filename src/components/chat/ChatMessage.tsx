import React from 'react';
import { User, Sparkles } from 'lucide-react';
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
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6`}>
      <div className={`flex max-w-[85%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`flex-shrink-0 flex items-start mt-1 ${isUser ? 'ml-4' : 'mr-4'}`}>
          <div className={cn(
            "w-9 h-9 rounded-xl flex items-center justify-center shadow-md",
            isUser 
              ? "bg-primary text-white" 
              : "bg-white dark:bg-gray-700 text-primary dark:text-white"
          )}>
            {isUser ? <User size={18} /> : <Sparkles size={18} />}
          </div>
        </div>
        
        <div className={cn(
          "rounded-xl p-5 shadow-md text-left",
          isUser 
            ? "bg-primary text-white" 
            : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        )}>
          <div className="text-sm whitespace-pre-wrap leading-relaxed tracking-wide">{message.content}</div>
          <div className={cn(
            "text-xs mt-3",
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