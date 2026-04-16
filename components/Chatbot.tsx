
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { GoogleGenAI, GenerateContentResponse } from '@google/genai';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: 'Hello! I am your MORAVIA assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user' as const, text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `You are the official MORAVIA online Education assistant. Help visitors and users with questions about:
- Registration: How to create an account, roles for students/parents/teachers.
- Payment: Bank details, account types, and how to confirm payment.
- Learning Portal: Accessing lessons, materials, and virtual classes.
- Printing Results: How to generate and print result slips.
- E-library: Accessing and downloading digital library resources.
- CBT, Homework, Tests, and Exams: Understanding the assessment tools, practice exams, and scheduling.
- Support: General help with the platform.

Keep answers concise, professional, and encouraging. If you don't know the answer, politely ask them to contact the support team via the 'Contact Us' page. User query: ${input}`,
      });

      const botMessage = { role: 'bot' as const, text: response.text || 'Sorry, I could not process that.' };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Chatbot error:', error);
      setMessages((prev) => [...prev, { role: 'bot', text: 'Sorry, I am having trouble connecting right now.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-slate-900 text-white p-4 rounded-full shadow-2xl hover:bg-amber-600 transition-all hover:scale-110"
        >
          <MessageCircle size={28} />
        </button>
      ) : (
        <div className="bg-white w-80 md:w-96 h-[500px] rounded-[2rem] shadow-2xl border-4 border-slate-900 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10">
          <div className="bg-slate-900 p-6 flex justify-between items-center text-white">
            <h3 className="font-black uppercase tracking-widest flex items-center gap-2">
              <Bot size={20} /> MORAVIA Bot
            </h3>
            <button onClick={() => setIsOpen(false)} className="hover:text-amber-500">
              <X size={20} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`p-3 rounded-2xl max-w-[80%] ${m.role === 'user' ? 'bg-amber-100 text-slate-900' : 'bg-slate-100 text-slate-700'}`}>
                  <p className="text-sm font-medium">{m.text}</p>
                </div>
              </div>
            ))}
            {isLoading && <div className="text-xs text-slate-400 font-bold uppercase tracking-widest">Typing...</div>}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 border-t border-slate-100 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything..."
              className="flex-1 p-3 rounded-xl bg-slate-50 text-sm font-medium outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button onClick={handleSend} className="bg-slate-900 text-white p-3 rounded-xl hover:bg-amber-600">
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
