
import React, { useState } from 'react';
import { User, UserRole, AttendanceRecord, AttendanceStatus } from '../types';

interface AttendancePageProps {
  user: User;
  records: AttendanceRecord[];
  onMarkAttendance: (records: AttendanceRecord[]) => void;
}

const AttendancePage: React.FC<AttendancePageProps> = ({ user, records, onMarkAttendance }) => {
  const [selectedClass, setSelectedClass] = useState('Grade 1');
  const [activeTab, setActiveTab] = useState<'view' | 'mark'>('view');

  // Mock student list for teachers
  const mockStudents = [
    { id: 's1', fullName: 'Adebayo Tunde', studentClass: 'Grade 1' },
    { id: 's2', fullName: 'Sarah Phillips', studentClass: 'Grade 1' },
    { id: 's3', fullName: 'Michael Chen', studentClass: 'Grade 1' },
    { id: 's4', fullName: 'Grace Ojo', studentClass: 'Grade 1' },
  ];

  const [attendanceDraft, setAttendanceDraft] = useState<Record<string, AttendanceStatus>>(
    Object.fromEntries(mockStudents.map(s => [s.id, AttendanceStatus.PRESENT]))
  );

  const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
    setAttendanceDraft(prev => ({ ...prev, [studentId]: status }));
  };

  const submitAttendance = () => {
    const today = new Date().toLocaleDateString('en-GB');
    const newRecords: AttendanceRecord[] = mockStudents.map(s => ({
      id: `${s.id}-${Date.now()}`,
      userId: s.id,
      userName: s.fullName,
      userRole: UserRole.STUDENT,
      userClass: s.studentClass,
      date: today,
      status: attendanceDraft[s.id],
      markedBy: user.fullName,
      timestamp: new Date().toLocaleTimeString()
    }));
    onMarkAttendance(newRecords);
    setActiveTab('view');
    alert('Attendance recorded successfully!');
  };

  const handleStaffClockIn = () => {
    const today = new Date().toLocaleDateString('en-GB');
    const record: AttendanceRecord = {
      id: `staff-${user.username}-${Date.now()}`,
      userId: user.username,
      userName: user.fullName,
      userRole: user.role,
      date: today,
      status: AttendanceStatus.PRESENT,
      markedBy: 'System Self-Check',
      timestamp: new Date().toLocaleTimeString()
    };
    onMarkAttendance([record]);
    alert('You have clocked in for today!');
  };

  const userRecords = records.filter(r => 
    r.userId === user.username || 
    (user.role === UserRole.PARENT && r.userName === 'Adebayo Tunde') // Example logic for parent
  );

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h2 className="text-4xl font-bold text-slate-900">Attendance Portal</h2>
          <p className="text-slate-600 mt-2">Manage daily presence and punctuality tracking.</p>
        </div>
        
        <div className="flex gap-2">
          {user.role === UserRole.TEACHER && (
            <div className="bg-slate-100 p-1 rounded-xl flex">
              <button 
                onClick={() => setActiveTab('view')}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'view' ? 'bg-white shadow text-slate-900' : 'text-slate-500'}`}
              >
                View Logs
              </button>
              <button 
                onClick={() => setActiveTab('mark')}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'mark' ? 'bg-white shadow text-slate-900' : 'text-slate-500'}`}
              >
                Mark Register
              </button>
            </div>
          )}
          
          {(user.role === UserRole.TEACHER || user.role === UserRole.ADMIN) && (
            <button 
              onClick={handleStaffClockIn}
              className="px-6 py-2 bg-slate-900 text-white rounded-xl font-bold hover:bg-amber-600 transition-all shadow-lg text-sm"
            >
              Staff Clock-In
            </button>
          )}
        </div>
      </div>

      {activeTab === 'mark' && user.role === UserRole.TEACHER ? (
        <div className="glass-effect rounded-3xl border border-slate-100 overflow-hidden animate-in fade-in duration-300">
          <div className="p-6 border-b bg-slate-50 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-slate-900">Class Register: {selectedClass}</h3>
              <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mt-1">Date: {new Date().toLocaleDateString('en-GB')}</p>
            </div>
            <select 
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-4 py-2 bg-white border rounded-xl text-sm font-bold outline-none"
            >
              <option>Grade 1</option>
              <option>Grade 2</option>
              <option>JSS 1</option>
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-[10px] uppercase font-bold text-slate-400 border-b">
                <tr>
                  <th className="px-6 py-4">Student Name</th>
                  <th className="px-6 py-4 text-center">Present</th>
                  <th className="px-6 py-4 text-center">Absent</th>
                  <th className="px-6 py-4 text-center">Late</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {mockStudents.map(student => (
                  <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-900">{student.fullName}</p>
                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">{student.studentClass}</p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <input 
                        type="radio" 
                        name={`status-${student.id}`} 
                        checked={attendanceDraft[student.id] === AttendanceStatus.PRESENT}
                        onChange={() => handleStatusChange(student.id, AttendanceStatus.PRESENT)}
                        className="w-5 h-5 accent-green-600"
                      />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <input 
                        type="radio" 
                        name={`status-${student.id}`} 
                        checked={attendanceDraft[student.id] === AttendanceStatus.ABSENT}
                        onChange={() => handleStatusChange(student.id, AttendanceStatus.ABSENT)}
                        className="w-5 h-5 accent-red-600"
                      />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <input 
                        type="radio" 
                        name={`status-${student.id}`} 
                        checked={attendanceDraft[student.id] === AttendanceStatus.LATE}
                        onChange={() => handleStatusChange(student.id, AttendanceStatus.LATE)}
                        className="w-5 h-5 accent-amber-600"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-6 bg-slate-50 border-t flex justify-end">
             <button 
              onClick={submitAttendance}
              className="px-10 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-green-600 transition-all shadow-xl"
             >
               Save Today's Register
             </button>
          </div>
        </div>
      ) : (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-effect p-8 rounded-3xl border shadow-sm border-l-8 border-l-green-500">
               <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Punctuality Score</p>
               <h3 className="text-3xl font-black text-slate-900">94%</h3>
               <p className="text-xs text-green-600 font-bold mt-2">Excellent consistency!</p>
            </div>
            <div className="glass-effect p-8 rounded-3xl border shadow-sm border-l-8 border-l-amber-500">
               <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Present</p>
               <h3 className="text-3xl font-black text-slate-900">{userRecords.length}</h3>
               <p className="text-xs text-slate-500 font-bold mt-2">Days recorded this term</p>
            </div>
            <div className="glass-effect p-8 rounded-3xl border shadow-sm border-l-8 border-l-blue-500">
               <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Last Recorded</p>
               <h3 className="text-xl font-black text-slate-900">{userRecords[0]?.date || 'No logs'}</h3>
               <p className="text-xs text-slate-500 font-bold mt-2">Session: 2023/24</p>
            </div>
          </div>

          <div className="glass-effect rounded-3xl border shadow-sm overflow-hidden">
             <div className="p-6 border-b bg-slate-50">
               <h3 className="font-bold text-slate-900 uppercase tracking-widest text-xs">Attendance History Logs</h3>
             </div>
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-[10px] uppercase font-bold text-slate-400 border-b">
                    <tr>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">User</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Time Marked</th>
                      <th className="px-6 py-4">Marked By</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {userRecords.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center text-slate-400 font-medium">No attendance logs found for your account.</td>
                      </tr>
                    ) : (
                      userRecords.map(r => (
                        <tr key={r.id} className="hover:bg-slate-50 transition-colors text-sm">
                          <td className="px-6 py-4 font-bold text-slate-900">{r.date}</td>
                          <td className="px-6 py-4">
                            <p className="font-bold text-slate-700">{r.userName}</p>
                            <p className="text-[10px] uppercase font-bold text-slate-400">{r.userRole}</p>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                              r.status === AttendanceStatus.PRESENT ? 'bg-green-100 text-green-700' :
                              r.status === AttendanceStatus.LATE ? 'bg-amber-100 text-amber-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {r.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-slate-500">{r.timestamp}</td>
                          <td className="px-6 py-4 text-slate-400 italic text-xs">{r.markedBy}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendancePage;
