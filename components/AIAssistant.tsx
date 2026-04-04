
import React, { useState, useRef, useEffect } from 'react';
import { gemini } from '../services/geminiService';
import { Message, SchoolLevel } from '../types';

const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: "Hello! I'm MORAVIA's AI Tutor. I can help you with your subjects, explain tricky topics, or even practice questions with you. What would you like to learn today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [level, setLevel] = useState<SchoolLevel>(SchoolLevel.GRADE);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await gemini.chat([...messages, userMsg], level);
      setMessages(prev => [...prev, { role: 'model', content: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', content: "Sorry, I had a momentary glitch. Could you try asking that again?" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col h-[70vh] glass-effect rounded-2xl shadow-xl overflow-hidden border">
      <div className="bg-slate-900 p-4 text-white flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-amber-500 rounded-full mr-3 animate-pulse"></div>
          <div>
            <h3 className="font-bold">MORAVIA AI Tutor</h3>
            <p className="text-xs text-slate-400">Online & Ready to Help</p>
          </div>
        </div>
        <select 
          value={level}
          onChange={(e) => setLevel(e.target.value as SchoolLevel)}
          className="bg-slate-800 text-xs border-none rounded px-2 py-1 text-white outline-none"
        >
          <option value={SchoolLevel.NURSERY}>Nursery Level</option>
          <option value={SchoolLevel.GRADE}>Grade Level</option>
          <option value={SchoolLevel.JUNIOR_SECONDARY}>Junior Secondary</option>
        </select>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-4 rounded-2xl ${
              msg.role === 'user' 
                ? 'bg-amber-600 text-white rounded-tr-none' 
                : 'bg-slate-100 text-slate-800 rounded-tl-none'
            }`}>
              <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-100 p-4 rounded-2xl rounded-tl-none flex space-x-1">
              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="p-4 bg-white border-t flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask me anything about your lessons..."
          className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
        <button
          onClick={handleSend}
          disabled={isLoading}
          className="bg-slate-900 text-white px-6 py-3 rounded-xl hover:bg-slate-800 transition-colors disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default AIAssistant;
