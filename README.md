# Tahoe Resorts Finder

A React-based web application for finding and booking ski lessons at Tahoe area resorts.

## Project Overview

This application allows users to:
- Browse and filter available trails across different Tahoe resorts
- Browse and filter available ski lessons across different Tahoe resorts
- Book lessons with specific instructors
- Manage bookings (view, edit, delete)


## Setup and Installation

1. Clone the repository
```bash
git clone https://github.com/qiong-wu-2317/Tahoe-Resorts-Finder
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

## Implementation Details

### Functional Programming Principles
The project implements core functional programming concepts:
- Pure functions for business logic
- Immutable state management
- First-class and higher-order functions
- Declarative programming style


For detailed implementation examples, see: [doc/README.md](doc/README.md)

## AI Usage (ChatGPT-4)

### 1. Bug Resolution Example
```
Prompt: "BookingModal.jsx:102 Uncaught ReferenceError: Row is not defined"

Response: Added missing import from React Bootstrap:
import { Row, Col } from 'react-bootstrap';
```

### 2. README file
```
Prompt: "help me fix the format of my readme file"
```

### 3. Functional Programming Demonstrating
```
Prompt: "How is my code using First class function';
Prompt: "give me a counter example';
```



## Resources

1. **Business Requirements Document**
   - [doc/Business Requirement.pdf](doc/Business%20Requirements.pdf)

2. **Project Introduction Video**
   - [Watch Video](https://drive.google.com/file/d/1Jzw2xOWU1JyYz2RRuEob_Q13asK3knp1/view?usp=sharing)

3. **Functional Programming Documentation**
   - [doc/README.md](doc/README.md)

4. **Functional Programming Demonstrating Video**
   - [Watch Demo](https://drive.google.com/file/d/1Jzw2xOWU1JyYz2RRuEob_Q13asK3knp1/view?usp=sharing)


## License

This project is licensed under the MIT License.
