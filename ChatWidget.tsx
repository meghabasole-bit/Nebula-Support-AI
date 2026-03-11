import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Loader2, Sparkles } from 'lucide-react';
import { BotConfig, Message, LoadingState } from '../types';
import { initializeChat, sendMessageToGemini, resetSession } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

interface ChatWidgetProps {
  config: BotConfig;
  demoMode?: boolean;
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({ config, demoMode = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize chat on mount or config change
  useEffect(() => {
    if (isOpen) {
        initializeChat(config);
        if (messages.length === 0) {
            setMessages([
                {
                    id: 'welcome',
                    role: 'model',
                    text: config.welcomeMessage,
                    timestamp: new Date()
                }
            ]);
        }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, config]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || status === LoadingState.THINKING) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setStatus(LoadingState.THINKING);

    try {
      const replyText = await sendMessageToGemini(userMsg.text);
      
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: replyText,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMsg]);
      setStatus(LoadingState.IDLE);
    } catch (error) {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "I'm having trouble connecting right now. Please try again later.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
      setStatus(LoadingState.ERROR);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Dynamic styles based on config
  const primaryColorStyle = { backgroundColor: config.primaryColor };
  const borderStyle = { borderColor: config.primaryColor };

  return (
    <div className={`fixed z-50 flex flex-col items-end ${demoMode ? 'bottom-6 right-6' : 'bottom-6 right-6'}`}>
      
      {/* Chat Window */}
      {isOpen && (
        <div 
            className="mb-4 w-[350px] h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 animate-in fade-in slide-in-from-bottom-10 duration-200"
        >
          {/* Header */}
          <div 
            className="p-4 flex items-center justify-between text-white"
            style={primaryColorStyle}
          >
            <div className="flex items-center space-x-3">
                <div className="bg-white/20 p-2 rounded-full">
                    <Sparkles size={18} className="text-white" />
                </div>
                <div>
                    <h3 className="font-semibold text-sm">{config.name}</h3>
                    <p className="text-xs text-white/80">Powered by AI</p>
                </div>
            </div>
            <button 
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 p-1 rounded transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 scrollbar-hide">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-lg text-sm shadow-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'text-white rounded-br-none'
                      : 'bg-white text-slate-800 border border-slate-100 rounded-bl-none'
                  }`}
                  style={msg.role === 'user' ? primaryColorStyle : {}}
                >
                  {msg.role === 'model' ? (
                    <div className="prose prose-sm max-w-none">
                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                    </div>
                  ) : (
                    msg.text
                  )}
                </div>
              </div>
            ))}
            
            {status === LoadingState.THINKING && (
               <div className="flex justify-start">
                   <div className="bg-white border border-slate-100 p-3 rounded-lg rounded-bl-none shadow-sm">
                       <div className="flex space-x-1">
                           <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                           <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                           <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                       </div>
                   </div>
               </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-slate-100">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask us anything..."
                className="flex-1 p-2.5 text-sm text-slate-900 placeholder:text-slate-400 bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-1 focus:border-transparent transition-all"
                style={{  '--tw-ring-color': config.primaryColor } as React.CSSProperties}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || status === LoadingState.THINKING}
                className="p-2.5 rounded-full text-white transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                style={primaryColorStyle}
              >
                 {status === LoadingState.THINKING ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
              </button>
            </div>
            <div className="text-center mt-2">
                <span className="text-[10px] text-slate-400">AI can make mistakes. Check important info.</span>
            </div>
          </div>
        </div>
      )}

      {/* Launcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-4 rounded-full shadow-lg text-white transition-all hover:scale-105 active:scale-95 flex items-center justify-center ${isOpen ? 'rotate-90 opacity-0 pointer-events-none absolute' : 'opacity-100 rotate-0'}`}
        style={{ ...primaryColorStyle, width: '60px', height: '60px' }}
      >
        <MessageSquare size={28} fill="currentColor" />
      </button>
       <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-4 rounded-full shadow-lg text-white transition-all hover:scale-105 active:scale-95 flex items-center justify-center absolute ${!isOpen ? '-rotate-90 opacity-0 pointer-events-none' : 'opacity-100 rotate-0'}`}
        style={{ ...primaryColorStyle, width: '60px', height: '60px' }}
      >
        <X size={28} />
      </button>
    </div>
  );
};