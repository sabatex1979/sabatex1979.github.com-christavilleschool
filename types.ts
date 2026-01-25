
export enum SchoolLevel {
  NURSERY = 'Nursery',
  GRADE = 'Grade',
  JUNIOR_SECONDARY = 'Junior Secondary',
  SENIOR_SECONDARY = 'Senior Secondary'
}

export enum UserRole {
  STUDENT = 'Student',
  PARENT = 'Parent',
  TEACHER = 'Teacher',
  ADMIN = 'Admin'
}

export enum AttendanceStatus {
  PRESENT = 'Present',
  ABSENT = 'Absent',
  LATE = 'Late'
}

export interface User {
  username: string;
  role: UserRole;
  fullName: string;
  email?: string;
  phone?: string;
  age?: number;
  studentClass?: string;
  isAuthorized: boolean;
  registrationDate: string;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface Subject {
  id: string;
  name: string;
  level: SchoolLevel;
  icon: string;
  questions: Question[];
}

export interface SchoolConfig {
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  schoolName: string;
  address: string;
  email: string;
  phone: string;
}

export interface Message {
  role: 'user' | 'model';
  content: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  avatar: string;
}

export interface Meeting {
  id: string;
  title: string;
  teacherName: string;
  startTime: string;
  duration: string;
  status: 'live' | 'upcoming' | 'ended';
  meetingId: string;
  password?: string;
}

export interface ChatMessage {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
  role: UserRole;
}

export interface ExamResult {
  id: string;
  studentName: string;
  studentClass: string;
  subjectName: string;
  subjectLevel: SchoolLevel;
  score: number;
  totalQuestions: number;
  percentage: number;
  grade: string;
  date: string;
  pin: string;
}

export interface AttendanceRecord {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  userClass?: string;
  date: string;
  status: AttendanceStatus;
  markedBy: string;
  timestamp: string;
}
