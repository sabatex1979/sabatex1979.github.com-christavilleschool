
import React, { useState, useEffect, useRef } from 'react';
import { User, Meeting, ChatMessage, UserRole } from '../types';

interface VirtualMeetingRoomProps {
  user: User;
  meeting: Meeting;
  onExit: () => void;
}

const VirtualMeetingRoom: React.FC<VirtualMeetingRoomProps> = ({ user, meeting, onExit }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', sender: 'System', text: 'Welcome to the virtual classroom!', timestamp: '10:00 AM', role: UserRole.ADMIN },
    { id: '2', sender: meeting.teacherName, text: 'Good morning everyone! Ready for today\'s lesson?', timestamp: '10:01 AM', role: UserRole.TEACHER }
  ]);
  const [inputText, setInputText] = useState('');
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'people'>('chat');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: user.fullName,
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      role: user.role
    };
    
    setMessages([...messages, newMsg]);
    setInputText('');
  };

  const participants = [
    { name: meeting.teacherName, role: UserRole.TEACHER, status: 'online' },
    { name: user.fullName, role: user.role, status: 'online' },
    { name: 'Adebayo Tunde', role: UserRole.STUDENT, status: 'online' },
    { name: 'Sarah Phillips', role: UserRole.STUDENT, status: 'online' },
    { name: 'Michael Chen', role: UserRole.STUDENT, status: 'online' },
  ];

  return (
    <div className="fixed inset-0 z-[100] bg-[#1a1a1a] flex flex-col md:flex-row overflow-hidden animate-in fade-in duration-300">
      {/* Main Video Stage */}
      <div className="flex-1 flex flex-col relative h-full">
        {/* Header Bar */}
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10 bg-gradient-to-b from-black/60 to-transparent">
          <div className="flex items-center gap-3">
            <div className="bg-red-600 px-3 py-1 rounded text-[10px] font-bold text-white animate-pulse">REC</div>
            <h2 className="text-white font-bold text-sm md:text-lg">{meeting.title}</h2>
          </div>
          <div className="hidden md:flex items-center gap-4 text-white/70 text-sm">
            <span>Meeting ID: {meeting.meetingId}</span>
          </div>
        </div>

        {/* Video Area */}
        <div className="flex-1 flex items-center justify-center p-4 md:p-10">
          <div className="w-full h-full max-w-5xl rounded-3xl bg-[#2a2a2a] relative overflow-hidden shadow-2xl border border-white/5 flex flex-col items-center justify-center">
            {isSharing ? (
              <div className="w-full h-full bg-slate-800 flex flex-col items-center justify-center p-8 text-center animate-in zoom-in-95">
                <div className="w-full h-full rounded-2xl border-2 border-dashed border-slate-600 flex flex-col items-center justify-center bg-slate-900 shadow-inner">
                   <div className="text-6xl mb-4">📊</div>
                   <h3 className="text-2xl font-bold text-white">Interactive Lesson Presentation</h3>
                   <p className="text-slate-400 max-w-md">Teacher is currently sharing their screen for the presentation of {meeting.title}.</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-6 p-10 text-center">
                <div className="relative">
                  <div className="w-40 h-40 md:w-56 md:h-56 bg-slate-700 rounded-full flex items-center justify-center text-6xl md:text-8xl shadow-2xl border-4 border-slate-600">
                    👨‍🏫
                  </div>
                  <div className="absolute bottom-2 right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-[#2a2a2a]"></div>
                </div>
                <div>
                  <h3 className="text-2xl md:text-4xl font-bold text-white mb-2">{meeting.teacherName}</h3>
                  <p className="text-slate-400 font-medium">Head Instructor - Christaville School</p>
                </div>
              </div>
            )}

            {/* User Self View PIP */}
            <div className="absolute bottom-6 right-6 w-32 h-44 md:w-48 md:h-32 bg-[#333] rounded-2xl overflow-hidden border-2 border-white/10 shadow-xl flex items-center justify-center">
               {isVideoOn ? (
                 <div className="w-full h-full bg-slate-600 flex flex-col items-center justify-center p-2 text-center">
                    <span className="text-xs text-white font-bold">Your Video</span>
                    <span className="text-3xl">👤</span>
                 </div>
               ) : (
                 <div className="text-slate-500 text-xs font-bold flex flex-col items-center gap-2">
                   <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-lg uppercase">{user.fullName.charAt(0)}</div>
                   Camera Off
                 </div>
               )}
               <div className="absolute bottom-1 left-2 text-[10px] text-white font-bold bg-black/40 px-1 rounded">You</div>
            </div>
          </div>
        </div>

        {/* Control Bar */}
        <div className="bg-[#111] p-4 md:p-6 flex justify-between items-center border-t border-white/5">
          <div className="flex gap-2 md:gap-4">
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className={`p-3 md:p-4 rounded-2xl transition-all ${isMuted ? 'bg-red-600 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
            >
              {isMuted ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" /></svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
              )}
            </button>
            <button 
              onClick={() => setIsVideoOn(!isVideoOn)}
              className={`p-3 md:p-4 rounded-2xl transition-all ${!isVideoOn ? 'bg-red-600 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
            >
              {isVideoOn ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" /></svg>
              )}
            </button>
            <button 
              onClick={() => setIsSharing(!isSharing)}
              className={`hidden md:block p-4 rounded-2xl transition-all ${isSharing ? 'bg-amber-600 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </button>
          </div>

          <div className="flex gap-2">
             <button className="hidden md:flex p-4 rounded-2xl bg-white/10 text-white hover:bg-white/20 transition-all items-center gap-2 font-bold text-sm">
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
               Reactions
             </button>
             <button 
              onClick={onExit}
              className="px-6 md:px-10 py-3 md:py-4 bg-red-600 text-white rounded-2xl font-bold hover:bg-red-700 transition-all shadow-xl active:scale-95"
            >
              End Class
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar - Chat and People */}
      <div className="w-full md:w-[350px] lg:w-[400px] h-[40vh] md:h-full bg-[#111] border-l border-white/5 flex flex-col">
        {/* Tabs */}
        <div className="flex p-2 gap-1 bg-[#1a1a1a]">
          <button 
            onClick={() => setActiveTab('chat')}
            className={`flex-1 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${activeTab === 'chat' ? 'bg-[#333] text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
            Chat
          </button>
          <button 
            onClick={() => setActiveTab('people')}
            className={`flex-1 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${activeTab === 'people' ? 'bg-[#333] text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            People ({participants.length})
          </button>
        </div>

        {activeTab === 'chat' ? (
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className="animate-in slide-in-from-bottom-2">
                  <div className="flex justify-between items-baseline mb-1">
                    <span className={`text-xs font-bold ${msg.role === UserRole.TEACHER ? 'text-amber-500' : msg.role === UserRole.ADMIN ? 'text-blue-500' : 'text-slate-400'}`}>
                      {msg.sender}
                    </span>
                    <span className="text-[10px] text-slate-600">{msg.timestamp}</span>
                  </div>
                  <div className="bg-[#222] p-3 rounded-2xl rounded-tl-none border border-white/5 text-slate-300 text-sm leading-relaxed">
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
            
            <form onSubmit={handleSendMessage} className="p-4 bg-[#1a1a1a] border-t border-white/5 flex gap-2">
              <input 
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Send message to class..."
                className="flex-1 bg-[#2a2a2a] border border-white/5 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
              <button className="bg-amber-600 text-white p-3 rounded-xl hover:bg-amber-700 transition-all">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
              </button>
            </form>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {participants.map((p, i) => (
              <div key={i} className="flex justify-between items-center p-3 rounded-2xl hover:bg-white/5 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-sm font-bold text-white uppercase border border-white/5">
                    {p.name.charAt(0)}
                  </div>
                  <div>
                    <h5 className="text-white text-sm font-bold leading-tight">{p.name} {p.name === user.fullName && "(You)"}</h5>
                    <span className="text-[10px] text-slate-500 uppercase tracking-tighter">{p.role}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                   <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VirtualMeetingRoom;
