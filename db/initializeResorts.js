import { collection, addDoc, getFirestore } from 'firebase/firestore';
import { app } from '../../db/firebaseConfig.js';
import process from 'process';

const db = getFirestore(app);

const trails = [
  {
    name: 'Ridge Run',
    resort: 'Heavenly Mountain Resort',
    location: 'South Lake Tahoe, CA',
    level: 'Intermediate',
    length: '2.5 miles',
    verticalDrop: '1,600 feet',
    imageUrl: '/src/assets/heavenly.png',
    description: 'A classic intermediate run with stunning views of Lake Tahoe.',
    price: 100
  },
  {
    name: 'Patsy\'s',
    resort: 'Heavenly Mountain Resort',
    location: 'South Lake Tahoe, CA',
    level: 'Beginner',
    length: '1.2 miles',
    verticalDrop: '800 feet',
    imageUrl: '/src/assets/heavenly.png',
    description: 'Perfect for beginners, offering gentle slopes and wide trails.',
    price: 100
  },
  {
    name: 'Gunbarrel',
    resort: 'Heavenly Mountain Resort',
    location: 'South Lake Tahoe, CA',
    level: 'Advanced',
    length: '1.8 miles',
    verticalDrop: '1,700 feet',
    imageUrl: '/src/assets/heavenly.png',
    description: 'Challenging advanced terrain with steep pitches and moguls.',
    price: 100
  },
  {
    name: 'Luggi\'s',
    resort: 'Northstar California',
    location: 'Truckee, CA',
    level: 'Advanced',
    length: '2.1 miles',
    verticalDrop: '1,400 feet',
    imageUrl: '/src/assets/northstar.png',
    description: 'Expert terrain with challenging moguls and steep sections.',
    price: 200
  },
  {
    name: 'Logger\'s Loop',
    resort: 'Northstar California',
    location: 'Truckee, CA',
    level: 'Beginner',
    length: '1.5 miles',
    verticalDrop: '600 feet',
    imageUrl: '/src/assets/northstar.png',
    description: 'Ideal for beginners with gentle slopes and scenic forest views.',
    price: 200
  },
  {
    name: 'West Ridge',
    resort: 'Northstar California',
    location: 'Truckee, CA',
    level: 'Intermediate',
    length: '2.3 miles',
    verticalDrop: '1,200 feet',
    imageUrl: '/src/assets/northstar.png',
    description: 'Perfect intermediate run with consistent pitch and great snow conditions.',
    price: 200
  },
  {
    name: 'Mountain Run',
    resort: 'Palisades Tahoe',
    location: 'Olympic Valley, CA',
    level: 'Beginner',
    length: '1.8 miles',
    verticalDrop: '900 feet',
    imageUrl: '/src/assets/palisades.png',
    description: 'Great beginner terrain with wide, gentle slopes.',
    price: 300
  },
  {
    name: 'Red Dog Face',
    resort: 'Palisades Tahoe',
    location: 'Olympic Valley, CA',
    level: 'Intermediate',
    length: '2.2 miles',
    verticalDrop: '1,500 feet',
    imageUrl: '/src/assets/palisades.png',
    description: 'Popular intermediate run with consistent pitch and great views.',
    price: 300
  },
  {
    name: 'KT-22',
    resort: 'Palisades Tahoe',
    location: 'Olympic Valley, CA',
    level: 'Advanced',
    length: '1.5 miles',
    verticalDrop: '1,800 feet',
    imageUrl: '/src/assets/palisades.png',
    description: 'Legendary expert terrain with steep chutes and challenging conditions.',
    price: 300
  }
];

const initializeTrails = async () => {
  try {
    console.log('Starting initialization...');
    const trailsCollection = collection(db, 'trails');
    console.log('Collection reference created');
    
    for (const trail of trails) {
      console.log(`Attempting to add trail: ${trail.name}`);
      const docRef = await addDoc(trailsCollection, trail);
      console.log(`Successfully added trail: ${trail.name} with ID: ${docRef.id}`);
    }
    
    console.log('All trails have been added to Firebase!');
  } catch (error) {
    console.error('Error adding trails to Firebase:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      stack: error.stack
    });
  }
};

// Execute the initialization
console.log('Script started');
initializeTrails()
  .then(() => {
    console.log('Initialization completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Initialization failed:', error);
    process.exit(1);
  });

export { initializeTrails }; 