import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Volume2, VolumeX, Loader2 } from 'lucide-react';
import { Button } from '../ui/Button';
import ChatMessage from './ChatMessage';
import { createClient } from '@supabase/supabase-js';
import { cn } from '../../utils/cn';

// Define message type
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const AIHealthCoach: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Initialize Supabase client
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input on load
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Add initial greeting message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          role: 'assistant',
          content: "Hi there! I'm your Biowell AI health coach. How can I help you optimize your wellness today?",
          timestamp: new Date()
        }
      ]);
    }
  }, [messages.length]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      // Call OpenAI proxy function
      const { data, error: apiError } = await supabase.functions.invoke('openai-proxy', {
        body: {
          messages: [
            ...messages.map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content: input }
          ]
        }
      });

      if (apiError) throw new Error(apiError.message);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.result || "I'm sorry, I couldn't process that request.",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Save to chat history
      await supabase.from('chat_history').insert([
        {
          user_id: (await supabase.auth.getUser()).data.user?.id,
          message: input,
          response: data.result,
          role: 'user',
          timestamp: new Date().toISOString()
        }
      ]);

      // If voice is enabled, convert response to speech
      if (voiceEnabled) {
        playTextToSpeech(data.result);
      }
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to get a response. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const playTextToSpeech = async (text: string) => {
    try {
      // Call ElevenLabs proxy function if implemented
      console.log('Would play text to speech:', text);
      // Implement actual TTS functionality when ElevenLabs is set up
    } catch (err) {
      console.error('Error with text-to-speech:', err);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all duration-200">
      {/* Header */}
      <div className="bg-gray-900 text-white p-4 flex items-center justify-between rounded-t-lg">
        <div className="flex items-center">
          <img
            src="https://leznzqfezoofngumpiqf.supabase.co/storage/v1/object/sign/biowelllogos/Biowell_Logo_Dark_Theme.svg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82ZjcyOGVhMS1jMTdjLTQ2MTYtOWFlYS1mZmI3MmEyM2U5Y2EiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJiaW93ZWxsbG9nb3MvQmlvd2VsbF9Mb2dvX0RhcmtfVGhlbWUuc3ZnIiwiaWF0IjoxNzUyNjYzNDE4LCJleHAiOjE3ODQxOTk0MTh9.itsGbwX4PiR9BYMO_jRyHY1KOGkDFiF-krdk2vW7cBE"
            alt="Biowell Logo" 
            className="h-6 w-auto mr-3" 
          />
          <h2 className="text-lg font-semibold">AI Health Coach</h2>
        </div>
        <button
          onClick={() => setVoiceEnabled(!voiceEnabled)}
          className={cn(
            "p-2 rounded-full transition-colors",
            voiceEnabled 
              ? "bg-primary-light hover:bg-primary-dark" 
              : "hover:bg-primary-dark"
          )}
          aria-label={voiceEnabled ? "Disable voice responses" : "Enable voice responses"}
        >
          {voiceEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-100 dark:bg-gray-900 transition-all duration-200">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
            isLoading={false}
          />
        ))}
        {isLoading && (
          <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 p-2 bg-gray-100 dark:bg-gray-800 rounded-lg w-fit">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Biowell AI is thinking...</span>
          </div>
        )}
        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg">
            {error}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="border-t border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800 transition-all duration-200">
        <div className="flex items-end space-x-2">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about your health, supplements, or wellness goals..."
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
              rows={2}
              disabled={isLoading}
            />
          </div>
          <Button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="h-10 w-10 p-0 flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-secondary"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </Button>
        </div>
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 transition-all duration-200">
          <p>Your AI coach provides general wellness guidance based on your inputs. Not medical advice.</p>
        </div>
      </form>
    </div>
  );
};

export default AIHealthCoach;