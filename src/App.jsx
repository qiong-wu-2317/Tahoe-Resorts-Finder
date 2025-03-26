import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavigationBar from './components/Navbar';
import TrailFilter from './components/TrailFilter';
import CourseFilter from './components/CourseFilter';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="App">
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Navigate to="/trails" replace />} />
          <Route path="/trails" element={<TrailFilter />} />
          <Route path="/courses" element={<CourseFilter />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
