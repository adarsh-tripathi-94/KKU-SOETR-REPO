
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Logo } from '../../components/Logo';

export const StudentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { submissions, formTimelines, uploadedContent } = useAuth();

  // "Personalization" Logic: Finding most recent Data Entry submission to mock a profile
  const profileData = useMemo(() => {
    const dataEntry = submissions.find(s => s.formType === 'Data Entry');
    return dataEntry?.data;
  }, [submissions]);

  const recentSubmissions = submissions.slice(0, 5);
  const activeDeadlines = formTimelines.filter(t => t.isActive);
  const recentUpdates = uploadedContent.slice(0, 4);

  const cardCls = "bg-white border-2 border-black rounded-[2.5rem] p-8 shadow-xl hover:shadow-2xl transition-all h-full flex flex-col";
  const labelCls = "text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1";

  return (
    <div className="p-4 md:p-10 max-w-7xl mx-auto min-h-screen font-sans bg-gray-50">
      {/* Personalized Welcome Section */}
      <div className="bg-kku-blue text-white rounded-[3.5rem] p-10 md:p-16 mb-12 shadow-[0_40px_100px_rgba(0,31,63,0.3)] border-4 border-kku-gold relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="w-32 h-44 rounded-2xl border-4 border-white overflow-hidden shadow-2xl bg-white/10 shrink-0">
            {profileData?.photoUrl ? (
              <img src={profileData.photoUrl} className="w-full h-full object-cover" alt="Student Portrait" />
            ) : (
              <div className="w-full h-full flex items-center justify-center p-4 text-center">
                <Logo className="w-full h-full opacity-20" />
              </div>
            )}
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-serif font-black uppercase tracking-tighter leading-none m-0">
              Welcome, {profileData?.name?.split(' ')[0] || 'Scholar'}
            </h1>
            <p className="text-kku-gold font-bold uppercase text-[12px] mt-4 tracking-[0.4em] bg-white/10 px-8 py-2 rounded-full inline-block">
              {profileData?.programme || 'SOETR Hub Member'} | {profileData?.session || 'Academic Year 2024-25'}
            </p>
            <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-300 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Official Record Active
              </span>
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">
                Admission ID: {profileData?.enrollmentNo || 'Pending Sync'}
              </span>
            </div>
          </div>
        </div>

        {!profileData && (
          <div className="relative z-10 bg-white/10 backdrop-blur-md p-8 rounded-[2.5rem] border-2 border-white/20 text-center max-w-sm">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-4">Registry Incomplete</p>
            <h3 className="text-xl font-bold mb-6">Synchronize your official profile to unlock full metrics.</h3>
            <button 
              onClick={() => navigate('/form/data-entry')}
              className="w-full py-4 bg-kku-gold text-kku-blue rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-white transition-all shadow-xl"
            >
              Start Registration
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Tracker Section: Deadlines & Updates */}
        <div className="lg:col-span-2 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Form Activity Center */}
            <div className={cardCls}>
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-black uppercase text-kku-blue tracking-widest">Enrollment Status</h3>
                <span className="bg-gray-100 text-[9px] font-black px-3 py-1 rounded-full text-gray-400 uppercase">Live Timeline</span>
              </div>
              <div className="space-y-6 flex-1">
                {activeDeadlines.map(t => (
                  <div key={t.formId} className="group p-5 bg-gray-50 rounded-3xl border-2 border-black/5 hover:bg-white hover:border-kku-blue/30 transition-all cursor-pointer" onClick={() => navigate(`/form/${t.formId}`)}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-black uppercase text-xs text-kku-blue">{t.formName}</span>
                      <span className="text-[9px] font-black text-green-700 bg-green-50 px-2 py-0.5 rounded-full">ACTIVE</span>
                    </div>
                    <div className="flex justify-between items-end">
                      <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest m-0">Regulatory Enrollment Phase</p>
                      <span className="text-[10px] font-black text-red-700 uppercase">Ends: {t.endDate}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => navigate('/')} className="mt-8 w-full py-4 border-2 border-black rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-black hover:text-white transition-all">
                View All Forms
              </button>
            </div>

            {/* Academic Notification Hub */}
            <div className={cardCls}>
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-black uppercase text-kku-blue tracking-widest">Update Stream</h3>
                <span className="bg-kku-gold/10 text-[9px] font-black px-3 py-1 rounded-full text-kku-gold uppercase">New Assets</span>
              </div>
              <div className="space-y-4 flex-1">
                {recentUpdates.map(update => (
                  <div key={update.id} className="flex gap-4 items-start p-3 hover:bg-blue-50/50 rounded-2xl transition-colors cursor-pointer" onClick={() => navigate('/view/study-materials')}>
                    <div className="w-10 h-10 bg-kku-blue/5 text-kku-blue rounded-xl flex items-center justify-center shrink-0 border border-kku-blue/10">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    </div>
                    <div>
                      <h4 className="text-[11px] font-black text-kku-blue leading-tight uppercase line-clamp-1">{update.title}</h4>
                      <p className="text-[8px] font-bold text-gray-400 uppercase mt-1">{update.datePublished} | {update.category}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => navigate('/view/notice-board')} className="mt-8 w-full py-4 bg-kku-blue text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-black transition-all">
                Access Repository
              </button>
            </div>
          </div>

          {/* Submission History Feed */}
          <div className="bg-white border-2 border-black rounded-[3rem] p-10 shadow-xl">
            <h3 className="text-2xl font-black uppercase text-kku-blue tracking-widest mb-10 border-l-8 border-kku-gold pl-6">Local Transaction Registry</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b-2 border-gray-100">
                    <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Reference ID</th>
                    <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Artifact Type</th>
                    <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Submission Date</th>
                    <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Verification</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-gray-50">
                  {recentSubmissions.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-20 text-center text-gray-300 italic font-black uppercase text-sm tracking-widest">No active submissions detected in local archive.</td>
                    </tr>
                  ) : (
                    recentSubmissions.map(sub => (
                      <tr key={sub.id} className="group hover:bg-gray-50 transition-colors">
                        <td className="py-6 font-black text-[11px] text-kku-blue uppercase">{sub.id}</td>
                        <td className="py-6 font-bold text-[11px] text-black uppercase">{sub.formType}</td>
                        <td className="py-6 font-bold text-[11px] text-gray-500 uppercase">{sub.date}</td>
                        <td className="py-6 text-right">
                          <span className="bg-green-50 text-green-700 text-[9px] font-black px-3 py-1 rounded-full uppercase border border-green-100">Synchronized</span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-10">
          {/* Detailed Profile Artifact */}
          <div className={cardCls}>
            <div className="mb-10 text-center">
              <div className="w-24 h-24 bg-gray-50 rounded-[2rem] border-2 border-black/5 mx-auto mb-6 flex items-center justify-center shadow-inner">
                <Logo className="w-16 h-16 grayscale opacity-40" />
              </div>
              <h3 className="text-xl font-black uppercase text-kku-blue tracking-tighter">Academic Identity</h3>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mt-1">Verified Audit Profile</p>
            </div>
            
            <div className="space-y-8 flex-1">
              {[
                { l: "Full Legal Name", v: profileData?.name || "Pending Selection" },
                { l: "Admission Track", v: profileData?.programme || "SOETR Master List" },
                { l: "Official Contact", v: profileData?.mobile || "No ID Linked" },
                { l: "Academic Status", v: profileData ? "Active (In-Term)" : "Inactive Registry" }
              ].map(item => (
                <div key={item.l} className="border-b border-gray-100 pb-2">
                  <label className={labelCls}>{item.l}</label>
                  <p className="font-black uppercase text-kku-blue text-xs tracking-wide m-0">{item.v}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 p-6 bg-blue-50/50 rounded-3xl border-2 border-kku-blue/10">
              <p className="text-[9px] font-bold text-gray-600 leading-relaxed italic text-center m-0">
                "This dashboard summarizes artifact transactions and regulatory deadlines specific to your session."
              </p>
            </div>
          </div>

          {/* Quick Hub Access */}
          <div className="bg-gradient-to-br from-kku-blue to-black text-white rounded-[2.5rem] p-10 shadow-2xl border-2 border-white/10">
            <h4 className="text-kku-gold font-black uppercase text-xs tracking-[0.3em] mb-8">Hub Resources</h4>
            <div className="grid grid-cols-2 gap-4">
              {[
                { n: "Materials", p: "/view/study-materials", i: "M12 6.03V12m0 0h4.17M12 12v4.17M12 12H7.83m10.17 0a8 8 0 11-16 0 8 8 0 0116 0z" },
                { n: "Registry", p: "/form/data-entry", i: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
                { n: "Internship", p: "/form/internship", i: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v12a2 2 0 002 2z" },
                { n: "Grievance", p: "/form/grievance", i: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" }
              ].map(r => (
                <button 
                  key={r.n} 
                  onClick={() => navigate(r.p)}
                  className="p-4 bg-white/5 rounded-2xl hover:bg-kku-gold hover:text-kku-blue transition-all group flex flex-col items-center gap-3 border border-white/10"
                >
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={r.i} /></svg>
                  <span className="text-[9px] font-black uppercase tracking-widest">{r.n}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
