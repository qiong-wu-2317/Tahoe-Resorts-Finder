# Tahoe Resorts Finder

A React-based web application for finding and booking ski lessons at Tahoe area resorts.

## Project Overview

This application allows users to:
- Browse available ski lessons across different Tahoe resorts
- Filter lessons by type, level, resort, and time period
- Book lessons with specific instructors
- Manage bookings (view, edit, delete)

## Business Requirements
[doc/Business Requirements.pdf]

## Setup and Installation

1. Clone the repository
```bash
git clone [https://github.com/qiong-wu-2317/Tahoe-Resorts-Finder]
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

## AI Usage (ChatGPT-4)

### 1. Persona Development
Used ChatGPT-4 to create user personas based on business requirements:

**Prompt Used:**
```
Based on the following business requirements for a Tahoe ski lesson booking system:
- Lesson filtering by type, level, and resort
- Booking management system
- User-friendly interface
Please create detailed user personas representing typical users of this system.
```

### 2. Bug Resolution
Used ChatGPT-4 for debugging assistance:

**Example Bug Fix:**
```
Prompt: "BookingModal.jsx:102 Uncaught ReferenceError: Row is not defined"

Response: Added missing import from React Bootstrap:
import { Row, Col } from 'react-bootstrap';
```

### 3. Code Quality Improvements
Used ChatGPT-4 for:
- Implementation of functional programming principles
**Prompt Used:**
```
give me an exaple that my code is using First-Class Functions
```
