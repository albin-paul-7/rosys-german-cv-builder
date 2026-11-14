import React, { useState, useEffect } from 'react';
import { 
  Users, 
  FileText, 
  FileSpreadsheet, 
  Search, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  RefreshCw,
  ArrowLeft,
  ShieldCheck,
  FileDown,
  Lock,
  KeyRound,
  LogOut,
  AlertCircle
} from 'lucide-react';
import { 
  fetchSavedResumes, 
  fetchResumeById, 
  loginAsHost, 
  isHostAuthenticated, 
  clearHostToken 
} from '../utils/api';
import { downloadCvPdf } from '../utils/pdfExport';
import { downloadCvDocx } from '../utils/docxExport';

export default function HostDashboard({ onSelectResumeForEdit, onBackToEditor }) {
  const [isAuthenticated, setIsAuthenticated] = useState(isHostAuthenticated());
  const [pinInput, setPinInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isSubmittingPin, setIsSubmittingPin] = useState(false);

  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [actionMessage, setActionMessage] = useState('');

  const loadData = async () => {
    setLoading(true);
    try {
      const result = await fetchSavedResumes();
      if (result.unauthorized) {
        setIsAuthenticated(false);
      } else {
        setResumes(result.resumes || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setIsSubmittingPin(true);
    try {
      const res = await loginAsHost(pinInput);
      if (res.success) {
        setIsAuthenticated(true);
        setPinInput('');
      } else {
        setLoginError(res.error || 'Access denied: Incorrect Host PIN');
      }
    } catch (err) {
      setLoginError('Authentication failed. Please verify credentials.');
    } finally {
      setIsSubmittingPin(false);
    }
  };

  const handleLogout = () => {
    clearHostToken();
    setIsAuthenticated(false);
    setResumes([]);
  };

  const handleDownloadPdf = async (resumeItem) => {
    setActionMessage(`Preparing PDF for ${resumeItem.name}...`);
    try {
      const fullResume = await fetchResumeById(resumeItem.id);
      if (fullResume) {
        await downloadCvPdf(fullResume);
        setActionMessage(`PDF downloaded for ${resumeItem.name}!`);
      }
    } catch (err) {
      console.error(err);
      setActionMessage('Failed to download PDF');
    } finally {
      setTimeout(() => setActionMessage(''), 2500);
    }
  };

  const handleDownloadDocx = async (resumeItem) => {
    setActionMessage(`Preparing Word (.docx) for ${resumeItem.name}...`);
    try {
      const fullResume = await fetchResumeById(resumeItem.id);
      if (fullResume) {
        await downloadCvDocx(fullResume);
        setActionMessage(`Word file downloaded for ${resumeItem.name}!`);
      }
    } catch (err) {
      console.error(err);
      setActionMessage('Failed to download Word document');
    } finally {
      setTimeout(() => setActionMessage(''), 2500);
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}'s CV?`)) {
      try {
        const token = sessionStorage.getItem('rosys_host_token') || '';
        await fetch(`/api/resumes/${id}`, { 
          method: 'DELETE',
          headers: { 'x-host-token': token }
        });
        setResumes(prev => prev.filter(r => r.id !== id));
        setActionMessage(`${name}'s CV deleted`);
        setTimeout(() => setActionMessage(''), 2500);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleEditStudent = async (id) => {
    const fullResume = await fetchResumeById(id);
    if (fullResume) {
      onSelectResumeForEdit(fullResume);
    }
  };

  // If NOT authenticated, show Host Security Verification Gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-200 p-8 text-center">
          <div className="w-14 h-14 bg-amber-50 border border-amber-200 text-amber-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xs">
            <Lock className="w-7 h-7" />
          </div>

          <h2 className="text-xl font-black text-slate-900 tracking-tight mb-1">
            Host Access Verification
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed mb-6">
            Only the administrator / host of Rosy's German School can view and download other students' CV dossiers. Students are strictly restricted to their own CV.
          </p>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                Enter Host Passcode / PIN
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Enter Host PIN..."
                  autoFocus
                  required
                  className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1.5">
                Default Host PIN: <code className="bg-slate-100 text-slate-700 px-1 py-0.5 rounded font-bold">rosys1971</code>
              </p>
            </div>

            {loginError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmittingPin}
              className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 disabled:opacity-60 text-white text-xs font-bold rounded-lg shadow-sm transition flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>{isSubmittingPin ? 'Verifying...' : 'Unlock Host Portal'}</span>
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onBackToEditor}
              className="text-xs text-slate-500 hover:text-slate-800 font-semibold inline-flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Return to Student CV Studio
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Filtered resumes
  const filtered = resumes.filter(r => {
    const matchesSearch = 
      (r.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.role || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = levelFilter === 'all' || (r.languageLevel || '').includes(levelFilter);
    return matchesSearch && matchesLevel;
  });

  const b2Count = resumes.filter(r => (r.languageLevel || '').includes('B2')).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Bar with Back Navigation & Host Logout */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <button
            type="button"
            onClick={onBackToEditor}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 mb-2 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Student CV Studio
          </button>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Host Admin Dashboard
            </h1>
            <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-amber-700" />
              Host Authenticated
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Confidential: Manage, review, and download student healthcare CVs in both PDF and Word (.docx) formats.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={loadData}
            disabled={loading}
            className="flex items-center gap-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold px-3.5 py-2 rounded-lg shadow-xs transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh List
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-1.5 bg-rose-50 border border-rose-200 hover:bg-rose-100 text-rose-700 text-xs font-bold px-3 py-2 rounded-lg transition"
            title="Lock Host Portal"
          >
            <LogOut className="w-3.5 h-3.5" />
            Lock Portal
          </button>
        </div>
      </div>

      {/* Action toast message */}
      {actionMessage && (
        <div className="mb-6 p-3 bg-slate-900 text-white text-xs font-semibold rounded-lg flex items-center gap-2 shadow-md animate-pulse">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{actionMessage}</span>
        </div>
      )}

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Student CVs</p>
            <p className="text-2xl font-black text-slate-900 mt-1">{resumes.length}</p>
          </div>
          <div className="w-11 h-11 bg-blue-50 text-blue-700 rounded-lg flex items-center justify-center font-bold">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">B2 Certified Nurses</p>
            <p className="text-2xl font-black text-rose-600 mt-1">{b2Count}</p>
          </div>
          <div className="w-11 h-11 bg-rose-50 text-rose-700 rounded-lg flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Host Download Formats</p>
            <p className="text-sm font-bold text-slate-800 mt-1">PDF & Microsoft Word (.docx)</p>
          </div>
          <div className="w-11 h-11 bg-amber-50 text-amber-700 rounded-lg flex items-center justify-center font-bold">
            <FileDown className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex-1 min-w-[260px] relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search student by name, qualification, or hospital..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-500">German Level:</span>
          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className="text-xs border border-slate-300 rounded-lg px-3 py-2 bg-slate-50 font-semibold focus:outline-none"
          >
            <option value="all">All Levels</option>
            <option value="B2">Deutsch B2</option>
            <option value="B1">Deutsch B1</option>
            <option value="C1">Deutsch C1</option>
          </select>
        </div>
      </div>

      {/* Submissions Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">Student Candidate</th>
                <th className="py-3.5 px-4">Qualification / Role</th>
                <th className="py-3.5 px-4">German Level</th>
                <th className="py-3.5 px-4">Experience</th>
                <th className="py-3.5 px-4">Target Start</th>
                <th className="py-3.5 px-4">Last Updated</th>
                <th className="py-3.5 px-4 text-right">Host Actions (Download)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    Loading student CVs...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No student submissions found matching your filters.
                  </td>
                </tr>
              ) : (
                filtered.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3.5 px-4 font-semibold text-slate-900">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-slate-200 border border-slate-300 overflow-hidden flex-shrink-0 flex items-center justify-center font-bold text-slate-600 text-[10px]">
                          {r.photoUrl ? (
                            <img src={r.photoUrl} alt="Photo" className="w-full h-full object-cover" />
                          ) : (
                            r.firstName?.[0] || 'S'
                          )}
                        </div>
                        <div>
                          <div className="text-slate-900 font-bold">{r.lastName}, {r.firstName}</div>
                          <div className="text-[10px] text-slate-400 font-normal">ID: {r.id.slice(0, 16)}...</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 font-medium">{r.role}</td>
                    <td className="py-3.5 px-4">
                      <span className="inline-block bg-rose-50 text-rose-700 border border-rose-200 px-2 py-0.5 rounded font-bold text-[11px]">
                        {r.languageLevel}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">{r.yearsOfExperience}</td>
                    <td className="py-3.5 px-4 text-slate-600">{r.startDate}</td>
                    <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                      {new Date(r.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Download PDF button */}
                        <button
                          type="button"
                          onClick={() => handleDownloadPdf(r)}
                          title="Download Student CV as PDF"
                          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] px-2.5 py-1.5 rounded flex items-center gap-1 shadow-xs transition"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>PDF</span>
                        </button>

                        {/* Download Word button */}
                        <button
                          type="button"
                          onClick={() => handleDownloadDocx(r)}
                          title="Download Student CV as Microsoft Word (.docx)"
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] px-2.5 py-1.5 rounded flex items-center gap-1 shadow-xs transition"
                        >
                          <FileSpreadsheet className="w-3.5 h-3.5" />
                          <span>Word</span>
                        </button>

                        {/* Review / Edit in Builder */}
                        <button
                          type="button"
                          onClick={() => handleEditStudent(r.id)}
                          title="Open in Builder to review or edit"
                          className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded transition"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        {/* Delete */}
                        <button
                          type="button"
                          onClick={() => handleDelete(r.id, r.name)}
                          title="Delete CV submission"
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
