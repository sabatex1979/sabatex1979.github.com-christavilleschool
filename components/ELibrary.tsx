
import React, { useState } from 'react';
import { LibraryResource, SchoolLevel } from '../types';

interface ELibraryProps {
  resources: LibraryResource[];
  userLevel: SchoolLevel | null;
}

const ELibrary: React.FC<ELibraryProps> = ({ resources, userLevel }) => {
  const [filter, setFilter] = useState<SchoolLevel | 'All'>(userLevel || 'All');

  const filteredResources = filter === 'All' 
    ? resources 
    : resources.filter(r => r.level === filter);

  return (
    <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
      <div className="mb-16 text-center">
        <h2 className="text-6xl font-black text-slate-900 mb-6 uppercase tracking-tighter">MORAVIA Digital Library</h2>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Access thousands of academic journals and reading materials</p>
        <div className="flex justify-center gap-3 mt-10">
          {['All', SchoolLevel.NURSERY, SchoolLevel.GRADE, SchoolLevel.JUNIOR_SECONDARY].map(lvl => (
            <button 
              key={lvl} 
              onClick={() => setFilter(lvl as any)}
              className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === lvl ? 'bg-slate-900 text-white shadow-xl' : 'bg-white text-slate-500 border'}`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {filteredResources.map(res => (
          <div key={res.id} className="group relative bg-white rounded-[3rem] overflow-hidden shadow-lg border-2 border-white hover:shadow-2xl transition-all hover:-translate-y-2">
            <div className="h-64 overflow-hidden relative">
              <img src={res.coverImage} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={res.title} />
              <div className="absolute top-4 right-4 px-4 py-1 bg-amber-500 text-slate-900 text-[8px] font-black uppercase rounded-full">
                {res.category}
              </div>
            </div>
            <div className="p-8">
              <h3 className="text-xl font-black text-slate-900 mb-2 leading-tight uppercase">{res.title}</h3>
              <p className="text-xs text-slate-500 font-bold mb-6">By {res.author}</p>
              <a 
                href={res.readUrl} 
                className="block w-full py-4 bg-slate-900 text-white text-center rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-amber-600 transition-colors"
              >
                Open Book
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ELibrary;
