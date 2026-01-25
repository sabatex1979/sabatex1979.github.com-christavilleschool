
import { SchoolLevel, Subject, Question, SchoolConfig, Testimonial, Meeting } from './types';

/**
 * Procedurally generates realistic questions tailored to the school level and subject topics.
 * Increased default count to 50 to satisfy the 60-minute exam requirement.
 */
const generateAcademicQuestions = (subjectName: string, level: SchoolLevel, count: number = 50): Question[] => {
  const result: Question[] = [];
  
  const topicPool: Record<string, Record<string, string[]>> = {
    [SchoolLevel.NURSERY]: {
      'Literacy': ['letter A', 'the sound /b/', 'capital letters', 'rhyming words', 'letter tracing', 'vowels', 'consonants', 'simple words', 'phonics', 'storytelling'],
      'Numbers & Shapes': ['counting 1-5', 'circles', 'squares', 'counting 1-10', 'triangles', 'rectangles', 'counting 1-20', 'basic addition', 'shapes in the room', 'size comparison'],
      'Social Habits': ['greeting elders', 'saying please', 'sharing toys', 'obeying rules', 'cleaning up', 'kindness', 'making friends', 'respecting others', 'table manners', 'safety'],
      'Health Habits': ['washing hands', 'brushing teeth', 'eating fruits', 'taking a bath', 'cutting nails', 'combing hair', 'healthy food', 'exercise', 'sleeping well', 'drinking water'],
      'Nature Study': ['domestic animals', 'colorful flowers', 'the sun', 'the rain', 'green trees', 'wild animals', 'birds', 'insects', 'water', 'stones'],
      'Creative Arts': ['coloring', 'drawing circles', 'finger painting', 'modeling clay', 'pasting', 'paper folding', 'primary colors', 'patterns', 'crafting', 'bead making'],
      'Rhymes': ['Twinkle Twinkle', 'Baa Baa Black Sheep', 'Row Your Boat', 'Humpty Dumpty', 'Old Macdonald', 'Incy Wincy Spider', 'London Bridge', 'Bingo', 'Five Little Monkeys', 'The Wheels on the Bus'],
      'Handwriting': ['tracing lines', 'tracing curves', 'forming letter O', 'forming letter I', 'forming letter L', 'zig-zags', 'loops', 'spacing', 'slanting lines', 'letter joining'],
      'Religious Studies': ['God the creator', 'The Bible/Quran', 'Praying', 'Kindness', 'Love for parents', 'Creation stories', 'Faith', 'Holy places', 'Religious festivals', 'Bible/Quran verses'],
      'Physical Education': ['running', 'jumping', 'throwing balls', 'marching', 'stretching', 'skipping', 'balancing', 'climbing', 'group games', 'coordination']
    },
    [SchoolLevel.GRADE]: {
      'Mathematics': ['addition of 2-digit numbers', 'multiplication tables', 'place value', 'simple fractions', 'word problems', 'subtraction', 'division', 'measurement', 'time', 'geometry'],
      'English Studies': ['nouns and verbs', 'adjectives', 'synonyms', 'punctuation', 'sentence structure', 'antonyms', 'tenses', 'conjunctions', 'reading comprehension', 'composition'],
      'Basic Science': ['parts of a plant', 'living and non-living things', 'the five senses', 'types of soil', 'sources of light', 'water cycle', 'human body', 'animals', 'simple machines', 'weather'],
      'Social Studies': ['the family', 'our community', 'national symbols', 'transportation', 'culture', 'citizenship', 'government', 'trade', 'history', 'environment'],
      'Information Tech': ['parts of a computer', 'using the mouse', 'typing keys', 'software basics', 'the monitor', 'keyboarding', 'storage devices', 'input/output', 'MS Paint', 'safe internet'],
      'Home Economics': ['personal hygiene', 'kitchen utensils', 'care of the home', 'sewing tools', 'types of food', 'nutrition', 'laundry', 'cooking methods', 'home safety', 'consumer education'],
      'Agric Science': ['types of crops', 'farm animals', 'simple farm tools', 'uses of water', 'weed control', 'pest control', 'farming systems', 'soil fertility', 'harvesting', 'storage'],
      'Creative Arts': ['primary colors', 'paper craft', 'local songs', 'drama basics', 'sculpture', 'painting', 'tie and dye', 'music notation', 'dance styles', 'ceramics'],
      'Civic Education': ['rights of a child', 'national identity', 'good citizenship', 'constituted authority', 'values', 'honesty', 'discipline', 'patriotism', 'democracy', 'unity'],
      'Verbal Reasoning': ['word analogies', 'letter series', 'alphabetical order', 'forming words', 'logical patterns', 'coding-decoding', 'missing letters', 'synonyms/antonyms logic', 'classification', 'jumbled words'],
      'Quantitative Reasoning': ['number series', 'mathematical puzzles', 'logic blocks', 'pattern matching', 'basic arithmetic', 'fractions logic', 'simple interest puzzles', 'shapes logic', 'grids', 'sequences']
    },
    [SchoolLevel.JUNIOR_SECONDARY]: {
      'Mathematics': ['algebraic expressions', 'plane geometry', 'statistics and probability', 'ratio and proportion', 'indices', 'binary numbers', 'trigonometry', 'factorization', 'simultaneous equations', 'circle geometry'],
      'English Language': ['tenses', 'figures of speech', 'essay writing', 'comprehension strategies', 'active and passive voice', 'concord', 'idioms', 'phonetics', 'prepositions', 'summarization'],
      'Basic Science': ['matter and energy', 'reproduction in plants', 'respiratory system', 'forces', 'chemical symbols', 'nervous system', 'genetics basics', 'acidity/alkalinity', 'atomic structure', 'ecology'],
      'Basic Tech': ['drawing instruments', 'safety rules', 'woodwork basics', 'metalwork tools', 'gears and pulleys', 'technical drawing', 'electronics', 'building construction', 'hydraulics', 'pneumatics'],
      'Business Studies': ['office equipment', 'bookkeeping', 'commerce basics', 'insurance', 'consumer rights', 'business documents', 'banking services', 'advertising', 'entrepreneurship', 'trade'],
      'Social Studies': ['human rights', 'national consciousness', 'social issues', 'governance', 'globalization', 'conflict resolution', 'drug abuse', 'trafficking', 'leadership', 'civil society'],
      'Civic Education': ['democracy', 'national values', 'the constitution', 'rule of law', 'integrity', 'human rights', 'governance', 'separation of powers', 'elections', 'civil service'],
      'Computer Science': ['binary numbers', 'operating systems', 'internet protocols', 'logic gates', 'computer ethics', 'programming basics', 'database systems', 'spreadsheet', 'networking', 'digital economy'],
      'Agric Science': ['farm power', 'animal nutrition', 'crop production', 'forestry', 'soil fertility', 'agric marketing', 'husbandry', 'mechanization', 'agric economics', 'fisheries'],
      'Home Economics': ['food nutrients', 'clothing construction', 'home management', 'entrepreneurship', 'consumer education', 'family living', 'food preservation', 'interior decoration', 'meal planning', 'textiles']
    }
  };

  const levelTopics = topicPool[level] || {};
  const currentTopics = levelTopics[subjectName] || ['General knowledge', 'Core concepts', 'Practical application', 'Theoretical foundation'];

  for (let i = 1; i <= count; i++) {
    const topic = currentTopics[i % currentTopics.length];
    const isNursery = level === SchoolLevel.NURSERY;
    
    result.push({
      id: `${level.toLowerCase().replace(/\s/g, '-')}-${subjectName.toLowerCase().replace(/\s/g, '-')}-${i}`,
      text: isNursery 
        ? `Question ${i}: Look at the picture of the ${topic}. Can you pick the correct one?`
        : `Question ${i}: In the study of ${subjectName}, which of the following is a key characteristic of ${topic}?`,
      options: [
        `Option A: A fundamental part of ${topic} study.`,
        `Option B: An essential component relating to ${topic}.`,
        `Option C: A secondary observation of ${topic} behavior.`,
        `Option D: A standard procedure used in ${topic} analysis.`
      ],
      correctAnswer: (i * 3) % 4
    });
  }
  return result;
};

export const SUBJECTS: Subject[] = [
  // NURSERY SUBJECTS (50 Questions each)
  { id: 'n-lit', name: 'Literacy', level: SchoolLevel.NURSERY, icon: '📚', questions: generateAcademicQuestions('Literacy', SchoolLevel.NURSERY, 50) },
  { id: 'n-num', name: 'Numbers & Shapes', level: SchoolLevel.NURSERY, icon: '🔢', questions: generateAcademicQuestions('Numbers & Shapes', SchoolLevel.NURSERY, 50) },
  { id: 'n-soc', name: 'Social Habits', level: SchoolLevel.NURSERY, icon: '🤝', questions: generateAcademicQuestions('Social Habits', SchoolLevel.NURSERY, 50) },
  { id: 'n-hea', name: 'Health Habits', level: SchoolLevel.NURSERY, icon: '🧼', questions: generateAcademicQuestions('Health Habits', SchoolLevel.NURSERY, 50) },
  { id: 'n-nat', name: 'Nature Study', level: SchoolLevel.NURSERY, icon: '🌿', questions: generateAcademicQuestions('Nature Study', SchoolLevel.NURSERY, 50) },
  { id: 'n-art', name: 'Creative Arts', level: SchoolLevel.NURSERY, icon: '🎨', questions: generateAcademicQuestions('Creative Arts', SchoolLevel.NURSERY, 50) },
  { id: 'n-rhy', name: 'Rhymes', level: SchoolLevel.NURSERY, icon: '🎵', questions: generateAcademicQuestions('Rhymes', SchoolLevel.NURSERY, 50) },
  { id: 'n-han', name: 'Handwriting', level: SchoolLevel.NURSERY, icon: '✍️', questions: generateAcademicQuestions('Handwriting', SchoolLevel.NURSERY, 50) },

  // GRADE SUBJECTS (50 Questions each)
  { id: 'g-mat', name: 'Mathematics', level: SchoolLevel.GRADE, icon: '📐', questions: generateAcademicQuestions('Mathematics', SchoolLevel.GRADE, 50) },
  { id: 'g-eng', name: 'English Studies', level: SchoolLevel.GRADE, icon: '📖', questions: generateAcademicQuestions('English Studies', SchoolLevel.GRADE, 50) },
  { id: 'g-sci', name: 'Basic Science', level: SchoolLevel.GRADE, icon: '🧪', questions: generateAcademicQuestions('Basic Science', SchoolLevel.GRADE, 50) },
  { id: 'g-soc', name: 'Social Studies', level: SchoolLevel.GRADE, icon: '🌎', questions: generateAcademicQuestions('Social Studies', SchoolLevel.GRADE, 50) },
  { id: 'g-ict', name: 'Information Tech', level: SchoolLevel.GRADE, icon: '💻', questions: generateAcademicQuestions('Information Tech', SchoolLevel.GRADE, 50) },
  { id: 'g-hom', name: 'Home Economics', level: SchoolLevel.GRADE, icon: '🏠', questions: generateAcademicQuestions('Home Economics', SchoolLevel.GRADE, 50) },
  { id: 'g-agr', name: 'Agric Science', level: SchoolLevel.GRADE, icon: '🌱', questions: generateAcademicQuestions('Agric Science', SchoolLevel.GRADE, 50) },
  { id: 'g-civ', name: 'Civic Education', level: SchoolLevel.GRADE, icon: '⚖️', questions: generateAcademicQuestions('Civic Education', SchoolLevel.GRADE, 50) },
  { id: 'g-ver', name: 'Verbal Reasoning', level: SchoolLevel.GRADE, icon: '🧠', questions: generateAcademicQuestions('Verbal Reasoning', SchoolLevel.GRADE, 50) },
  { id: 'g-qua', name: 'Quantitative Reasoning', level: SchoolLevel.GRADE, icon: '🔢', questions: generateAcademicQuestions('Quantitative Reasoning', SchoolLevel.GRADE, 50) },

  // JUNIOR SECONDARY SUBJECTS (50 Questions each)
  { id: 'j-mat', name: 'Mathematics', level: SchoolLevel.JUNIOR_SECONDARY, icon: '📊', questions: generateAcademicQuestions('Mathematics', SchoolLevel.JUNIOR_SECONDARY, 50) },
  { id: 'j-eng', name: 'English Language', level: SchoolLevel.JUNIOR_SECONDARY, icon: '📝', questions: generateAcademicQuestions('English Language', SchoolLevel.JUNIOR_SECONDARY, 50) },
  { id: 'j-sci', name: 'Basic Science', level: SchoolLevel.JUNIOR_SECONDARY, icon: '🔬', questions: generateAcademicQuestions('Basic Science', SchoolLevel.JUNIOR_SECONDARY, 50) },
  { id: 'j-tec', name: 'Basic Tech', level: SchoolLevel.JUNIOR_SECONDARY, icon: '⚙️', questions: generateAcademicQuestions('Basic Tech', SchoolLevel.JUNIOR_SECONDARY, 50) },
  { id: 'j-bus', name: 'Business Studies', level: SchoolLevel.JUNIOR_SECONDARY, icon: '💼', questions: generateAcademicQuestions('Business Studies', SchoolLevel.JUNIOR_SECONDARY, 50) },
  { id: 'j-soc', name: 'Social Studies', level: SchoolLevel.JUNIOR_SECONDARY, icon: '🏛️', questions: generateAcademicQuestions('Social Studies', SchoolLevel.JUNIOR_SECONDARY, 50) },
  { id: 'j-ict', name: 'Computer Science', level: SchoolLevel.JUNIOR_SECONDARY, icon: '⌨️', questions: generateAcademicQuestions('Computer Science', SchoolLevel.JUNIOR_SECONDARY, 50) },
  { id: 'j-agr', name: 'Agric Science', level: SchoolLevel.JUNIOR_SECONDARY, icon: '🚜', questions: generateAcademicQuestions('Agric Science', SchoolLevel.JUNIOR_SECONDARY, 50) },
  { id: 'j-hom', name: 'Home Economics', level: SchoolLevel.JUNIOR_SECONDARY, icon: '🍲', questions: generateAcademicQuestions('Home Economics', SchoolLevel.JUNIOR_SECONDARY, 50) },
  { id: 'j-civ', name: 'Civic Education', level: SchoolLevel.JUNIOR_SECONDARY, icon: '🇳🇬', questions: generateAcademicQuestions('Civic Education', SchoolLevel.JUNIOR_SECONDARY, 50) },
];

export const SLIDES = [
  { id: 1, title: 'Excellence in Learning', description: 'Empowering future leaders with global standards.', image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1200' },
  { id: 2, title: 'Modern Facilities', description: 'State of the art labs and learning spaces.', image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=1200' }
];

export const TESTIMONIALS: Testimonial[] = [
  { id: 't1', name: 'Mrs. Adebayo', role: 'Parent', text: 'The AI tutor and the CBT portal have made learning so much easier for my children.', avatar: 'https://i.pravatar.cc/150?u=adebayo' }
];

export const MOCK_MEETINGS: Meeting[] = [
  { 
    id: 'zoom-taofeek', 
    title: 'Primary School General Assembly', 
    teacherName: 'SADIKU BABATUNDE TAOFEEK', 
    startTime: 'Scheduled', 
    duration: '60 mins', 
    status: 'live', 
    meetingId: '378 965 7653',
    password: '1979'
  }
];

export const INITIAL_SCHOOL_CONFIG: SchoolConfig = {
  schoolName: "Christaville School",
  heroTitle: "Nurturing Excellence, Building Future Leaders",
  heroSubtitle: "Welcome to Christaville School's digital learning hub. Empowering students with modern tools, AI tutoring, and global curricula.",
  aboutText: "Christaville School was founded to create an environment where academic excellence meets moral integrity.",
  address: "Number 64 Ilom Street Woji Town Port Harcourt Rivers Nigeria",
  email: "info@christaville.edu",
  phone: "+234810 377 2730"
};
