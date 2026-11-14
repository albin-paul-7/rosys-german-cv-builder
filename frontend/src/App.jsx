import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import TemplateGallery from './components/TemplateGallery';
import ResumeEditor from './components/ResumeEditor';
import LivePreview from './components/LivePreview';
import HostDashboard from './components/HostDashboard';

import { initialRosysCvData, alternativeProfiles } from './data/sampleCvData';
import { fetchDefaultSample, saveResume } from './utils/api';
import { Eye, Edit3, CheckCircle } from 'lucide-react';

export default function App() {
  const [resumeData, setResumeData] = useState(initialRosysCvData);
  const [currentView, setCurrentView] = useState('editor'); // 'editor' | 'templates' | 'host'
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState(null);
  const [mobileTab, setMobileTab] = useState('form'); // 'form' | 'preview'

  // Attempt to fetch from backend on mount
  useEffect(() => {
    async function loadInitial() {
      try {
        const remoteSample = await fetchDefaultSample();
        if (remoteSample) {
          setResumeData(remoteSample);
        }
      } catch (err) {
        console.log('Using local initial data', err);
      }
    }
    loadInitial();
  }, []);

  const showNotification = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await saveResume(resumeData);
      if (res && res.success) {
        showNotification('CV saved & submitted! Available in Host Portal for download.');
      } else {
        showNotification('Saved locally to browser session', 'info');
      }
    } catch (err) {
      showNotification('Saved locally to browser session', 'info');
    } finally {
      setIsSaving(false);
    }
  };

  const handleLoadSample = (sampleType) => {
    if (sampleType === 'default') {
      setResumeData(initialRosysCvData);
      showNotification('Loaded Gopika Jayaram (Official Cardiology sample)');
    } else if (sampleType === 'icu') {
      setResumeData(alternativeProfiles.icuNurse);
      showNotification('Loaded Rahul Nair (ICU Nurse Specialist)');
    }
  };

  const handleReset = () => {
    setResumeData({
      ...initialRosysCvData,
      id: `student-cv-${Date.now()}`,
      personalData: {
        lastName: '',
        firstName: '',
        dateOfBirth: '',
        placeOfBirth: '',
        countryOfOrigin: 'Indien',
        qualification: 'Bachelor of Science (Nursing)',
        yearsOfExperience: '',
        languageProficiency: 'Deutsch B2',
        startDate: 'Sofort verfügbar',
        photoUrl: ''
      },
      assessment: {
        title: "Einschätzung Rosy's German School",
        paragraphs: [
          "Bewerberin verfügt über praktische Berufserfahrung im klinischen Pflegebereich...",
          "Zu ihren Kompetenzen gehören Verantwortungsbewusstsein, Teamfähigkeit und fundierte Deutschkenntnisse."
        ]
      },
      experience: [
        {
          id: 'exp-new-1',
          period: '01/2024 – Heute',
          role: 'Pflegefachkraft',
          facility: 'im Hospital / Klinikum',
          tasks: ['Ganzheitliche pflegerische Betreuung von Patientinnen und Patienten']
        }
      ]
    });
    showNotification('Form reset to blank candidate template', 'info');
  };

  const handleSelectTemplate = (templateId) => {
    setResumeData((prev) => ({
      ...prev,
      template: templateId
    }));
  };

  const handleSelectResumeFromHost = (fullResume) => {
    setResumeData(fullResume);
    setCurrentView('editor');
    showNotification(`Opened ${fullResume.personalData?.lastName || 'Student'}'s CV in Editor`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-800">
      {/* Navbar */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        onLoadSample={handleLoadSample}
        onSave={handleSave}
        isSaving={isSaving}
        onReset={handleReset}
        resumeData={resumeData}
      />

      {/* Floating Notification */}
      {notification && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-lg shadow-xl text-xs font-semibold animate-bounce">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{notification.msg}</span>
        </div>
      )}

      {/* Main Body */}
      {currentView === 'host' ? (
        <div className="flex-1 overflow-y-auto">
          <HostDashboard
            onSelectResumeForEdit={handleSelectResumeFromHost}
            onBackToEditor={() => setCurrentView('editor')}
          />
        </div>
      ) : currentView === 'templates' ? (
        <div className="flex-1 overflow-y-auto">
          <TemplateGallery
            selectedTemplate={resumeData.template}
            onSelectTemplate={handleSelectTemplate}
            onContinueToEditor={() => setCurrentView('editor')}
          />
        </div>
      ) : (
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
          {/* Mobile view toggle */}
          <div className="lg:hidden flex border-b border-slate-300 bg-white">
            <button
              type="button"
              onClick={() => setMobileTab('form')}
              className={`flex-1 py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 ${
                mobileTab === 'form' ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600' : 'text-slate-600'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              Editor Form
            </button>
            <button
              type="button"
              onClick={() => setMobileTab('preview')}
              className={`flex-1 py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 ${
                mobileTab === 'preview' ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600' : 'text-slate-600'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              Live Preview (A4)
            </button>
          </div>

          {/* Left: Resume Editor Form (Desktop: 44% width) */}
          <div
            className={`w-full lg:w-[48%] xl:w-[44%] h-[calc(100vh-4rem)] flex flex-col ${
              mobileTab === 'preview' ? 'hidden lg:flex' : 'flex'
            }`}
          >
            <ResumeEditor
              resumeData={resumeData}
              onChange={setResumeData}
            />
          </div>

          {/* Right: Live Real-Time A4 Preview (Desktop: Remaining width) */}
          <div
            className={`w-full lg:flex-1 h-[calc(100vh-4rem)] flex flex-col ${
              mobileTab === 'form' ? 'hidden lg:flex' : 'flex'
            }`}
          >
            <LivePreview
              resumeData={resumeData}
              onUpdateTemplate={handleSelectTemplate}
            />
          </div>
        </div>
      )}
    </div>
  );
}
