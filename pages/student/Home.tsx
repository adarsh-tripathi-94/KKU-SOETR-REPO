
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const SERVICE_BUTTONS = [
  { id: 'notice-board', label: 'Notice Board', path: '/view/notice-board', category: 'Notice', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' },
  { id: 'assignments', label: 'Assignment Questions', path: '/view/assignments', category: 'Assignment', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
  { id: 'timetable', label: 'Academic Time-Table', path: '/view/timetable', category: 'Time-Table', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v12a2 2 0 002 2z' },
  { id: 'question-bank', label: 'Question Bank', path: '/view/question-bank', category: 'Question Bank', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
  { id: 'study-materials', label: 'Study Materials', path: '/view/study-materials', category: 'Study', icon: 'M12 6.03V12m0 0h4.17M12 12v4.17M12 12H7.83m10.17 0a8 8 0 11-16 0 8 8 0 0116 0z' },
  { id: 'result', label: 'Exam Results', path: '/view/result', category: 'Results', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
];

const FORM_BUTTONS = [
  { id: 'data-entry', label: 'Data Entry Form', path: '/form/data-entry', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' },
  { id: 'internship', label: 'Internship Letter', path: '/form/internship', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v12a2 2 0 002 2z' },
  { id: 'leave', label: 'Leave Application', path: '/form/leave', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
  { id: 'grievance', label: 'Fill Grievance', path: '/form/grievance', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' },
];

const ACADEMIC_PLATFORMS = [
  { name: "NCERT Hub", url: "https://www.youtube.com/@ncertofficial", icon: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z", color: "text-blue-600" },
  { name: "NIOS", url: "https://www.youtube.com/@NIOSLearning", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253", color: "text-orange-600" },
  { name: "SWAYAM", url: "https://www.youtube.com/@swayamprabha-mhrd", icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", color: "text-purple-600" },
  { name: "IGNOU", url: "https://www.youtube.com/@IGNOU", icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10", color: "text-indigo-600" },
  { name: "UGC Hub", url: "https://www.youtube.com/@UGC_India", icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9", color: "text-teal-600" }
];

const CAREER_PLATFORMS = [
  { name: "Sarkari Result", url: "https://www.sarkariresult.com", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2", color: "text-green-700" },
  { name: "UPSC Hub", url: "https://www.upsc.gov.in", icon: "M12 14l9-5-9-5-9 5 9 5zm0 0l9-5-9-5-9 5 9 5zm0 0v6m0 0l4-2.25M12 20l-4-2.25", color: "text-blue-900" },
  { name: "BPSC Portal", url: "https://www.bpsc.bih.nic.in", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4", color: "text-red-800" },
  { name: "UGC-NET", url: "https://ugcnet.nta.nic.in", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", color: "text-indigo-800" },
  { name: "CTET Hub", url: "https://ctet.nic.in", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v12a2 2 0 002 2z", color: "text-sky-800" }
];

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { isFormOpen, galleryImages, uploadedContent, headerAlerts } = useAuth();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentFlashIdx, setCurrentFlashIdx] = useState(0);

  useEffect(() => {
    if (!galleryImages || galleryImages.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide(s => (s + 1) % galleryImages.length);
    }, 2000); 
    return () => clearInterval(timer);
  }, [galleryImages]);

  // Flash Message Sequencer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFlashIdx(prev => (prev + 1) % 3);
    }, 3000); // Cycles every 3 seconds
    return () => clearInterval(timer);
  }, []);

  const activeGallery = galleryImages && galleryImages.length > 0 ? galleryImages : [];

  const getArtifactCount = (category: string) => {
    return uploadedContent.filter(c => c.category === category).length;
  };

  const visibleFormButtons = FORM_BUTTONS.filter(btn => isFormOpen(btn.id));

  // Sequence Data - Removed "Upcoming Exam"
  const flashNotices = [
    { label: "Upcoming Internship", text: headerAlerts.find(a => a.id === 'internship-alert')?.text || "Allotment Cycle Live", color: "bg-blue-700", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v12a2 2 0 002 2z", path: "/form/internship" },
    { label: "Uploaded Question Bank", text: headerAlerts.find(a => a.id === 'qb-alert')?.text || "New Artifacts Synchronized", color: "bg-indigo-700", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253", path: "/view/question-bank" },
    { label: "Uploaded Assignment Question", text: headerAlerts.find(a => a.id === 'assignment-alert')?.text || "Curricular Assignments Live", color: "bg-green-700", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", path: "/view/assignments" }
  ];

  const activeNotice = flashNotices[currentFlashIdx];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-24 w-full no-print font-sans">
      <div className="relative w-full h-[315px] md:h-[480px] overflow-hidden shadow-2xl border-b-8 border-kku-gold bg-kku-blue">
        
        {/* ONE-BY-ONE FLASH ANNOUNCEMENT OVERLAY */}
        <div className="absolute top-0 left-0 right-0 z-40 flex justify-center p-2 md:p-4">
           <div 
             onClick={() => navigate(activeNotice.path)}
             className={`${activeNotice.color} w-full max-w-4xl rounded-2xl md:rounded-[2rem] border-2 border-white/30 shadow-2xl overflow-hidden cursor-pointer transform transition-all duration-700 animate-slideDown flex items-center p-3 md:p-6 backdrop-blur-md relative group`}
           >
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-8 h-8 md:w-14 md:h-14 bg-white/20 rounded-xl flex items-center justify-center text-white shrink-0 mr-4 md:mr-8 shadow-lg">
                <svg className="w-5 h-5 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={activeNotice.icon} /></svg>
              </div>
              <div className="flex-1">
                 <div className="flex items-center gap-2 mb-0.5 md:mb-1">
                    <span className="bg-red-500 text-white text-[7px] md:text-[9px] font-black px-2 py-0.5 rounded-full animate-vibrant-blink border border-white/20 shadow-md uppercase tracking-widest">Live Alert</span>
                    <h4 className="text-white/70 font-black uppercase text-[8px] md:text-[11px] tracking-[0.2em]">{activeNotice.label}</h4>
                 </div>
                 <p className="text-white font-black uppercase text-[10px] md:text-xl leading-none md:leading-tight drop-shadow-xl truncate">{activeNotice.text}</p>
              </div>
              <div className="hidden md:flex items-center gap-3 bg-white/10 px-6 py-2 rounded-full border border-white/20 text-white group-hover:bg-white group-hover:text-black transition-all ml-4">
                 <span className="text-[10px] font-black uppercase tracking-widest">Access Hub</span>
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </div>
           </div>
        </div>

        {activeGallery.length > 0 ? activeGallery.map((img, idx) => (
          <div key={img.id} className={`absolute inset-0 transition-all duration-[1000ms] ease-in-out ${idx === currentSlide ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-110 z-0'}`}>
            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url("${img.url}")` }}>
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent"></div>
              <div className="absolute bottom-12 left-6 md:left-24 text-white max-w-5xl animate-fadeIn">
                <span className="bg-kku-gold text-kku-blue px-6 py-1 text-[10px] font-black uppercase tracking-[0.3em] mb-4 inline-block rounded-full shadow-lg">SOETR Academic Hub</span>
                <h2 className="text-3xl md:text-5xl font-serif font-black uppercase tracking-tight leading-none drop-shadow-2xl">{img.title}</h2>
                <p className="text-xs md:text-lg font-bold text-gray-300 mt-4 tracking-wide max-w-3xl leading-relaxed">{img.description}</p>
              </div>
            </div>
          </div>
        )) : (
          <div className="absolute inset-0 flex items-center justify-center text-white/20">
            <span className="text-2xl font-black uppercase tracking-[0.5em]">SOETR Institutional Hub</span>
          </div>
        )}
        
        {activeGallery.length > 1 && (
          <div className="absolute bottom-6 right-6 md:right-12 flex gap-2 z-30 flex-wrap justify-end max-w-[200px] md:max-w-none">
            {activeGallery.map((_, i) => (
              <button key={i} onClick={() => setCurrentSlide(i)} className={`h-2 rounded-full transition-all border border-white/50 ${i === currentSlide ? 'bg-kku-gold w-8 ring-2 ring-kku-gold/30 shadow-lg' : 'bg-white/20 w-2 hover:bg-white/40'}`} />
            ))}
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full -mt-14 relative z-20">
        {/* Top Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <button onClick={() => navigate('/portal/search')} className="flex flex-col items-center p-8 bg-white border-2 border-kku-blue rounded-[2.5rem] shadow-2xl hover:-translate-y-2 transition-all group">
            <div className="w-14 h-14 bg-kku-blue text-kku-gold flex items-center justify-center mb-4 rounded-3xl group-hover:bg-kku-gold group-hover:text-kku-blue transition-all"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></div>
            <h3 className="text-xl font-black uppercase tracking-widest text-kku-blue text-center">Security Portal</h3>
            <p className="text-[9px] font-black uppercase text-gray-400 mt-2 tracking-[0.2em]">Official Record Lookup</p>
          </button>
          <a href="https://www.youtube.com/@K.K.UniversityS.O.E.R.T" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center p-8 bg-red-700 text-white rounded-[2.5rem] shadow-2xl hover:-translate-y-2 transition-all group">
            <div className="w-14 h-14 bg-white text-red-700 flex items-center justify-center mb-4 rounded-3xl"><svg fill="currentColor" viewBox="0 0 24 24" className="w-8 h-8"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505a3.017 3.017 0 0 0-2.122 2.136C0 8.055 0 12 0 12s0 3.945.501 5.814a3.017 3.017 0 0 0 2.122 2.136C4.495 20.455 12 20.455 12 20.455s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.945 24 12 24 12s0-3.945-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></div>
            <h3 className="text-xl font-black uppercase tracking-widest text-center">YouTube Hub</h3>
            <p className="text-[9px] font-black uppercase text-red-100 mt-2 tracking-[0.2em]">Lecture Archives</p>
          </a>
          <a href="https://kkuniversity.ac.in/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center p-8 bg-kku-blue text-white rounded-[2.5rem] shadow-2xl hover:-translate-y-2 transition-all group">
            <div className="w-14 h-14 bg-kku-gold text-kku-blue flex items-center justify-center mb-4 rounded-3xl"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg></div>
            <h3 className="text-xl font-black uppercase tracking-widest text-kku-gold text-center">Main Website</h3>
            <p className="text-[9px] font-black uppercase text-white mt-2 tracking-[0.2em]">University Portal</p>
          </a>
        </div>

        {/* Academic Infrastructure Master Group */}
        <div className="mb-24 space-y-16">
          <div>
            <h2 className="text-3xl font-serif font-black text-kku-blue uppercase tracking-[0.3em] border-l-8 border-kku-gold pl-8 mb-12">Academic Infrastructure</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {SERVICE_BUTTONS.map(btn => {
                const count = getArtifactCount(btn.category);
                const isOpen = isFormOpen(btn.id);
                if (!isOpen) return null;
                return (
                  <button key={btn.id} onClick={() => navigate(btn.path)} className="flex flex-col items-center justify-center p-10 bg-white border border-black rounded-[2.5rem] shadow-xl hover:bg-kku-blue hover:text-white transition-all transform hover:-translate-y-1 group relative overflow-hidden">
                    {count > 0 && <div className="absolute top-4 right-4 bg-kku-gold text-kku-blue text-[9px] font-black px-2 py-0.5 rounded-full shadow-md animate-pulse">{count} New</div>}
                    <div className="w-12 h-12 mb-6 text-kku-gold group-hover:text-white transition-colors"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={btn.icon}></path></svg></div>
                    <span className="text-[11px] font-black uppercase text-center tracking-widest leading-tight">{btn.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Educational Hub Row */}
          <div>
            <h4 className="text-xl font-serif font-black text-red-700 uppercase tracking-[0.3em] border-l-4 border-red-700 pl-6 mb-8">Educational Hub</h4>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {ACADEMIC_PLATFORMS.map(p => (
                <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center p-10 bg-white border border-black rounded-[2.5rem] shadow-xl hover:bg-red-700 hover:text-white transition-all transform hover:-translate-y-1 group">
                  <div className={`w-12 h-12 mb-6 ${p.color} group-hover:text-white transition-colors`}>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={p.icon}></path></svg>
                  </div>
                  <span className="text-[11px] font-black uppercase text-center tracking-widest leading-tight">{p.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Career Portals Row */}
          <div>
            <h4 className="text-xl font-serif font-black text-blue-900 uppercase tracking-[0.3em] border-l-4 border-blue-900 pl-6 mb-8">Career Search Portals</h4>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {CAREER_PLATFORMS.map(p => (
                <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center p-10 bg-white border border-black rounded-[2.5rem] shadow-xl hover:bg-blue-900 hover:text-white transition-all transform hover:-translate-y-1 group">
                  <div className={`w-12 h-12 mb-6 ${p.color} group-hover:text-white transition-colors`}>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={p.icon}></path></svg>
                  </div>
                  <span className="text-[11px] font-black uppercase text-center tracking-widest leading-tight">{p.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Institutional Registrations */}
        {visibleFormButtons.length > 0 && (
          <div className="mb-24 animate-fadeIn">
            <h2 className="text-3xl font-serif font-black text-blue-900 uppercase tracking-[0.3em] border-l-8 border-red-700 pl-8 mb-12">Institutional Registrations</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {visibleFormButtons.map(btn => (
                <button key={btn.id} onClick={() => navigate(btn.path)} className="flex flex-col items-center justify-center p-10 border-2 border-blue-900 bg-white rounded-[2.5rem] transition-all shadow-xl hover:-translate-y-1 hover:bg-blue-900 hover:text-white group">
                  <div className="w-12 h-12 mb-6"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full text-blue-900 group-hover:text-white"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={btn.icon}></path></svg></div>
                  <span className="text-[11px] font-black uppercase text-center tracking-widest leading-tight">{btn.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes vibrant-blink {
          0%, 100! { opacity: 1; filter: brightness(1); }
          50% { opacity: 0.7; filter: brightness(1.3); transform: scale(1.05); }
        }
        .animate-slideDown { animation: slideDown 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-vibrant-blink { animation: vibrant-blink 1s infinite ease-in-out; }
      `}</style>
    </div>
  );
};
