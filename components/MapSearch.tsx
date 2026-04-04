
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

const MapSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setResponse(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const result = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Find information and locations for: ${query} related to schools or educational centers.`,
        config: {
          tools: [{ googleMaps: {} }],
        },
      });

      const text = result.text;
      const chunks = result.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      
      setResponse({ text, chunks });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <div className="glass-effect p-8 md:p-12 rounded-[3.5rem] border-4 border-white shadow-2xl overflow-hidden relative">
        <div className="relative z-10 text-center mb-10">
          <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-4">Center & Location Finder</h2>
          <p className="text-slate-600 font-medium">Search for schools, exam centers, or MORAVIA branches near you.</p>
        </div>

        <form onSubmit={handleSearch} className="relative z-10 flex flex-col md:flex-row gap-3 mb-10">
          <div className="flex-1 relative">
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter city, state, or 'Schools near me'..."
              className="w-full px-8 py-5 rounded-[2rem] border-none bg-slate-100 focus:ring-4 focus:ring-amber-500/20 outline-none font-bold text-slate-900 shadow-inner"
            />
          </div>
          <button 
            type="submit"
            disabled={loading}
            className="px-10 py-5 bg-slate-900 text-white rounded-[2rem] font-black uppercase tracking-widest hover:bg-amber-600 transition-all shadow-xl disabled:opacity-50"
          >
            {loading ? 'Searching...' : 'Find Locations'}
          </button>
        </form>

        {response && (
          <div className="relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm leading-relaxed text-slate-700 mb-6">
              <p className="whitespace-pre-wrap font-medium">{response.text}</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {response.chunks.map((chunk: any, i: number) => chunk.maps && (
                <a 
                  key={i} 
                  href={chunk.maps.uri} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-200 hover:border-amber-500 hover:bg-amber-50 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center font-bold">📍</div>
                    <div>
                      <h4 className="font-black text-slate-900 text-sm">{chunk.maps.title || 'View on Maps'}</h4>
                      <p className="text-[10px] text-amber-600 font-bold uppercase tracking-widest">Google Maps Location</p>
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-slate-400 group-hover:text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        )}

        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none select-none">
          <div className="text-[120px] font-black text-slate-900">MAP</div>
        </div>
      </div>
    </div>
  );
};

export default MapSearch;
