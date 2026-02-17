import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User, Role, AdminRole, DataEntryRecord, AdminUser, OfficialSignatures, UploadedContent, FormTimeline, GalleryImage, GoverningBodyMember, MockSubmission, HeaderAlert } from '../types';

// 1. IMPORT SUPABASE CLIENT
import { supabase } from '../supabase'; 

// ... [Keep your INITIAL_TIMELINES, DEFAULT_ALERTS, etc. exactly as they are] ...
const INITIAL_TIMELINES: FormTimeline[] = [
  { formId: 'notice-board', formName: 'Notice Board', startDate: '01-01-2024', endDate: '31-12-2030', isActive: true },
  { formId: 'assignments', formName: 'Assignments', startDate: '01-01-2024', endDate: '31-12-2030', isActive: true },
  { formId: 'timetable', formName: 'Time-Table', startDate: '01-01-2024', endDate: '31-12-2030', isActive: true },
  { formId: 'question-bank', formName: 'Question Bank', startDate: '01-01-2024', endDate: '31-12-2030', isActive: true },
  { formId: 'study-materials', formName: 'Study Materials', startDate: '01-01-2024', endDate: '31-12-2030', isActive: true },
  { formId: 'result', formName: 'Exam Results', startDate: '01-01-2024', endDate: '31-12-2030', isActive: true },
  { formId: 'data-entry', formName: 'Data Entry Form', startDate: '01-01-2024', endDate: '31-12-2030', isActive: true },
  { formId: 'exam', formName: 'Fill Examination Form', startDate: '01-01-2024', endDate: '31-12-2030', isActive: true },
  { formId: 'grievance', formName: 'Fill Grievance', startDate: '01-01-2024', endDate: '31-12-2030', isActive: true },
  { formId: 'internship', formName: 'Internship Letter', startDate: '01-01-2024', endDate: '31-12-2030', isActive: true },
  { formId: 'leave', formName: 'Leave Application', startDate: '01-01-2024', endDate: '31-12-2030', isActive: true },
  { formId: 'feedback', formName: 'Feedback', startDate: '01-01-2024', endDate: '31-12-2030', isActive: true },
  { formId: 'governing-body', formName: 'Leadership Section', startDate: '01-01-2024', endDate: '31-12-2030', isActive: true }
];

const DEFAULT_ALERTS: HeaderAlert[] = [
  { id: 'exam-alert', text: 'Upcoming Examination Cycle - Enrollment Initiated', isActive: true },
  { id: 'internship-alert', text: 'School Internship Phase - Allotment Portal Open', isActive: true },
  { id: 'qb-alert', text: 'New Question Bank Uploaded - Verify Artifacts', isActive: true },
  { id: 'assignment-alert', text: 'Uploaded Fresh Assignment Questions for Current Session', isActive: true }
];

const DEFAULT_GOVERNING: GoverningBodyMember[] = [
  { 
    id: 'gb1', 
    name: "Er. Ravi Chaudhary", 
    title: "Hon'ble Chancellor", 
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300&h=300", 
    description: "Our mission is to cultivate a learning environment where innovation meets tradition. We are dedicated to producing educators who will inspire and lead globally." 
  }
];

const DEFAULT_GALLERY: GalleryImage[] = [
  { id: 'gal1', url: 'https://images.unsplash.com/photo-1523240715639-9635df8688a1?auto=format&fit=crop&q=80&w=1600&h=800', title: 'Scholarly Dialogue', description: 'Indian student-teachers engaging in deep academic discourse in our modern seminar halls.' },
  { id: 'gal2', url: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&q=80&w=1600&h=800', title: 'Future Educators', description: 'Nurturing the next generation of teachers with contemporary teaching-learning methodologies.' },
  { id: 'gal3', url: 'https://images.unsplash.com/photo-1590633733982-7c9f699f2fdc?auto=format&fit=crop&q=80&w=1600&h=800', title: 'Collaborative Learning', description: 'Group research projects fostering teamwork and critical thinking among scholars.' },
  { id: 'gal4', url: 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&q=80&w=1600&h=800', title: 'Academic Focus', description: 'Dedicated students utilizing our extensive library resources for academic excellence.' },
  { id: 'gal5', url: 'https://images.unsplash.com/photo-1544717297-fa95b3ee21f3?auto=format&fit=crop&q=80&w=1600&h=800', title: 'Campus Excellence', description: 'A vibrant campus life centered around learning, ethics, and professional development.' },
  { id: 'gal6', url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1600&h=800', title: 'Practical Pedagogies', description: 'Developing hands-on teaching skills through our state-of-the-art laboratory facilities.' },
  { id: 'gal7', url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1600&h=800', title: 'Digital Empowerment', description: 'Integrating ICT in education to prepare student-teachers for the 21st-century classroom.' },
  { id: 'gal8', url: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=1600&h=800', title: 'Visionary Research', description: 'Fostering a culture of innovation and research in teacher education at SOETR.' },
  { id: 'gal9', url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1600&h=800', title: 'Inclusive Environment', description: 'A diverse community of learners working together towards social transformation through education.' },
  { id: 'gal10', url: 'https://images.unsplash.com/photo-1531259683007-016a7b628fc3?auto=format&fit=crop&q=80&w=1600&h=800', title: 'Institutional Leadership', description: 'SOETR leading the way in producing highly qualified and dedicated professional educators.' }
];

interface AuthContextType {
  user: User | null;
  login: (role: Role, email?: string, adminRole?: AdminRole) => void;
  logout: () => void;
  dataRecords: DataEntryRecord[];
  addDataRecord: (record: DataEntryRecord) => void;
  deleteDataRecord: (id: string) => void;
  adminUsers: AdminUser[];
  uploadedContent: UploadedContent[];
  publishContent: (content: UploadedContent) => void;
  deleteContent: (id: string) => void;
  formTimelines: FormTimeline[];
  updateFormTimeline: (timeline: FormTimeline) => void;
  updateAllFormTimelines: (active: boolean) => void;
  isFormOpen: (formId: string) => boolean;
  officialSignatures: OfficialSignatures;
  updateOfficialSignatures: (signs: Partial<OfficialSignatures>) => void;
  galleryImages: GalleryImage[];
  addGalleryImage: (img: GalleryImage) => void;
  deleteGalleryImage: (id: string) => void;
  governingBody: GoverningBodyMember[];
  addGoverningMember: (member: GoverningBodyMember) => void;
  updateGoverningMember: (member: GoverningBodyMember) => void;
  deleteGoverningMember: (id: string) => void;
  submissions: MockSubmission[];
  addSubmission: (submission: MockSubmission) => void;
  deleteSubmission: (id: string) => void;
  markSubmissionAsRead: (id: string) => void;
  generateRefNo: () => string;
  getSchoolEnrollmentCount: (schoolName: string) => number;
  headerAlerts: HeaderAlert[];
  updateHeaderAlerts: (alerts: HeaderAlert[]) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>({ role: Role.STUDENT });
  const [dataRecords, setDataRecords] = useState<DataEntryRecord[]>([]);
  const [adminUsers] = useState<AdminUser[]>([
    { id: 'admin-1', email: 'soe.bkt1980@gmail.com', password: 'brijesh@1980', role: AdminRole.SUPER_ADMIN }
  ]);
  const [uploadedContent, setUploadedContent] = useState<UploadedContent[]>([]);
  const [formTimelines, setFormTimelines] = useState<FormTimeline[]>(INITIAL_TIMELINES);
  const [officialSignatures, setOfficialSignatures] = useState<OfficialSignatures>({});
  const [governingBody, setGoverningBody] = useState<GoverningBodyMember[]>(DEFAULT_GOVERNING);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(DEFAULT_GALLERY);
  
  // CHANGED: We still need state for UI, but it loads from Supabase now
  const [submissions, setSubmissions] = useState<MockSubmission[]>([]);
  
  const [refCounter, setRefCounter] = useState(1);
  const [headerAlerts, setHeaderAlerts] = useState<HeaderAlert[]>(DEFAULT_ALERTS);

  // 1. Fetch Submissions from Supabase on Load
  useEffect(() => {
    fetchSubmissions();
    
    // Keep loading other local items
    const load = (key: string, setter: Function, defaultValue: any) => {
      const s = localStorage.getItem(key);
      if (s) { try { setter(JSON.parse(s)); } catch(e) { setter(defaultValue); } } 
      else { setter(defaultValue); }
    };
    load('soetr_data_records', setDataRecords, []);
    load('soetr_timelines', setFormTimelines, INITIAL_TIMELINES);
    load('soetr_uploads', setUploadedContent, []);
    load('official_signatures', setOfficialSignatures, {});
    load('soetr_governance', setGoverningBody, DEFAULT_GOVERNING);
    load('soetr_gallery', setGalleryImages, DEFAULT_GALLERY);
    load('soetr_ref_counter', setRefCounter, 1);
    load('soetr_header_alerts', setHeaderAlerts, DEFAULT_ALERTS);
  }, []);

  // ------------------------------------------------------------
  // NEW FUNCTION: Fetch & Map Data from Supabase
  // ------------------------------------------------------------
  const fetchSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from('Data Entry Form')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        // We must map Supabase (snake_case) columns to your App's (camelCase) format
        const mappedSubmissions: MockSubmission[] = data.map(row => ({
          id: row.ref_no,
          date: new Date(row.created_at).toLocaleDateString('en-GB'),
          enrollmentNo: row.enrollment_no,
          name: row.name,
          programme: row.programme,
          formType: 'Data Entry', // Hardcoded as this table is only for Data Entry
          isRead: false, // Default value as DB might not store this yet
          school: '', // Not used in Data Entry form
          data: {
            refNo: row.ref_no,
            enrollmentNo: row.enrollment_no,
            name: row.name,
            fatherName: row.father_name,
            motherName: row.mother_name,
            programme: row.programme,
            session: row.session,
            year: row.year,
            semester: row.semester,
            mobile: row.mobile,
            whatsapp: row.whatsapp,
            email: row.email,
            address: row.address,
            pinCode: row.pin_code,
            photoUrl: row.photo_url,
            eduDetails: row.edu_details, // Supabase JSONB returns as object/array automatically
            timestamp: row.created_at
          }
        }));
        setSubmissions(mappedSubmissions);
      }
    } catch (err) {
      console.error("Error fetching submissions:", err);
    }
  };

  const isFormOpen = (formId: string): boolean => {
    const timeline = formTimelines.find(t => t.formId === formId);
    if (!timeline || !timeline.isActive) return false;
    return true; 
  };

  // ... [Keep updateFormTimeline, updateAllFormTimelines, login, logout, addDataRecord, deleteDataRecord, publishContent, deleteContent, updateOfficialSignatures, addGalleryImage, deleteGalleryImage, addGoverningMember, updateGoverningMember, deleteGoverningMember exactly as before] ...
  
  const updateFormTimeline = (timeline: FormTimeline) => {
    setFormTimelines(prev => {
      const updated = prev.map(t => t.formId === timeline.formId ? timeline : t);
      localStorage.setItem('soetr_timelines', JSON.stringify(updated));
      return updated;
    });
  };

  const updateAllFormTimelines = (active: boolean) => {
    setFormTimelines(prev => {
      const updated = prev.map(t => ({ ...t, isActive: active }));
      localStorage.setItem('soetr_timelines', JSON.stringify(updated));
      return updated;
    });
  };

  const login = (role: Role, email?: string, adminRole?: AdminRole) => {
    setUser({ role, email, adminRole: adminRole || AdminRole.SUPER_ADMIN });
  };

  const logout = () => {
    setUser({ role: Role.STUDENT });
  };

  const addDataRecord = (record: DataEntryRecord) => {
    setDataRecords(prev => {
      const updated = [record, ...prev];
      localStorage.setItem('soetr_data_records', JSON.stringify(updated));
      return updated;
    });
  };

  const deleteDataRecord = (id: string) => {
    setDataRecords(prev => {
      const updated = prev.filter(r => r.id !== id);
      localStorage.setItem('soetr_data_records', JSON.stringify(updated));
      return updated;
    });
  };

  const publishContent = (content: UploadedContent) => {
    setUploadedContent(prev => {
      const updated = [content, ...prev];
      localStorage.setItem('soetr_uploads', JSON.stringify(updated));
      return updated;
    });
  };

  const deleteContent = (id: string) => {
    setUploadedContent(prev => {
      const updated = prev.filter(c => c.id !== id);
      localStorage.setItem('soetr_uploads', JSON.stringify(updated));
      return updated;
    });
  };

  const updateOfficialSignatures = (signs: Partial<OfficialSignatures>) => {
    setOfficialSignatures(prev => {
      const updated = { ...prev, ...signs };
      localStorage.setItem('official_signatures', JSON.stringify(updated));
      return updated;
    });
  };

  const addGalleryImage = (img: GalleryImage) => {
    setGalleryImages(prev => {
      const updated = [...prev, img];
      localStorage.setItem('soetr_gallery', JSON.stringify(updated));
      return updated;
    });
  };

  const deleteGalleryImage = (id: string) => {
    setGalleryImages(prev => {
      const updated = prev.filter(i => i.id !== id);
      localStorage.setItem('soetr_gallery', JSON.stringify(updated));
      return updated;
    });
  };

  const addGoverningMember = (member: GoverningBodyMember) => {
    setGoverningBody(prev => {
      const updated = [member, ...prev];
      localStorage.setItem('soetr_governance', JSON.stringify(updated));
      return updated;
    });
  };

  const updateGoverningMember = (member: GoverningBodyMember) => {
    setGoverningBody(prev => {
      const updated = prev.map(m => m.id === member.id ? member : m);
      localStorage.setItem('soetr_governance', JSON.stringify(updated));
      return updated;
    });
  };

  const deleteGoverningMember = (id: string) => {
    setGoverningBody(prev => {
      const updated = prev.filter(m => m.id !== id);
      localStorage.setItem('soetr_governance', JSON.stringify(updated));
      return updated;
    });
  };

  // ------------------------------------------------------------
  // UPDATED SECTION: SUPABASE ONLY (No LocalStorage for Submissions)
  // ------------------------------------------------------------
  const addSubmission = async (submission: MockSubmission) => {
    if (submission.formType === 'Data Entry') {
      try {
        console.log("Uploading to Supabase...", submission.id);
        
        const { error } = await supabase
          .from('Data Entry Form')
          .insert([
            {
              ref_no: submission.id,
              enrollment_no: submission.data.enrollmentNo,
              name: submission.data.name,
              father_name: submission.data.fatherName,
              mother_name: submission.data.motherName,
              programme: submission.data.programme,
              session: submission.data.session,
              year: submission.data.year,
              semester: submission.data.semester,
              mobile: submission.data.mobile,
              whatsapp: submission.data.whatsapp,
              email: submission.data.email,
              address: submission.data.address,
              pin_code: submission.data.pinCode,
              photo_url: submission.data.photoUrl,
              edu_details: submission.data.eduDetails
            }
          ]);

        if (error) {
          alert("Database Error: " + error.message);
        } else {
          // Success! Refresh the list from the server to ensure we have the latest data
          await fetchSubmissions(); 
        }
      } catch (err) {
        console.error("Upload failed:", err);
        alert("Upload failed. Check console for details.");
      }
    } else {
      // For other form types (Mock/Testing), we just update state without DB
      setSubmissions(prev => [submission, ...prev]);
    }
  };

  const deleteSubmission = async (id: string) => {
    // 1. Delete from Supabase
    try {
      const { error } = await supabase
        .from('Data Entry Form')
        .delete()
        .eq('ref_no', id); // We use ref_no as the unique ID in DB

      if (error) {
        console.error("Delete failed:", error.message);
        alert("Could not delete from database.");
        return;
      }
      
      // 2. If successful, update UI
      setSubmissions(prev => prev.filter(s => s.id !== id));
      
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const markSubmissionAsRead = (id: string) => {
    // Note: Since 'is_read' isn't in your SQL table yet, we only update UI state locally for now.
    // If you add an 'is_read' column to Supabase later, you can add the .update() call here.
    setSubmissions(prev => prev.map(s => s.id === id ? { ...s, isRead: true } : s));
  };

  const generateRefNo = () => {
    const year = new Date().getFullYear();
    const formatted = String(refCounter).padStart(3, '0');
    const newRef = `KKU/SOETR/${year}/${formatted}`;
    
    const nextVal = refCounter + 1;
    setRefCounter(nextVal);
    localStorage.setItem('soetr_ref_counter', JSON.stringify(nextVal));
    
    return newRef;
  };

  const getSchoolEnrollmentCount = (schoolName: string) => {
    return submissions.filter(s => s.formType === 'Internship Letter' && s.school === schoolName).length;
  };

  const updateHeaderAlerts = (alerts: HeaderAlert[]) => {
    setHeaderAlerts(alerts);
    localStorage.setItem('soetr_header_alerts', JSON.stringify(alerts));
  };

  return (
    <AuthContext.Provider value={{ 
      user, login, logout, 
      dataRecords, addDataRecord, deleteDataRecord,
      adminUsers,
      uploadedContent, publishContent, deleteContent,
      formTimelines, updateFormTimeline, updateAllFormTimelines, isFormOpen,
      officialSignatures, updateOfficialSignatures,
      galleryImages: galleryImages.length > 0 ? galleryImages : DEFAULT_GALLERY,
      addGalleryImage, deleteGalleryImage,
      governingBody, addGoverningMember, updateGoverningMember, deleteGoverningMember,
      submissions, addSubmission, deleteSubmission, markSubmissionAsRead, generateRefNo, getSchoolEnrollmentCount,
      headerAlerts, updateHeaderAlerts
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};