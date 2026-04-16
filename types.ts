
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

export enum TaskType {
  HOMEWORK = 'Homework',
  TEST = 'Test',
  EXAM = 'Exam'
}

/* Added missing AttendanceStatus enum */
export enum AttendanceStatus {
  PRESENT = 'Present',
  ABSENT = 'Absent',
  LATE = 'Late'
}

export interface LearningMaterial {
  id: string;
  title: string;
  type: 'Note' | 'Video' | 'PDF';
  content: string;
  url?: string;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  taskType?: TaskType;
}

export enum Curriculum {
  BRITISH = 'British',
  NIGERIAN = 'Nigerian'
}

export interface Subject {
  id: string;
  name: string;
  level: SchoolLevel;
  curriculum: Curriculum;
  icon: string;
  questions: Question[]; // Default to Exam
  homework: Question[];
  tests: Question[];
  materials: LearningMaterial[];
}

export interface LibraryResource {
  id: string;
  title: string;
  author: string;
  level: SchoolLevel;
  category: string;
  coverImage: string;
  readUrl: string;
}

export interface User {
  username: string;
  role: UserRole;
  fullName: string;
  email?: string;
  phone?: string;
  address?: string;
  age?: number;
  studentClass?: string;
  isAuthorized: boolean;
  registrationDate: string;
}

export interface SchoolConfig {
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  schoolName: string;
  address: string;
  email: string;
  phone: string;
  feesAmount: string;
  feesBank: string;
  feesAccountType: string;
  feesAccountNumber: string;
  feesReceiptEmail: string;
}

export interface Message {
  role: 'user' | 'model';
  content: string;
}

export interface ExamResult {
  id: string;
  studentName: string;
  studentClass: string;
  subjectName: string;
  subjectLevel: SchoolLevel;
  taskType: TaskType;
  score: number;
  totalQuestions: number;
  percentage: number;
  grade: string;
  date: string;
  pin: string;
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

/* Added missing Testimonial and AttendanceRecord interfaces */
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
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
