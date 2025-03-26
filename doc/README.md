# Functional Programming and Design Patterns in Tahoe Resorts Finder

## Functional Programming Principles

### 1. Pure Functions
Pure functions always produce the same output for the same input and have no side effects.

**Good Example from code:**
```javascript
// In BookingModal.jsx
const getDateConstraints = useCallback(() => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  return { minDate, maxDateStr };
}, []);
```
This function always returns the same output for a given point in time and doesn't modify any external state.

**Bad Example:**
```javascript
let globalDate = new Date();

const getDateConstraints = () => {
  globalDate.setDate(globalDate.getDate() + 1); // Modifies external state
  return globalDate; // Result depends on external state
};
```

### 2. Immutability
Data is never modified directly; instead, new copies are created with changes.

**Good Example from code:**
```javascript
// In CourseFilter.jsx
const handleSearch = () => {
  let results = [...lessons]; // Creates new array
  
  if (lessonType !== 'All') {
    results = results.filter(lesson => lesson.lessonType === lessonType);
  }
  // ... more filters
  setFilteredLessons(results); // Sets new state instead of modifying existing
};
```

**Bad Example:**
```javascript
const handleSearch = () => {
  lessons.forEach(lesson => {
    if (lesson.lessonType !== lessonType) {
      lessons.splice(lessons.indexOf(lesson), 1); // Modifies original array
    }
  });
};
```

### 3. First-Class Functions
Functions are treated as values that can be passed as arguments.

**Good Example from code:**
```javascript
// In BookingsList.jsx
<Button 
  variant="outline-primary" 
  size="sm"
  onClick={() => handleEdit(booking)}
>
  Edit
</Button>
```

**Bad Example:**
```javascript
let currentBooking = null;
const setBookingAndEdit = () => {
  currentBooking = booking;
  handleEdit();
};
<button onclick="setBookingAndEdit()">Edit</button>
```

### 4. Higher-Order Functions
Functions that take other functions as arguments or return functions.

**Good Example from code:**
```javascript
// In CourseFilter.jsx
useEffect(() => {
  const fetchLessons = async () => {
    // ... fetch logic
  };
  fetchLessons();
}, []);
```

**Bad Example:**
```javascript
function fetchAndSetLessons() {
  fetch().then(function(data) {
    globalLessons = data; // Modifies global state
    renderLessons(); // Causes side effects
  });
}
```

### 5. Declarative over Imperative
Code focuses on what to do rather than how to do it.

**Good Example from code:**
```javascript
// In BookingsList.jsx
{bookings.map((booking) => (
  <tr key={booking.id}>
    <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
    <td>{booking.date}</td>
    // ... more fields
  </tr>
))}
```

**Bad Example:**
```javascript
let html = '';
for (let i = 0; i < bookings.length; i++) {
  html += '<tr>';
  html += '<td>' + bookings[i].date + '</td>';
  // ... more concatenation
  html += '</tr>';
}
tableBody.innerHTML = html;
```

## Array Functional Programming Methods

### 1. Map
```javascript
// In BookingsList.jsx
const bookingsList = bookingsSnapshot.docs.map(doc => ({
  id: doc.id,
  ...doc.data()
}));
```

### 2. Filter
```javascript
// In CourseFilter.jsx
results = results.filter(lesson => lesson.lessonType === lessonType);
```

## Design Patterns

### 1. Module Pattern
The components are organized as modules with clear responsibilities and encapsulation.

```javascript
// BookingModal.jsx as a module
const BookingModal = ({ show, handleClose, lesson }) => {
  // Private state
  const [formData, setFormData] = useState({...});
  
  // Public interface
  return (
    <Modal>
      // ... implementation
    </Modal>
  );
};

export default BookingModal;
```

### 2. Observer Pattern
Implemented through React's state management and useEffect hooks.

```javascript
// In CourseFilter.jsx
useEffect(() => {
  if (show) {
    fetchBookings();
  }
}, [show]); // Observer watching for changes in 'show'
```

### 3. Factory Pattern
Firebase configuration acts as a factory creating instances.

```javascript
// In firebaseConfig.js
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
```

## Why These Are Good FP Examples

1. **Pure Functions**: `getDateConstraints` function is pure because it:
   - Has no side effects
   - Returns the same output for the same input
   - Doesn't depend on external state

2. **Immutability**: state updates create new objects instead of modifying existing ones:
   - Uses spread operator for copying
   - Creates new arrays for filtered results
   - Never modifies props directly

3. **Higher-Order Functions**: components use hooks and callbacks effectively:
   - useEffect for side effects
   - useCallback for memoization
   - map/filter for data transformation

## Breaking These Concepts (Anti-Patterns)

1. **Breaking Pure Functions**:
```javascript
let total = 0;
const addToTotal = (num) => {
  total += num; // Modifies external state
  return total; // Result depends on external state
};
```

2. **Breaking Immutability**:
```javascript
const updateUser = (user) => {
  user.name = 'New Name'; // Directly modifies object
  return user;
};
```

3. **Breaking Higher-Order Functions**:
```javascript
function processData(data) {
  globalVariable = data; // Uses global state
  renderUI(); // Causes side effects
}
```
