import { collection, addDoc, getFirestore } from 'firebase/firestore';
import { app } from '../../db/firebaseConfig.js';
import process from 'process';

const db = getFirestore(app);

const lessons = [
  // Heavenly Mountain Resort Lessons
  {
    id: 1,
    resort: 'Heavenly Mountain Resort',
    lessonType: 'Private',
    level: 'Beginner',
    ageGroup: 'Adult',
    timeWindow: 'Morning (9AM-12PM)',
    price: 200,
    description: 'One-on-one instruction perfect for first-time skiers.',
    instructor: 'Available',
    maxParticipants: 1
  },
  {
    id: 2,
    resort: 'Heavenly Mountain Resort',
    lessonType: 'Group',
    level: 'Advanced',
    ageGroup: 'Child',
    timeWindow: 'Full Day (9AM-4PM)',
    price: 150,
    description: 'Group lesson for experienced young skiers looking to master advanced techniques.',
    instructor: 'Available',
    maxParticipants: 6
  },

  // Northstar California Lessons
  {
    id: 3,
    resort: 'Northstar California',
    lessonType: 'Private',
    level: 'Advanced',
    ageGroup: 'Adult',
    timeWindow: 'Afternoon (1PM-4PM)',
    price: 250,
    description: 'Advanced private coaching focusing on technique refinement and challenging terrain.',
    instructor: 'Available',
    maxParticipants: 1
  },
  {
    id: 4,
    resort: 'Northstar California',
    lessonType: 'Group',
    level: 'Beginner',
    ageGroup: 'Child',
    timeWindow: 'Morning (9AM-12PM)',
    price: 120,
    description: 'Fun and engaging group lesson for kids new to skiing or snowboarding.',
    instructor: 'Available',
    maxParticipants: 8
  },

  // Palisades Tahoe Lessons
  {
    id: 5,
    resort: 'Palisades Tahoe',
    lessonType: 'Private',
    level: 'Beginner',
    ageGroup: 'Adult',
    timeWindow: 'Full Day (9AM-4PM)',
    price: 300,
    description: 'Comprehensive full-day private instruction for beginners.',
    instructor: 'Available',
    maxParticipants: 1
  },
  {
    id: 6,
    resort: 'Palisades Tahoe',
    lessonType: 'Group',
    level: 'Advanced',
    ageGroup: 'Adult',
    timeWindow: 'Morning (9AM-12PM)',
    price: 180,
    description: 'Advanced group lesson focusing on expert terrain and technical skills.',
    instructor: 'Available',
    maxParticipants: 6
  }
];

const initializeLessons = async () => {
  try {
    console.log('Starting lessons initialization...');
    const lessonsCollection = collection(db, 'lessons');
    console.log('Collection reference created');
    
    for (const lesson of lessons) {
      console.log(`Attempting to add lesson: ${lesson.resort} - ${lesson.lessonType} ${lesson.level}`);
      const docRef = await addDoc(lessonsCollection, lesson);
      console.log(`Successfully added lesson with ID: ${docRef.id}`);
    }
    
    console.log('All lessons have been added to Firebase!');
  } catch (error) {
    console.error('Error adding lessons to Firebase:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      stack: error.stack
    });
  }
};

// Execute the initialization
console.log('Script started');
initializeLessons()
  .then(() => {
    console.log('Initialization completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Initialization failed:', error);
    process.exit(1);
  }); 