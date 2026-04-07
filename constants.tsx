
import { SchoolLevel, Subject, Question, SchoolConfig, Testimonial, Meeting, TaskType, LearningMaterial, LibraryResource } from './types';

const generateMaterials = (subjectName: string, topics: string[]): LearningMaterial[] => {
  return topics.map((topic, index) => ({
    id: `m-${subjectName}-${index}`,
    title: topic,
    type: index % 3 === 0 ? 'Note' : index % 3 === 1 ? 'Video' : 'PDF',
    content: `Comprehensive study guide for ${topic} in ${subjectName}. This module covers the core objectives, definitions, and practical examples required for term mastery.`,
    url: index % 3 === 1 ? 'https://vimeo.com/705816503' : '#'
  }));
};

const SUBJECT_TOPICS: Record<string, string[]> = {
  'Literacy': ['Phonics', 'Vocabulary', 'Sentence Structure', 'Reading Comprehension'],
  'Numeracy': ['Addition', 'Subtraction', 'Number Patterns', 'Shapes'],
  'Arts': ['Colors', 'Drawing Techniques', 'Art History', 'Creative Expression'],
  'Mathematics': ['Algebra', 'Geometry', 'Arithmetic', 'Statistics', 'Calculus', 'Trigonometry'],
  'English': ['Grammar', 'Comprehension', 'Vocabulary', 'Essay Writing', 'Literature Analysis'],
  'Science': ['Biology', 'Chemistry', 'Physics', 'Environmental Science'],
  'Social Studies': ['History', 'Geography', 'Civics', 'Culture'],
  'ICT': ['Hardware', 'Software', 'Networking', 'Programming Basics'],
  'Business': ['Accounting', 'Marketing', 'Management', 'Economics'],
  'Physics': ['Mechanics', 'Thermodynamics', 'Electromagnetism', 'Optics'],
  'Chemistry': ['Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry', 'Analytical Chemistry'],
  'Biology': ['Cell Biology', 'Genetics', 'Physiology', 'Ecology']
};

const generateTaskQuestions = (subjectName: string, type: TaskType, count: number = 10): Question[] => {
  const q: Question[] = [];
  const topics = SUBJECT_TOPICS[subjectName] || ['General Knowledge'];
  for (let i = 1; i <= count; i++) {
    const topic = topics[i % topics.length];
    q.push({
      id: `${subjectName}-${type}-${i}`,
      text: `${type} Question ${i}: Regarding ${topic}, which of the following statements is most accurate?`,
      options: [`Option A for ${topic}`, `Option B for ${topic}`, `Option C for ${topic}`, `Option D for ${topic}`],
      correctAnswer: i % 4,
      taskType: type
    });
  }
  return q;
};

const generateAcademicQuestions = (subjectName: string, level: SchoolLevel, count: number = 20): Question[] => {
  const result: Question[] = [];
  const topics = SUBJECT_TOPICS[subjectName] || ['General Knowledge'];
  for (let i = 1; i <= count; i++) {
    const topic = topics[i % topics.length];
    result.push({
      id: `${level}-${subjectName}-Exam-${i}`,
      text: `Exam Question ${i} for ${subjectName} (${level}): Which principle best applies to the study of ${topic}?`,
      options: [`Principle of ${topic} A`, `Principle of ${topic} B`, `Principle of ${topic} C`, `Principle of ${topic} D`],
      correctAnswer: (i % 4),
      taskType: TaskType.EXAM
    });
  }
  return result;
};

export const SUBJECTS: Subject[] = [
  // NURSERY
  { 
    id: 'n-lit', name: 'Literacy & Phonics', level: SchoolLevel.NURSERY, icon: '📚', 
    questions: generateAcademicQuestions('Literacy', SchoolLevel.NURSERY, 15),
    homework: generateTaskQuestions('Literacy', TaskType.HOMEWORK, 5),
    tests: generateTaskQuestions('Literacy', TaskType.TEST, 10),
    materials: generateMaterials('Literacy', ['The Alphabet Song', 'Vowel Sounds', 'Three Letter Words', 'Simple Sentences'])
  },
  { 
    id: 'n-num', name: 'Numeracy & Shapes', level: SchoolLevel.NURSERY, icon: '🔢', 
    questions: generateAcademicQuestions('Numeracy', SchoolLevel.NURSERY, 15),
    homework: generateTaskQuestions('Numeracy', TaskType.HOMEWORK, 5),
    tests: generateTaskQuestions('Numeracy', TaskType.TEST, 10),
    materials: generateMaterials('Numeracy', ['Counting 1-20', 'Basic Addition', 'Identifying Circles & Squares', 'Number Rhymes'])
  },
  { 
    id: 'n-cre', name: 'Creative Arts', level: SchoolLevel.NURSERY, icon: '🎨', 
    questions: generateAcademicQuestions('Arts', SchoolLevel.NURSERY, 10),
    homework: generateTaskQuestions('Arts', TaskType.HOMEWORK, 3),
    tests: generateTaskQuestions('Arts', TaskType.TEST, 5),
    materials: generateMaterials('Creative Arts', ['Primary Colors', 'Hand Painting', 'Paper Folding', 'Drawing My Family'])
  },

  // GRADE
  { 
    id: 'g-mat', name: 'Mathematics', level: SchoolLevel.GRADE, icon: '📐', 
    questions: generateAcademicQuestions('Mathematics', SchoolLevel.GRADE, 30),
    homework: generateTaskQuestions('Mathematics', TaskType.HOMEWORK, 10),
    tests: generateTaskQuestions('Mathematics', TaskType.TEST, 15),
    materials: generateMaterials('Mathematics', ['Long Division', 'Fractions & Decimals', 'Introduction to Algebra', 'Measurement of Perimeter'])
  },
  { 
    id: 'g-eng', name: 'English Language', level: SchoolLevel.GRADE, icon: '📖', 
    questions: generateAcademicQuestions('English', SchoolLevel.GRADE, 30),
    homework: generateTaskQuestions('English', TaskType.HOMEWORK, 10),
    tests: generateTaskQuestions('English', TaskType.TEST, 15),
    materials: generateMaterials('English', ['Parts of Speech', 'Punctuation Rules', 'Letter Writing', 'Comprehension Skills'])
  },
  { 
    id: 'g-sci', name: 'Basic Science', level: SchoolLevel.GRADE, icon: '🧪', 
    questions: generateAcademicQuestions('Science', SchoolLevel.GRADE, 25),
    homework: generateTaskQuestions('Science', TaskType.HOMEWORK, 8),
    tests: generateTaskQuestions('Science', TaskType.TEST, 12),
    materials: generateMaterials('Basic Science', ['The Human Body', 'Living & Non-living Things', 'Energy Forms', 'Simple Machines'])
  },
  { 
    id: 'g-soc', name: 'Social Studies', level: SchoolLevel.GRADE, icon: '🌍', 
    questions: generateAcademicQuestions('Social Studies', SchoolLevel.GRADE, 20),
    homework: generateTaskQuestions('Social Studies', TaskType.HOMEWORK, 5),
    tests: generateTaskQuestions('Social Studies', TaskType.TEST, 10),
    materials: generateMaterials('Social Studies', ['Our Culture', 'Civic Responsibilities', 'Transport Systems', 'Family Values'])
  },

  // JUNIOR SECONDARY
  { 
    id: 'j-mat', name: 'Mathematics', level: SchoolLevel.JUNIOR_SECONDARY, icon: '📊', 
    questions: generateAcademicQuestions('Mathematics', SchoolLevel.JUNIOR_SECONDARY, 40),
    homework: generateTaskQuestions('Mathematics', TaskType.HOMEWORK, 15),
    tests: generateTaskQuestions('Mathematics', TaskType.TEST, 20),
    materials: generateMaterials('Mathematics', ['Linear Equations', 'Pythagoras Theorem', 'Probability Theory', 'Set Theory Fundamentals'])
  },
  { 
    id: 'j-ict', name: 'Computer Science (ICT)', level: SchoolLevel.JUNIOR_SECONDARY, icon: '💻', 
    questions: generateAcademicQuestions('ICT', SchoolLevel.JUNIOR_SECONDARY, 30),
    homework: generateTaskQuestions('ICT', TaskType.HOMEWORK, 10),
    tests: generateTaskQuestions('ICT', TaskType.TEST, 15),
    materials: generateMaterials('ICT', ['Hardware vs Software', 'Operating Systems', 'Safe Internet Usage', 'Basic HTML/Coding'])
  },
  { 
    id: 'j-bus', name: 'Business Studies', level: SchoolLevel.JUNIOR_SECONDARY, icon: '💹', 
    questions: generateAcademicQuestions('Business', SchoolLevel.JUNIOR_SECONDARY, 30),
    homework: generateTaskQuestions('Business', TaskType.HOMEWORK, 10),
    tests: generateTaskQuestions('Business', TaskType.TEST, 15),
    materials: generateMaterials('Business Studies', ['Office Procedures', 'Double Entry Bookkeeping', 'Market Systems', 'Consumer Protection'])
  },

  // SENIOR SECONDARY
  { 
    id: 's-mat', name: 'Mathematics', level: SchoolLevel.SENIOR_SECONDARY, icon: '📐', 
    questions: generateAcademicQuestions('Mathematics', SchoolLevel.SENIOR_SECONDARY, 50),
    homework: generateTaskQuestions('Mathematics', TaskType.HOMEWORK, 20),
    tests: generateTaskQuestions('Mathematics', TaskType.TEST, 25),
    materials: generateMaterials('Mathematics', ['Calculus Basics', 'Trigonometry Identities', 'Statistics & Data Analysis', 'Coordinate Geometry'])
  },
  { 
    id: 's-phy', name: 'Physics', level: SchoolLevel.SENIOR_SECONDARY, icon: '⚡', 
    questions: generateAcademicQuestions('Physics', SchoolLevel.SENIOR_SECONDARY, 40),
    homework: generateTaskQuestions('Physics', TaskType.HOMEWORK, 15),
    tests: generateTaskQuestions('Physics', TaskType.TEST, 20),
    materials: generateMaterials('Physics', ['Mechanics & Motion', 'Waves & Optics', 'Electricity & Magnetism', 'Atomic Physics'])
  },
  { 
    id: 's-che', name: 'Chemistry', level: SchoolLevel.SENIOR_SECONDARY, icon: '🧪', 
    questions: generateAcademicQuestions('Chemistry', SchoolLevel.SENIOR_SECONDARY, 40),
    homework: generateTaskQuestions('Chemistry', TaskType.HOMEWORK, 15),
    tests: generateTaskQuestions('Chemistry', TaskType.TEST, 20),
    materials: generateMaterials('Chemistry', ['Organic Chemistry', 'Chemical Bonding', 'Stoichiometry', 'Electrochemistry'])
  },
  { 
    id: 's-bio', name: 'Biology', level: SchoolLevel.SENIOR_SECONDARY, icon: '🧬', 
    questions: generateAcademicQuestions('Biology', SchoolLevel.SENIOR_SECONDARY, 40),
    homework: generateTaskQuestions('Biology', TaskType.HOMEWORK, 15),
    tests: generateTaskQuestions('Biology', TaskType.TEST, 20),
    materials: generateMaterials('Biology', ['Cell Biology', 'Genetics & Evolution', 'Plant & Animal Physiology', 'Ecology'])
  },
  { 
    id: 's-eng', name: 'English Language', level: SchoolLevel.SENIOR_SECONDARY, icon: '📝', 
    questions: generateAcademicQuestions('English', SchoolLevel.SENIOR_SECONDARY, 40),
    homework: generateTaskQuestions('English', TaskType.HOMEWORK, 15),
    tests: generateTaskQuestions('English', TaskType.TEST, 20),
    materials: generateMaterials('English', ['Advanced Grammar', 'Essay Writing Techniques', 'Oral English', 'Summary & Comprehension'])
  }
];

export const LIBRARY_RESOURCES: LibraryResource[] = [
  { id: 'lib1', title: 'The Phonics Adventure', author: 'Dr. Jane Smith', level: SchoolLevel.NURSERY, category: 'Reading', coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400', readUrl: '#' },
  { id: 'lib2', title: 'Advanced Grade Math', author: 'Prof. Adeyemi', level: SchoolLevel.GRADE, category: 'Mathematics', coverImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=400', readUrl: '#' },
  { id: 'lib3', title: 'Science Encyclopedia', author: 'National Science Found.', level: SchoolLevel.JUNIOR_SECONDARY, category: 'Science', coverImage: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=400', readUrl: '#' },
  { id: 'lib4', title: 'Rhyme Time Classics', author: 'Traditional', level: SchoolLevel.NURSERY, category: 'Music', coverImage: 'https://images.unsplash.com/photo-1544923246-77307dd654ca?auto=format&fit=crop&q=80&w=400', readUrl: '#' },
  { id: 'lib5', title: 'World Geography Atlas', author: 'Global Explorers', level: SchoolLevel.GRADE, category: 'Social Studies', coverImage: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=400', readUrl: '#' },
  { id: 'lib6', title: 'Greatest Short Stories', author: 'Literary Masters', level: SchoolLevel.JUNIOR_SECONDARY, category: 'Literature', coverImage: 'https://images.unsplash.com/photo-1474932430478-367dbb6832c1?auto=format&fit=crop&q=80&w=400', readUrl: '#' },
  { id: 'lib7', title: 'Coding for Kids', author: 'Tech Academy', level: SchoolLevel.GRADE, category: 'ICT', coverImage: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=400', readUrl: '#' },
  { id: 'lib8', title: 'Junior Finance Guide', author: 'Econ Experts', level: SchoolLevel.JUNIOR_SECONDARY, category: 'Finance', coverImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=400', readUrl: '#' }
];

export const INITIAL_SCHOOL_CONFIG: SchoolConfig = {
  schoolName: "MORAVIA online Education",
  heroTitle: "Nurturing Excellence, Building Future Leaders",
  heroSubtitle: "Welcome to MORAVIA online Education's digital learning hub. Empowering students with modern tools, AI tutoring, and global curricula designed for the 21st century.",
  aboutText: "MORAVIA online Education was founded with a clear vision: to create a nurturing environment where academic excellence meets profound moral integrity. Our mission is to provide an education that is not just about passing exams, but about building character, curiosity, and leadership. We integrate modern technology with traditional values to ensure every child reaches their full potential.",
  address: "76A Woji Road Rumurolu Town Port Harcourt Rivers State Nigeria",
  email: "DS.D188034@rws.com",
  phone: "+2348038316472, +2349138570035",
  feesAmount: "$150 USD",
  feesBank: "GTB",
  feesAccountType: "DOLLAR Account",
  feesAccountNumber: "0039088007",
  feesReceiptEmail: "DS.D188034@rws.com"
};

export const MOCK_MEETINGS: Meeting[] = [
  { id: 'zoom-taofeek', title: 'Primary School General Assembly', teacherName: 'SADIKU BABATUNDE TAOFEEK', startTime: 'Every Monday, 8:00 AM', duration: '60 mins', status: 'upcoming', meetingId: '378 965 7653', password: '1979' },
  { id: 'zoom-math', title: 'Advanced Math Workshop (Grade 5)', teacherName: 'Mrs. Funmi Okafor', startTime: 'Live Now', duration: '45 mins', status: 'live', meetingId: '821 445 1209', password: 'MATH' },
  { id: 'zoom-sci', title: 'Science Lab Demonstration', teacherName: 'Mr. David Wilson', startTime: 'Starts in 2 hours', duration: '60 mins', status: 'upcoming', meetingId: '992 001 8832', password: 'LABS' }
];

export const TESTIMONIALS: Testimonial[] = [
  { id: 't1', name: 'Mrs. Oluchi Nwosu', role: 'Parent (Grade 3 Student)', content: 'The transformation in my daughter’s confidence since joining MORAVIA is remarkable. The digital portal makes tracking her progress so easy!', avatar: 'https://i.pravatar.cc/150?u=t1' },
  { id: 't2', name: 'Mr. Adeyemi Coker', role: 'Parent (JSS 2 Student)', content: 'The AI tutor feature is a game-changer. My son gets instant help with his homework even when I’m still at work. Truly a forward-thinking school.', avatar: 'https://i.pravatar.cc/150?u=t2' },
  { id: 't3', name: 'Dr. Sarah Phillips', role: 'Alumna / Professor', content: 'MORAVIA gave me the foundation I needed to excel globally. The teachers here genuinely care about the future of every student.', avatar: 'https://i.pravatar.cc/150?u=t3' },
  { id: 't4', name: 'Elder Thompson', role: 'Grandparent', content: 'A school that still values character and discipline while embracing modern technology. Highly recommended for any parent.', avatar: 'https://i.pravatar.cc/150?u=t4' },
  { id: 't5', name: 'Chinedu Okafor', role: 'SS 2 Student', content: 'The digital learning materials and CBT practice tools have made my exam preparation so much easier and more effective.', avatar: 'https://i.pravatar.cc/150?u=t5' },
  { id: 't6', name: 'Mr. David Wilson', role: 'Senior Science Teacher', content: 'MORAVIA provides the best digital tools for educators. I can easily track student progress and provide personalized support.', avatar: 'https://i.pravatar.cc/150?u=t6' },
  { id: 't7', name: 'Royal Academy International', role: 'Partner School', content: 'Partnering with MORAVIA has transformed our digital infrastructure. Their platform is robust, user-friendly, and highly effective for our students.', avatar: 'https://i.pravatar.cc/150?u=t7' }
];

export const SLIDES = [
  { id: 's1', image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=1200', title: 'Modern Facilities', description: 'Our campus is equipped with state-of-the-art laboratories and smart classrooms for a digital-first learning experience.' },
  { id: 's2', image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1200', title: 'Academic Excellence', description: 'Consistently achieving top honors in national and international examinations through our rigorous curriculum.' },
  { id: 's3', image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1200', title: 'Nurturing Every Child', description: 'Small class sizes allow our dedicated educators to provide personalized attention to every unique learner.' },
  { id: 's4', image: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&q=80&w=1200', title: 'Sports & Recreation', description: 'We believe in a holistic education, promoting physical health and teamwork through diverse sporting activities.' }
];
